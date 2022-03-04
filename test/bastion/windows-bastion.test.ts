import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { WindowsBastion } from '../../src/lib/bastion/index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'TestStack');

test('Has Instance', () => {
  const vpc = cdk.aws_ec2.Vpc.fromVpcAttributes(stack, 'Vpc', {
    vpcId: 'vpc-03f831f144f6d3f60',
    publicSubnetIds: ['subnet-090981eaf852b32e2'],
    availabilityZones: ['us-east-1e'],
  });
  const vpcSubnets = vpc.selectSubnets({
    subnetType: cdk.aws_ec2.SubnetType.PUBLIC,
  });

  const userData = cdk.aws_ec2.UserData.forWindows();
  userData.addCommands('echo yay');
  new WindowsBastion(stack, 'WindowsBastion', {
    vpc,
    vpcSubnets,
    createKeyPair: true,
    windowsPackages: ['Oracle.MySQL'],
  });

  const template = Template.fromStack(stack);
  template.hasResource('AWS::EC2::Instance', {});
});
