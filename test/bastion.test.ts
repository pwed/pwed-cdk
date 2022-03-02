import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { WindowsBastion } from '../src/lib/bastion/index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'TestStack');

const vpc = cdk.aws_ec2.Vpc.fromVpcAttributes(stack, 'Vpc', {
  vpcId: 'vpc-03f831f144f6d3f60',
  publicSubnetIds: ['subnet-090981eaf852b32e2'],
  availabilityZones: ['us-east-1e'],
});

new WindowsBastion(stack, 'WindowsBastion', {
  vpc,
  vpcSubnets: vpc.selectSubnets({ subnetType: cdk.aws_ec2.SubnetType.PUBLIC }),
  createKeyPair: true,
});

const template = Template.fromStack(stack);

test('Has Instance', () => {
  template.hasResource('AWS::EC2::Instance', {});
});
