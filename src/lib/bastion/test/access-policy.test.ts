import * as cdk from 'aws-cdk-lib';
import { BastionAccessPolicy } from '../src/index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'TestStack');

const accessPolicy = new BastionAccessPolicy(stack, 'AccessPolicy').policy;

test('Has Policy', () => {
  new cdk.assertions.Capture(accessPolicy);
});
