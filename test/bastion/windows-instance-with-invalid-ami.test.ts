import * as cdk from 'aws-cdk-lib';
import { WindowsBastion } from '../../src/lib/bastion/index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'TestStack');

const vpc = cdk.aws_ec2.Vpc.fromVpcAttributes(stack, 'Vpc', {
  vpcId: 'vpc-03f831f144f6d3f60',
  publicSubnetIds: ['subnet-090981eaf852b32e2'],
  availabilityZones: ['us-east-1e'],
});
const vpcSubnets = vpc.selectSubnets({
  subnetType: cdk.aws_ec2.SubnetType.PUBLIC,
});

test('Invalid machine Image', () => {
  expect(() => {
    new WindowsBastion(stack, 'LinuxWindowsBastion', {
      vpc,
      vpcSubnets,
      machineImage: cdk.aws_ec2.MachineImage.latestAmazonLinux({
        generation: cdk.aws_ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
    });
  }).toThrowError();
});
