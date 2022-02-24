import { aws_iam, aws_sso, Tag } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Constants } from './constants';

export interface BastionPermissionSetProps {
  ssoInstanceArn: string;
  permissionSetName: string;
  sessionDuration?: string;
  securityTag?: Tag;
}

export class BastionPermissionSet extends Construct {
  private policy: aws_iam.PolicyDocument;
  private permissionSet: aws_sso.CfnPermissionSet;
  private ssoInstanceArn: string;
  securityTag: Tag;
  constructor(scope: Construct, id: string, props: BastionPermissionSetProps) {
    super(scope, id);

    this.securityTag = props.securityTag
      ? props.securityTag
      : Constants.securityTag;

    this.ssoInstanceArn = props.ssoInstanceArn;

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
              `{"aws:ResourceTag/${this.securityTag.key}": "${this.securityTag.value}"}`
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
              `{"aws:ResourceTag/${this.securityTag.key}": "${this.securityTag.value}"}`
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

    this.permissionSet = new aws_sso.CfnPermissionSet(
      this,
      'BastionAccessPermissionSet',
      {
        instanceArn: props.ssoInstanceArn,
        inlinePolicy: this.policy,
        name: props.permissionSetName
          ? props.permissionSetName
          : 'BastionAccess',
        sessionDuration: props.sessionDuration ? props.sessionDuration : 'PT8H',
        relayStateType:
          'https://console.aws.amazon.com/systems-manager/managed-instances/rdp-connect',
      }
    );
  }

  assign(accountId: string, principalId: string, principalType: string): void {
    new aws_sso.CfnAssignment(
      this,
      `Account${accountId}${principalType}${principalId}`,
      {
        permissionSetArn: this.permissionSet
          .getAtt('PermissionSetArn')
          .toString(),
        principalType,
        principalId,
        instanceArn: this.ssoInstanceArn,
        targetType: 'AWS_ACCOUNT',
        targetId: accountId,
      }
    );
  }
}
