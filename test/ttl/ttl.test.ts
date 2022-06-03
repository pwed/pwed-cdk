import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as Ttl from '../../src/lib/ttl';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'TestStack');

new Ttl.Ttl(stack, 'MyTestConstruct', {
  ttl: Duration.hours(4),
});
const template = Template.fromStack(stack);

test('Has Lambda', () => {
  template.hasResource('AWS::Lambda::Function', {});
});

test('Has Role', () => {
  template.hasResource('AWS::IAM::Role', {});
});

test('Matches Snapshot', () => {
  expect(template).toMatchSnapshot();
});
