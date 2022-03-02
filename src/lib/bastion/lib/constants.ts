import { Tag } from 'aws-cdk-lib';

export const Constants = {
  securityTag: new Tag('security:bastion', 'true'),
};
