import { aws_iam, aws_ssm, Stack, Tag } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Constants } from './constants';

export interface IScheduleShutdownProps {
  securityTag?: Tag;
  timezone?: string;
  shutdownSchedule?: string;
}

export class ScheduleShutdown extends Construct {
  constructor(scope: Construct, id: string, props?: IScheduleShutdownProps) {
    super(scope, id);

    const securityTag = props?.securityTag
      ? props.securityTag
      : Constants.securityTag;

    const maintanenceWindow = new aws_ssm.CfnMaintenanceWindow(
      this,
      'BastionMaintanenceWindow',
      {
        allowUnassociatedTargets: false,
        cutoff: 0,
        duration: 1,
        name: Stack.of(scope).stackName + '-Maintanence-Window',
        schedule: props?.shutdownSchedule
          ? props.shutdownSchedule
          : 'cron(0 2 ? * * *)',
        scheduleTimezone: props?.timezone
          ? props.timezone
          : 'Australia/Melbourne',
      }
    );

    const maintanenceTarget = new aws_ssm.CfnMaintenanceWindowTarget(
      this,
      'BastionMaintanenceTarget',
      {
        resourceType: 'INSTANCE',
        targets: [
          {
            key: `tag:${securityTag.Key}`,
            values: [securityTag.Value],
          },
        ],
        windowId: maintanenceWindow.ref,
      }
    );

    const taskRole = new aws_iam.Role(this, 'AutomationRole', {
      inlinePolicies: {
        ec2Stop: new aws_iam.PolicyDocument({
          statements: [
            new aws_iam.PolicyStatement({
              effect: aws_iam.Effect.ALLOW,
              resources: ['*'],
              actions: ['ec2:StopInstances'],
              conditions: {
                StringEquals: JSON.parse(
                  `{"aws:ResourceTag/${securityTag.Key}": "${securityTag.Value}"}`
                ),
              },
            }),
            new aws_iam.PolicyStatement({
              effect: aws_iam.Effect.ALLOW,
              resources: ['*'],
              actions: ['ec2:DescribeInstances', 'ec2:DescribeInstanceStatus'],
            }),
          ],
        }),
      },
      assumedBy: new aws_iam.ServicePrincipal('ssm.amazonaws.com'),
    });

    new aws_ssm.CfnMaintenanceWindowTask(this, 'BastionStop', {
      priority: 1,
      taskArn: 'AWS-StopEC2Instance',
      taskType: 'AUTOMATION',
      windowId: maintanenceWindow.ref,
      taskInvocationParameters: {
        maintenanceWindowAutomationParameters: {
          documentVersion: '1',
          parameters: {
            InstanceId: ['{{RESOURCE_ID}}'],
            AutomationAssumeRole: [taskRole.roleArn],
          },
        },
      },
      maxErrors: '1',
      maxConcurrency: '1',
      targets: [
        {
          key: 'WindowTargetIds',
          values: [maintanenceTarget.ref],
        },
      ],
    });
  }
}
