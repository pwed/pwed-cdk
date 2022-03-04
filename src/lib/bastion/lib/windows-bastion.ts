import { aws_ec2, aws_iam, Resource, Stack, Tags } from 'aws-cdk-lib';
import { KeyPair } from 'cdk-ec2-key-pair';
import { Construct } from 'constructs';
import { DefaultSecurityTag, SecurityTagable } from './security-tag';

export interface WindowsBastionProps extends SecurityTagable {
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
  /**
   * If a keypair should be created and saved into Secrets Manager.
   *
   * This can be used to get Administrator user access
   *
   * @default - false
   * @stability stable
   */
  readonly createKeyPair?: boolean;
  /**
   * List of packages to be installed as part of the userdata using winget.
   *
   * @default - no association
   * @stability experimental
   */
  readonly windowsPackages?: string[];
}

export class WindowsBastion extends Resource implements aws_ec2.IInstance {
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

  constructor(scope: Construct, id: string, props: WindowsBastionProps) {
    super(scope, id);

    const securityTag = props?.securityTag
      ? props.securityTag
      : DefaultSecurityTag;

    const key: undefined | KeyPair = props?.createKeyPair
      ? new KeyPair(this, 'KeyPair', {
          name: `${Stack.of(this).stackName}-${id}-windows-bastion-key`,
          storePublicKey: false,
        })
      : undefined;
    if (key) Tags.of(key).add(securityTag.key, securityTag.value);

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
        aws_ec2.OperatingSystemType.WINDOWS
    )
      throw 'machineImage is not Windows based';

    const machineImage = props.machineImage
      ? props.machineImage
      : aws_ec2.MachineImage.latestWindows(
          aws_ec2.WindowsVersion.WINDOWS_SERVER_2022_ENGLISH_FULL_BASE
        );
    const instanceType = props.instanceType
      ? props.instanceType
      : aws_ec2.InstanceType.of(
          aws_ec2.InstanceClass.T3A,
          aws_ec2.InstanceSize.LARGE
        );

    const instanceProps: aws_ec2.InstanceProps = {
      ...props,
      propagateTagsToVolumeOnCreation: true,
      userDataCausesReplacement: true,
      keyName: key?.keyPairName,
      machineImage,
      instanceType,
    };

    const bastionInstance = new aws_ec2.Instance(
      this,
      'BastionInstance',
      instanceProps
    );

    if (props.windowsPackages) {
      const packageUserData = [
        'Write-Output "Waiting before installing packages incase another installer is already running"',
        'Start-Sleep -Seconds 150',
        // Unfortunately Windows Server 2022 doesn't support WinGet yet ...
        // https://github.com/microsoft/winget-cli/issues/1929
        'iwr -UseBasicParsing https://github.com/jedieaston/winget-build/raw/main/Install.ps1 | iex',
        ...props.windowsPackages.map((p) => {
          return `wingetdev install --silent --accept-source-agreements --accept-package-agreements ${p}`;
        }),
        'wingetdev upgrade --all --silent --accept-source-agreements --accept-package-agreements',
      ].join('\n');

      bastionInstance.addUserData(packageUserData);
    }

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
