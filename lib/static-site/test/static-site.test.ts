import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as StaticSite from '../index';
import * as path from 'path';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'TestStack');

new StaticSite.StaticSite(stack, 'MyTestConstruct', {
  domain: 'example.com',
  path: path.join(__dirname, 'example.com'),
  hostedZone: cdk.aws_route53.HostedZone.fromHostedZoneAttributes(stack, 'HZ', {
    zoneName: 'example.com',
    hostedZoneId: 'Z01234567EXAMPLE8OOO',
  }),
});
const template = Template.fromStack(stack);

test('Has Bucket', () => {
  template.hasResource('AWS::S3::Bucket', {});
});

test('Has Distribution', () => {
  template.hasResource('AWS::CloudFront::Distribution', {});
});

test('Matches Snapshot', () => {
  expect(template).toMatchSnapshot();
});
