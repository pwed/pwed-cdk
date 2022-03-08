import { aws_ec2, aws_iam, Resource, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BastionInstanceProps } from './instance-props';
import { DefaultSecurityTag } from './security-tag';

export interface LinuxBastionProps extends BastionInstanceProps {
  /**
   * List of packages to be installed as part of the userdata using winget.
   *
   * @default - []
   * @stability experimental
   */
  readonly packages?: string[];
  /**
   * Package manager used for installing packages
   *
   * @default - dnf
   * @stability experimental
   */
  readonly packageManager?: LinuxPackageManager;
}

export enum LinuxPackageManager {
  APT = 'apt-get',
  YUM = 'yum',
  DNF = 'dnf',
}

export class LinuxBastion extends Resource implements aws_ec2.IInstance {
  readonly securityGroup: aws_ec2.ISecurityGroup;
  readonly instanceId: string;
  readonly instanceAvailabilityZone: string;
  readonly instancePrivateDnsName: string;
  readonly instancePrivateIp: string;
  readonly instancePublicDnsName: string;
  readonly instancePublicIp: string;
  readonly connections: aws_ec2.Connections;
  readonly grantPrincipal: aws_iam.IPrincipal;
  readonly role: aws_iam.IRole;

  constructor(scope: Construct, id: string, props: LinuxBastionProps) {
    super(scope, id);

    const securityTag = props?.securityTag
      ? props.securityTag
      : DefaultSecurityTag;

    this.securityGroup = new aws_ec2.SecurityGroup(
      this,
      'BastionSecurityGroup',
      {
        vpc: props.vpc,
        allowAllOutbound: true,
      }
    );

    if (
      props.machineImage &&
      props.machineImage.getImage(this).osType !=
        aws_ec2.OperatingSystemType.LINUX
    )
      throw 'machineImage is not Linux based';
    const instanceType = props.instanceType
      ? props.instanceType
      : aws_ec2.InstanceType.of(
          aws_ec2.InstanceClass.T3A,
          aws_ec2.InstanceSize.LARGE
        );
    let amazonLinuxCpuType: aws_ec2.AmazonLinuxCpuType =
      aws_ec2.AmazonLinuxCpuType.ARM_64;
    if (instanceType.architecture == 'x86_64')
      amazonLinuxCpuType = aws_ec2.AmazonLinuxCpuType.X86_64;

    const machineImage = props.machineImage
      ? props.machineImage
      : aws_ec2.MachineImage.latestAmazonLinux({
          generation: aws_ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
          cpuType: amazonLinuxCpuType,
        });

    const instanceProps: aws_ec2.InstanceProps = {
      ...props,
      propagateTagsToVolumeOnCreation: true,
      userDataCausesReplacement: true,
      machineImage,
      instanceType,
    };

    const bastionInstance = new aws_ec2.Instance(
      this,
      'BastionInstance',
      instanceProps
    );

    const packageManager = props.packageManager
      ? props.packageManager
      : LinuxPackageManager.DNF;

    bastionInstance.addUserData(
      `${packageManager} update -y`,
      `${packageManager} upgrade -y`
    );

    if (props.packages)
      bastionInstance.addUserData(
        `${packageManager} install -y ${props.packages.join(' ')}`
      );

    Tags.of(bastionInstance.instance).add(securityTag.key, securityTag.value);

    bastionInstance.role.addManagedPolicy(
      aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
        'AmazonSSMManagedInstanceCore'
      )
    );
    this.instanceId = bastionInstance.instanceId;
    this.instanceAvailabilityZone = bastionInstance.instanceAvailabilityZone;
    this.instancePrivateDnsName = bastionInstance.instancePrivateDnsName;
    this.instancePrivateIp = bastionInstance.instancePrivateIp;
    this.grantPrincipal = bastionInstance.grantPrincipal;
    this.instancePublicDnsName = bastionInstance.instancePublicDnsName;
    this.instancePublicIp = bastionInstance.instancePublicIp;
    this.connections = bastionInstance.connections;
    this.role = bastionInstance.role;
  }
}
