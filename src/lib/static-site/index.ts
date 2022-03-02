import * as child_process from 'child_process';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
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
  readonly hostedZone?: aws_route53.IHostedZone;
  readonly path: string;
}

export class StaticSite extends Construct {
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
      : aws_route53.HostedZone.fromLookup(this, 'HostedZone', {
          domainName: props.domain,
        });

    const certificate = new aws_certificatemanager.Certificate(
      this,
      'Certificate',
      {
        domainName: props.domain,
        validation:
          aws_certificatemanager.CertificateValidation.fromDns(hostedZone),
      }
    );

    const originAccessIdentity = new aws_cloudfront.OriginAccessIdentity(
      this,
      'OriginAccessIdentity'
    );
    bucket.grantRead(originAccessIdentity);

    const distribution = new aws_cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new aws_cloudfront_origins.S3Origin(bucket, {
          originAccessIdentity,
        }),
        allowedMethods: aws_cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy:
          aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: [props.domain],
      certificate,
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
        },
      ],
      defaultRootObject: 'index.html',
    });

    new aws_route53.ARecord(this, 'AAliasRecord', {
      recordName: props.domain,
      zone: hostedZone,
      target: aws_route53.RecordTarget.fromAlias(
        new aws_route53_targets.CloudFrontTarget(distribution)
      ),
    });
    new aws_route53.AaaaRecord(this, 'AaaaAliasRecord', {
      recordName: props.domain,
      zone: hostedZone,
      target: aws_route53.RecordTarget.fromAlias(
        new aws_route53_targets.CloudFrontTarget(distribution)
      ),
    });

    const hashFile = '/.hashfile';
    let invalidations: string[] = [hashFile];
    invalidations.push(
      ...compareRemoteToLocal(props.domain, hashFile, props.path)
    );

    console.log('Invalidations:\n', invalidations);

    new aws_s3_deployment.BucketDeployment(this, 'StaticDeployment', {
      sources: [aws_s3_deployment.Source.asset(props.path)],
      destinationBucket: bucket,
      distribution: distribution,
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
    path.join(localFolder, hashFile),
    JSON.stringify(Object.fromEntries(newHashes))
  );
  try {
    oldHashesJSON = child_process
      .execSync(`curl https://${domain}/${hashFile}`)
      .toString();
  } catch (e) {
    console.log('error getting file from web', e);
    return ['/*'];
  }
  let oldHashes: Map<string, string>;
  try {
    oldHashes = new Map(Object.entries(JSON.parse(oldHashesJSON!)));
  } catch (e) {
    return ['/*'];
  }
  return getInvalidations(oldHashes, newHashes);
}
