import { Tag } from 'aws-cdk-lib';

export const DefaultSecurityTag = new Tag('security:bastion', 'true');

export interface SecurityTagable {
  /**
   * Tag used by all bastion resources for managing access to resources
   *
   * @default - {Key: "security:bastion", value: "true"}
   * @stability stable
   */
  readonly securityTag?: Tag;
}
