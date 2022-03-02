import { aws_iam, aws_sso, Tag } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BastionAccessPolicy } from './access-policy';
import { Constants } from './constants';

export interface IBastionPermissionSetProps {
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
  constructor(scope: Construct, id: string, props: IBastionPermissionSetProps) {
    super(scope, id);

    this.securityTag = props.securityTag
      ? props.securityTag
      : Constants.securityTag;

    this.ssoInstanceArn = props.ssoInstanceArn;

    const accessPolicy = new BastionAccessPolicy(this, 'BastionAccessPolicy', {
      securityTag: this.securityTag,
    });

    this.policy = accessPolicy.policy;

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
