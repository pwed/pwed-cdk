import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  name: 'pwed-cdk',
  description: 'A library of AWS CDK constructs that I have created',
  repositoryUrl: 'https://github.com/pwed/pwed-cdk.git',

  author: 'Fred Stoddart',
  authorAddress: 'pwed@users.noreply.github.com',

  cdkVersion: '2.10.0',
  defaultReleaseBranch: 'main',
  stability: 'experimental',
  keywords: ['cdk', 'aws'],
  license: 'MIT',

  // deps: [],
  bundledDeps: ['glob', 'cdk-iam-floyd'],
  peerDeps: ['cdk-ec2-key-pair', 'cdk-constants'], // * Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ['cdk-iam-floyd@0.300.0'] /* Build dependencies for this module. */,
  // packageName: undefined,  /* The "name" in package.json. */
  jsiiReleaseVersion: '0.21.1',
  prettier: true,
  prettierOptions: {
    settings: {
      semi: true,
      singleQuote: true,
      tabWidth: 2,
    },
  },

  // Publishing
  releaseToNpm: true,
  publishToPypi: {
    distName: 'pwed-cdk',
    module: 'pwed_cdk',
  },
  projenrcTs: true,
});
project.synth();
