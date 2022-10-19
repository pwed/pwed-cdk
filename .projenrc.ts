import * as projen from 'projen';
const project = new projen.awscdk.AwsCdkConstructLibrary({
  name: 'pwed-cdk',
  description: 'A library of AWS CDK constructs that I have created',
  repositoryUrl: 'https://github.com/pwed/pwed-cdk.git',

  author: 'Fred Stoddart',
  authorAddress: 'pwed@users.noreply.github.com',

  cdkVersion: '2.39.0',
  defaultReleaseBranch: 'main',
  stability: 'experimental',
  keywords: ['cdk', 'aws'],
  license: 'MIT',

  deps: ['cdk-iam-floyd@0.300.0'],
  bundledDeps: ['glob', 'cdk-ec2-key-pair', 'cdk-iam-floyd'],
  peerDeps: [], // Runtime dependencies of this module.
  devDeps: ['cdk-iam-floyd@0.300.0'],

  prettier: true,
  prettierOptions: {
    settings: {
      semi: true,
      singleQuote: true,
      tabWidth: 2,
    },
  },
  eslintOptions: {
    prettier: true,
    dirs: ['src'],
  },

  depsUpgradeOptions: {
    workflowOptions: {
      schedule: projen.javascript.UpgradeDependenciesSchedule.MONTHLY,
    },
  },

  // Publishing
  // releaseWorkflowSetupSteps: [
  //   {
  //     name: 'Install acl',
  //     run: 'apt-get update && apt-get install -y acl',
  //   },
  // ],
  releaseToNpm: true,
  publishToPypi: {
    distName: 'pwed-cdk',
    module: 'pwed_cdk',
  },

  devContainer: true,
  projenrcTs: true,
});
project.synth();
