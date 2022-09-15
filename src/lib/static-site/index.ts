import * as child_process from 'child_process';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { join } from 'path';
import * as process from 'process';
import {
  aws_certificatemanager,
  aws_cloudfront,
  aws_cloudfront_origins,
  aws_route53,
  aws_route53_targets,
  aws_s3,
  aws_s3_deployment,
  Duration,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { sync as globSync } from 'glob';

export interface StaticSiteProps {
  readonly domain: string;
  readonly alternativeDomains?: string[];
  readonly hostedZone?: aws_route53.IHostedZone;
  readonly alternativeHostedZones?: aws_route53.IHostedZone[];
  readonly path: string;
  readonly enablePrettyPaths?: boolean;
}

export class StaticSite extends Construct {
  distribution: aws_cloudfront.IDistribution;
  constructor(scope: Construct, id: string, props: StaticSiteProps) {
    super(scope, id);

    const bucket = new aws_s3.Bucket(this, 'Bucket', {
      encryption: aws_s3.BucketEncryption.S3_MANAGED,
      lifecycleRules: [
        {
          transitions: [
            {
              storageClass: aws_s3.StorageClass.INTELLIGENT_TIERING,
              transitionAfter: Duration.days(7),
            },
          ],
        },
      ],
    });

    const hostedZone = props.hostedZone
      ? props.hostedZone
      : aws_route53.HostedZone.fromLookup(this, `HostedZone${props.domain}`, {
          domainName: props.domain,
        });

    const alternativeHostedZones = props.alternativeHostedZones
      ? props.alternativeHostedZones
      : props.alternativeDomains
      ? props.alternativeDomains.map((domain) => {
          return aws_route53.HostedZone.fromLookup(
            this,
            `HostedZone${domain}`,
            {
              domainName: domain,
            }
          );
        })
      : undefined;
    let domainValidation = {
      [props.domain]: hostedZone,
    };

    props.alternativeDomains?.map((domain, index) => {
      domainValidation[domain] = alternativeHostedZones![index];
    });

    const certificate = new aws_certificatemanager.Certificate(
      this,
      'Certificate',
      {
        domainName: props.domain,
        subjectAlternativeNames: props.alternativeDomains,
        validation:
          aws_certificatemanager.CertificateValidation.fromDnsMultiZone(
            domainValidation
          ),
      }
    );

    const originAccessIdentity = new aws_cloudfront.OriginAccessIdentity(
      this,
      'OriginAccessIdentity'
    );
    bucket.grantRead(originAccessIdentity);

    let prettyPathHandler: aws_cloudfront.Function;
    if (props.enablePrettyPaths)
      prettyPathHandler = new aws_cloudfront.Function(
        this,
        'PrettyPathHandler',
        {
          code: aws_cloudfront.FunctionCode.fromFile({
            filePath: join(__dirname, 'prettyPathHandler.js'),
          }),
        }
      );

    this.distribution = new aws_cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new aws_cloudfront_origins.S3Origin(bucket, {
          originAccessIdentity,
        }),
        allowedMethods: aws_cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy:
          aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: props.enablePrettyPaths
          ? [
              {
                function: prettyPathHandler!,
                eventType: aws_cloudfront.FunctionEventType.VIEWER_REQUEST,
              },
            ]
          : undefined,
      },
      domainNames: props.alternativeDomains
        ? [props.domain, ...props.alternativeDomains]
        : [props.domain],
      certificate,
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
        },
      ],
      defaultRootObject: 'index.html',
      httpVersion: aws_cloudfront.HttpVersion.HTTP2_AND_3,
    });

    new aws_route53.ARecord(this, 'AAliasRecord', {
      recordName: props.domain,
      zone: hostedZone,
      target: aws_route53.RecordTarget.fromAlias(
        new aws_route53_targets.CloudFrontTarget(this.distribution)
      ),
    });
    new aws_route53.AaaaRecord(this, 'AaaaAliasRecord', {
      recordName: props.domain,
      zone: hostedZone,
      target: aws_route53.RecordTarget.fromAlias(
        new aws_route53_targets.CloudFrontTarget(this.distribution)
      ),
    });

    props.alternativeDomains?.map((domain, index) => {
      new aws_route53.ARecord(this, `AAliasRecord${domain}`, {
        recordName: domain,
        zone: alternativeHostedZones![index],
        target: aws_route53.RecordTarget.fromAlias(
          new aws_route53_targets.CloudFrontTarget(this.distribution)
        ),
      });
      new aws_route53.AaaaRecord(this, `AaaaAliasRecord${domain}`, {
        recordName: domain,
        zone: alternativeHostedZones![index],
        target: aws_route53.RecordTarget.fromAlias(
          new aws_route53_targets.CloudFrontTarget(this.distribution)
        ),
      });
    });

    const hashFile = '/.hashfile.json';
    let invalidations: string[] = [hashFile];
    invalidations.push(
      ...compareRemoteToLocal(props.domain, hashFile, props.path)
    );

    new aws_s3_deployment.BucketDeployment(this, 'StaticDeployment', {
      sources: [aws_s3_deployment.Source.asset(props.path)],
      destinationBucket: bucket,
      distribution: this.distribution,
      distributionPaths: invalidations,
    });
  }
}

function getHashes(globPattern: string, dir: string): Map<string, string> {
  let fh: Map<string, string> = new Map();
  const gs = globSync(globPattern, { cwd: dir, nodir: true });
  const pwd = process.cwd();
  process.chdir(dir);
  gs.forEach(function (file: string) {
    const fileBuffer = fs.readFileSync(file, {});
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    const hex = hashSum.digest('hex');
    fh.set(file, hex);
  });
  process.chdir(pwd);
  return fh;
}

function getInvalidations(
  oldHashes: Map<string, string>,
  newHashes: Map<string, string>
): string[] {
  let invalidations: string[] = [];
  oldHashes.forEach(function (v, k) {
    if (newHashes.get(k) !== v) {
      invalidations.push(`/${k}`);
    }
  });
  return invalidations;
}

function compareRemoteToLocal(
  domain: string,
  hashFile: string,
  localFolder: string
): string[] {
  let oldHashesJSON: string;
  const newHashes = getHashes('**', localFolder);
  fs.writeFileSync(
    join(localFolder, hashFile),
    JSON.stringify(Object.fromEntries(newHashes), null, 2)
  );
  const curl = `curl -s https://${domain}${hashFile}`;
  try {
    oldHashesJSON = child_process.execSync(curl).toString();
  } catch (e) {
    console.error(e);
    console.error(curl);
    return ['/*'];
  }
  let oldHashes: Map<string, string>;
  try {
    oldHashes = new Map(Object.entries(JSON.parse(oldHashesJSON)));
  } catch (e) {
    return ['/*'];
  }
  return getInvalidations(oldHashes, newHashes);
}
