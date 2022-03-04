import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { BastionPermissionSet } from '../../src/lib/bastion/index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'TestStack');

new BastionPermissionSet(stack, 'PermissionSet', {
  instanceArn: 'asdsadasd',
  securityTag: new cdk.Tag('sec:bastion', 'test'),
  name: 'name',
});

const template = Template.fromStack(stack);

test('Has PermissionSet', () => {
  template.hasResource('AWS::SSO::PermissionSet', {});
});
