const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Freddie',
  authorAddress: 'pwed@users.noreply.github.com',
  cdkVersion: '2.10.0',
  defaultReleaseBranch: 'main',
  name: 'pwed-cdk',
  repositoryUrl: 'git@github.com:pwed/pwed-cdk.git',
  bundledDeps: ['glob', 'cdk-iam-floyd'],

  deps: ['cdk-ec2-key-pair', 'cdk-constants', 'cdk-iam-floyd@0.300.0'], // * Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
