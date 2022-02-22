import { Aws, aws_ec2, aws_iam, Tag, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { KeyPair } from 'cdk-ec2-key-pair';
import { ManagedPolicies } from 'cdk-constants';
import { Constants } from './constants';

interface WindowsBastionProps {
  securityTag?: Tag;
  createKeyPair?: boolean;
  vpc: aws_ec2.IVpc;
  windowsPackages?: string[];
  vpcSubnets: aws_ec2.SubnetSelection;
}

export class WindowsBastion extends Construct {
  securityGroup: aws_ec2.ISecurityGroup;

  constructor(scope: Construct, id: string, props: WindowsBastionProps) {
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
      }
    );

    const bastionInstance = new aws_ec2.Instance(this, 'BastionInstance', {
      instanceType: aws_ec2.InstanceType.of(
        aws_ec2.InstanceClass.C5A,
        aws_ec2.InstanceSize.XLARGE
      ),
      machineImage: aws_ec2.MachineImage.latestWindows(
        aws_ec2.WindowsVersion.WINDOWS_SERVER_2022_ENGLISH_FULL_BASE
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

    const userData = aws_ec2.UserData.forWindows();

    userData.addCommands(
      'function Retry-Command {',
      '    [CmdletBinding()]',
      '    Param(',
      '        [Parameter(Position=0, Mandatory=$true)]',
      '        [scriptblock]$ScriptBlock,',
      '',
      '        [Parameter(Position=1, Mandatory=$false)]',
      '        [int]$Maximum = 5,',
      '',
      '        [Parameter(Position=2, Mandatory=$false)]',
      '        [int]$Delay = 100',
      '    )',
      '',
      '    Begin {',
      '        $cnt = 0',
      '    }',
      '',
      '    Process {',
      '        do {',
      '            $cnt++',
      '            try {',
      '                $ScriptBlock.Invoke()',
      '                return',
      '            } catch {',
      '                Write-Error $_.Exception.InnerException.Message -ErrorAction Continue',
      '                Start-Sleep -Seconds $Delay',
      '            }',
      '        } while ($cnt -lt $Maximum)',
      '',
      "        # Throw an error after $Maximum unsuccessful invocations. Doesn't need",
      '        # a condition, since the function returns upon successful invocation.',
      "        throw 'Execution failed.'",
      '    }',
      '}',
      // Unfortunately Windows Server 2022 doesn't support WinGet yet ...
      // https://github.com/microsoft/winget-cli/issues/1929
      'iwr -UseBasicParsing https://github.com/jedieaston/winget-build/raw/main/Install.ps1 | iex'
    );

    if (props?.windowsPackages) {
      userData.addCommands(
        ...props.windowsPackages.map((p) => {
          // Needs more tweaking some packages are failing to install
          return `Retry-Command -ScriptBlock { wingetdev install --silent --accept-source-agreements --accept-package-agreements ${p} } -Maximum 5 -Delay 15`;
        })
      );
    }

    bastionInstance.addUserData(userData.render());

    Tags.of(bastionInstance.instance).add(securityTag.key, securityTag.value);

    bastionInstance.role.addManagedPolicy(
      aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
        ManagedPolicies.AMAZON_SSM_MANAGED_INSTANCE_CORE
      )
    );
  }
}
