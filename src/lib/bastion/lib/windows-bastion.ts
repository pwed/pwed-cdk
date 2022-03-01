import { Aws, aws_ec2, aws_iam, Tag, Tags } from 'aws-cdk-lib';
import { ManagedPolicies } from 'cdk-constants';
import { KeyPair } from 'cdk-ec2-key-pair';
import { Construct } from 'constructs';
import { Constants } from './constants';

export interface IWindowsBastionProps {
  securityTag?: Tag;
  createKeyPair?: boolean;
  vpc: aws_ec2.IVpc;
  windowsPackages?: string[];
  vpcSubnets: aws_ec2.SubnetSelection;
}

export class WindowsBastion extends Construct {
  securityGroup: aws_ec2.ISecurityGroup;

  constructor(scope: Construct, id: string, props: IWindowsBastionProps) {
    super(scope, id);

    const securityTag = props?.securityTag
      ? props.securityTag
      : Constants.securityTag;

    const key: undefined | KeyPair = props?.createKeyPair
      ? new KeyPair(this, 'KeyPair', {
        name: `${Aws.STACK_NAME}-${id}-windows-bastion-key`,
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

    const bastionInstance = new aws_ec2.Instance(this, 'BastionInstance', {
      instanceType: aws_ec2.InstanceType.of(
        aws_ec2.InstanceClass.C5A,
        aws_ec2.InstanceSize.XLARGE,
      ),
      machineImage: aws_ec2.MachineImage.latestWindows(
        aws_ec2.WindowsVersion.WINDOWS_SERVER_2022_ENGLISH_FULL_BASE,
      ),
      vpc: props.vpc,
      vpcSubnets: props.vpcSubnets,
      blockDevices: [
        {
          deviceName: '/dev/sda1',
          volume: aws_ec2.BlockDeviceVolume.ebs(40, {
            volumeType: aws_ec2.EbsDeviceVolumeType.GP3,
            encrypted: true,
          }),
        },
      ],
      propagateTagsToVolumeOnCreation: true,
      keyName: key?.keyPairName,
      securityGroup: this.securityGroup,
      userDataCausesReplacement: true,
    });

    const windowsPackages = props.windowsPackages ? props.windowsPackages : [];

    const userData = [
      'for($i=1; $i -le 10; $i++) {',
      '  reg query HKLMSOFTWAREMicrosoftWindowsCurrentVersionInstallerInProgress',
      '  if ($LASTEXITCODE -ne 0 ) {',
      '    Write-Output "No installer is running, continuing"',
      '    break',
      '  }',
      '  Write-Output "Another installer is running, waiting ($i / 10)"',
      '  Start-Sleep -Seconds 15',
      '}',
      // Unfortunately Windows Server 2022 doesn't support WinGet yet ...
      // https://github.com/microsoft/winget-cli/issues/1929
      'iwr -UseBasicParsing https://github.com/jedieaston/winget-build/raw/main/Install.ps1 | iex',
      ...windowsPackages.map((p) => {
        return `wingetdev install --silent --accept-source-agreements --accept-package-agreements ${p}`;
      }),
      'wingetdev upgrade --all --silent --accept-source-agreements --accept-package-agreements',
    ].join('\n');

    bastionInstance.addUserData(userData);

    Tags.of(bastionInstance.instance).add(securityTag.key, securityTag.value);

    bastionInstance.role.addManagedPolicy(
      aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
        ManagedPolicies.AMAZON_SSM_MANAGED_INSTANCE_CORE,
      ),
    );
  }
}
