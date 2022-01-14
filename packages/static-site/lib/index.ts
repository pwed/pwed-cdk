import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface StaticSiteProps {
  readonly name: string;
}

export class StaticSite extends Construct {

  constructor(scope: Construct, id: string, props: StaticSiteProps) {
    super(scope, id);

    
    new Bucket(this, "bucket", {
      bucketName: props.name,
    })
  }
}
