import { aws_iam, Tag } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Constants } from './constants';

export interface BastionAccessPolicyProps {
  readonly securityTag?: Tag;
}

export class BastionAccessPolicy extends Construct {
  policy: aws_iam.PolicyDocument;
  constructor(scope: Construct, id: string, props?: BastionAccessPolicyProps) {
    super(scope, id);

    const securityTag = props?.securityTag
      ? props.securityTag
      : Constants.securityTag;

    this.policy = new aws_iam.PolicyDocument({
      statements: [
        new aws_iam.PolicyStatement({
          effect: aws_iam.Effect.ALLOW,
          actions: [
            'cloudwatch:DescribeAlarms',
            'ec2:DescribeInstances',
            'ec2:DescribeInstanceStatus',
            'ec2:DescribeSecurityGroup*',
            'identitystore:DescribeUser',
            'ssm-guiconnect:CancelConnection',
            'ssm-guiconnect:GetConnection',
            'ssm-guiconnect:StartConnection',
            'ssm:DescribeInstance*',
            'ssm:GetCommandInvocation',
            'ssm:GetInventorySchema',
            'sso:ListDirectoryAssociations*',
            'rds:Describe*',
            'secretsmanager:ListSecrets',
            'kms:ListAliases',
          ],
          resources: ['*'],
        }),
        new aws_iam.PolicyStatement({
          effect: aws_iam.Effect.ALLOW,
          actions: [
            'ec2:GetPasswordData',
            'ec2:StartInstances',
            'ssm:GetConnectionStatus',
            'ssm:SendCommand',
            'ssm:StartSession',
          ],
          resources: ['arn:aws:ec2:*:*:instance/*'],
          conditions: {
            StringEquals: JSON.parse(
              `{"aws:ResourceTag/${securityTag.key}": "${securityTag.value}"}`
            ),
          },
        }),
        new aws_iam.PolicyStatement({
          effect: aws_iam.Effect.ALLOW,
          actions: [
            'secretsmanager:DescribeSecret',
            'secretsmanager:GetSecretValue',
          ],
          resources: ['*'],
          conditions: {
            StringEquals: JSON.parse(
              `{"aws:ResourceTag/${securityTag.key}": "${securityTag.value}"}`
            ),
          },
        }),
        new aws_iam.PolicyStatement({
          effect: aws_iam.Effect.ALLOW,
          actions: ['ssm:TerminateSession'],
          resources: ['*'],
          conditions: {
            StringLike: {
              'ssm:resourceTag/aws:ssmmessages:session-id': '${aws:userName}',
            },
          },
        }),
        new aws_iam.PolicyStatement({
          effect: aws_iam.Effect.ALLOW,
          actions: ['ssm:GetDocument'],
          resources: [
            'arn:aws:ssm:*:*:document/AWS-StartPortForwardingSession',
            'arn:aws:ssm:*:*:document/SSM-SessionManagerRunShell',
          ],
        }),
        new aws_iam.PolicyStatement({
          effect: aws_iam.Effect.ALLOW,
          actions: ['ssm:SendCommand', 'ssm:StartSession'],
          resources: [
            'arn:aws:ssm:*:*:document/AWS-StartPortForwardingSession',
            'arn:aws:ssm:*:*:document/AWSSSO-CreateSSOUser',
            'arn:aws:ssm:*:*:managed-instance/*',
          ],
          conditions: {
            BoolIfExists: {
              'ssm:SessionDocumentAccessCheck': 'true',
            },
          },
        }),
      ],
    });
  }
}
