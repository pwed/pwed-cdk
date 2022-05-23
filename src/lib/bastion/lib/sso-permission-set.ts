import { aws_iam, aws_sso, Resource, Tag } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BastionAccessPolicy, BastionAccessPolicyProps } from './access-policy';
import { DefaultSecurityTag } from './security-tag';

export interface BastionPermissionSetProps
  extends aws_sso.CfnPermissionSetProps,
    BastionAccessPolicyProps {}

export class BastionPermissionSet extends Resource {
  private policy: aws_iam.PolicyDocument;
  private permissionSet: aws_sso.CfnPermissionSet;
  private ssoInstanceArn: string;
  securityTag: Tag;
  constructor(scope: Construct, id: string, props: BastionPermissionSetProps) {
    super(scope, id);

    this.securityTag = props.securityTag
      ? props.securityTag
      : DefaultSecurityTag;

    this.ssoInstanceArn = props.instanceArn;

    const accessPolicy = new BastionAccessPolicy(this, 'BastionAccessPolicy', {
      securityTag: this.securityTag,
    });

    this.policy = accessPolicy.policy;

    this.permissionSet = new aws_sso.CfnPermissionSet(
      this,
      'BastionAccessPermissionSet',
      {
        instanceArn: props.instanceArn,
        inlinePolicy: this.policy,
        name: props.name,
        sessionDuration: props.sessionDuration ? props.sessionDuration : 'PT4H',
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
