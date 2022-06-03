import { join } from 'path';
import {
  Duration,
  aws_lambda,
  aws_events,
  aws_events_targets,
  aws_iam,
  Fn,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface TtlProps {
  readonly ttl: Duration;
  readonly pollInterval?: Duration;
}

export class Ttl extends Construct {
  constructor(scope: Construct, id: string, props: TtlProps) {
    super(scope, id);

    const ttl = props.ttl;
    const pollInterval = props.pollInterval
      ? props.pollInterval
      : Duration.hours(1);

    const ttlLambda = new aws_lambda.Function(this, 'TtlFunction', {
      runtime: aws_lambda.Runtime.PYTHON_3_9,
      code: aws_lambda.Code.fromAsset(join(__dirname, 'lambda')),
      handler: 'ttl.handler',
      environment: {
        TTL: ttl.toSeconds().toString(),
        STACK_NAME: Fn.ref('AWS:AccountId'),
      },
      role: new aws_iam.Role(this, 'TtlRole', {
        assumedBy: new aws_iam.ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
        ],
      }),
    });

    new aws_events.Rule(this, 'IntercalSchedule', {
      schedule: aws_events.Schedule.rate(pollInterval),
      targets: [new aws_events_targets.LambdaFunction(ttlLambda)],
    });
  }
}
