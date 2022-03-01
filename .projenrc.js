const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Fred Stoddart',
  authorAddress: 'pwed@users.noreply.github.com',
  cdkVersion: '2.10.0',
  defaultReleaseBranch: 'main',
  name: 'pwed-cdk',
  repositoryUrl: 'git@github.com:pwed/pwed-cdk.git',
  license: 'MIT',

  deps: ['cdk-iam-floyd@0.300.0'],
  bundledDeps: ['glob', 'cdk-iam-floyd'],
  peerDeps: ['cdk-ec2-key-pair', 'cdk-constants'], // * Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */

  // Publishing
  releaseToNpm: true,
  npmTokenSecret: 'NPM_ACCESS_TOKEN',
});
project.synth();
