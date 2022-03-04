import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ScheduleShutdown } from '../../src/lib/bastion/index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'TestStack');

new ScheduleShutdown(stack, 'shutdown', {
  securityTag: new cdk.Tag('sec:bastion', 'test'),
});

const template = Template.fromStack(stack);

test('Shutdown', () => {
  template.hasResource('AWS::SSM::MaintenanceWindow', {});
  template.hasResource('AWS::SSM::MaintenanceWindowTarget', {});
});
