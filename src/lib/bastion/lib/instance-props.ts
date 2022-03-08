import { aws_ec2, aws_iam } from 'aws-cdk-lib';
import { SecurityTagable } from './security-tag';

export interface BastionInstanceProps extends SecurityTagable {
  /**
   * Where to place the instance within the VPC.
   *
   * @default - Private subnets.
   * @stability stable
   */
  readonly vpcSubnets: aws_ec2.SubnetSelection;
  /**
   * VPC to launch the instance in.
   *
   * @stability stable
   */
  readonly vpc: aws_ec2.IVpc;
  /**
   * Security Group to assign to this instance.
   *
   * @default - create new security group
   * @stability stable
   */
  readonly securityGroup?: aws_ec2.ISecurityGroup;
  /**
   * Type of instance to launch.
   *
   * @default - t3a.large
   * @stability stable
   */
  readonly instanceType?: aws_ec2.InstanceType;
  /**
   * AMI to launch.
   *
   * @default - latest windows server 2022 full base
   * @stability stable
   */
  readonly machineImage?: aws_ec2.IMachineImage;
  /**
   * Specific UserData to use.
   *
   * The UserData may still be mutated after creation.
   *
   * @default - A UserData object appropriate for the MachineImage's
   * Operating System is created.
   * @stability stable
   */
  readonly userData?: aws_ec2.UserData;
  /**
   * An IAM role to associate with the instance profile assigned to this Auto Scaling Group.
   *
   * The role must be assumable by the service principal `ec2.amazonaws.com`:
   *
   * @default - A role will automatically be created, it can be accessed via the `role` property
   * @stability stable
   * @example
   *
   * const role = new iam.Role(this, 'MyRole', {
   *   assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com')
   * });
   */
  readonly role?: aws_iam.IRole;
  /**
   * The name of the instance.
   *
   * @default - CDK generated name
   * @stability stable
   */
  readonly instanceName?: string;
  /**
   * Specifies how block devices are exposed to the instance. You can specify virtual devices and EBS volumes.
   *
   * Each instance that is launched has an associated root device volume,
   * either an Amazon EBS volume or an instance store volume.
   * You can use block device mappings to specify additional EBS volumes or
   * instance store volumes to attach to an instance when it is launched.
   *
   * @default - Uses the block device mapping of the AMI
   * @see https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/block-device-mapping-concepts.html
   * @stability stable
   */
  readonly blockDevices?: aws_ec2.BlockDevice[];
  /**
   * Defines a private IP address to associate with an instance.
   *
   * Private IP should be available within the VPC that the instance is build within.
   *
   * @default - no association
   * @stability stable
   */
  readonly privateIpAddress?: string;
}
