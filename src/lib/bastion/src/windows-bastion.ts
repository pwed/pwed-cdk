import { aws_ec2, aws_iam, Resource, Stack, Tags } from 'aws-cdk-lib';
import { KeyPair } from 'cdk-ec2-key-pair';
import { Construct } from 'constructs';
import { BastionInstanceProps } from './instance-props';
import { DefaultSecurityTag } from './security-tag';

export interface WindowsBastionProps extends BastionInstanceProps {
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
      },
    );

    if (
      props.machineImage &&
      props.machineImage.getImage(this).osType !=
        aws_ec2.OperatingSystemType.WINDOWS
    ) {throw 'machineImage is not Windows based';}

    const machineImage = props.machineImage
      ? props.machineImage
      : aws_ec2.MachineImage.latestWindows(
        aws_ec2.WindowsVersion.WINDOWS_SERVER_2022_ENGLISH_FULL_BASE,
      );
    const instanceType = props.instanceType
      ? props.instanceType
      : aws_ec2.InstanceType.of(
        aws_ec2.InstanceClass.T3A,
        aws_ec2.InstanceSize.LARGE,
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
      instanceProps,
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
        'AmazonSSMManagedInstanceCore',
      ),
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
