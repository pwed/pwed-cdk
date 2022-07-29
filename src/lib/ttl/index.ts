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
      code: aws_lambda.Code.fromInline(`#!/bin/env python
import boto3
import os
import time
import logging

log = logging.Logger("logger")
log.setLevel("INFO")

def handler(event, context):
    print(event)

    stack_name = os.environ['STACK_NAME']
    ttl = int(os.environ['TTL'])
    cfn = boto3.client('cloudformation')

    print(
        f"""
        StackName: {stack_name}
        TTL:       {ttl}
        """
    )

    stack = cfn.describe_stacks(StackName=stack_name)
    creation_time = stack['Stacks'][0]['CreationTime']
    creation_time_epoch = int(time.mktime(creation_time.timetuple()))

    now = time.time()
    delta = now - creation_time_epoch
    print(
        f"""
        Now:           {now}
        Creation Time: {creation_time}
        Delta:         {delta}
        """
    )
    if delta > ttl:
        print(f"deleting stack: {stack_name}")
        cfn.delete_stack(StackName=stack_name)
        return

    print(f"not deleting stack yet, {delta} seconds remaining")
    return`),
      handler: 'index.handler',
      environment: {
        TTL: ttl.toSeconds().toString(),
        STACK_NAME: Fn.ref('AWS::StackName'),
      },
      role: new aws_iam.Role(this, 'TtlRole', {
        assumedBy: new aws_iam.ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
        ],
      }),
      logRetention: 1,
    });

    new aws_events.Rule(this, 'IntervalSchedule', {
      schedule: aws_events.Schedule.rate(pollInterval),
      targets: [new aws_events_targets.LambdaFunction(ttlLambda)],
    });
  }
}
