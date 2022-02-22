import { Tag } from 'aws-cdk-lib';

export const Constants: any = {
  securityTag: new Tag('security:bastion', 'true'),
};
