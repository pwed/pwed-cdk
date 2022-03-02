# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### BastionAccessPolicy <a name="BastionAccessPolicy" id="pwed-cdk.pwed_bastion.BastionAccessPolicy"></a>

#### Initializers <a name="Initializers" id="pwed-cdk.pwed_bastion.BastionAccessPolicy.Initializer"></a>

```typescript
import { pwed_bastion } from 'pwed-cdk'

new pwed_bastion.BastionAccessPolicy(scope: Construct, id: string, props?: BastionAccessPolicyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.BastionAccessPolicy.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.BastionAccessPolicy.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.BastionAccessPolicy.Initializer.parameter.props">props</a></code> | <code>pwed-cdk.pwed_bastion.BastionAccessPolicyProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pwed-cdk.pwed_bastion.BastionAccessPolicy.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pwed-cdk.pwed_bastion.BastionAccessPolicy.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="pwed-cdk.pwed_bastion.BastionAccessPolicy.Initializer.parameter.props"></a>

- *Type:* pwed-cdk.pwed_bastion.BastionAccessPolicyProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.BastionAccessPolicy.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="pwed-cdk.pwed_bastion.BastionAccessPolicy.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.BastionAccessPolicy.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="pwed-cdk.pwed_bastion.BastionAccessPolicy.isConstruct"></a>

```typescript
import { pwed_bastion } from 'pwed-cdk'

pwed_bastion.BastionAccessPolicy.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="pwed-cdk.pwed_bastion.BastionAccessPolicy.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.BastionAccessPolicy.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#pwed-cdk.pwed_bastion.BastionAccessPolicy.property.policy">policy</a></code> | <code>aws-cdk-lib.aws_iam.PolicyDocument</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="pwed-cdk.pwed_bastion.BastionAccessPolicy.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `policy`<sup>Required</sup> <a name="policy" id="pwed-cdk.pwed_bastion.BastionAccessPolicy.property.policy"></a>

```typescript
public readonly policy: PolicyDocument;
```

- *Type:* aws-cdk-lib.aws_iam.PolicyDocument

---


### BastionPermissionSet <a name="BastionPermissionSet" id="pwed-cdk.pwed_bastion.BastionPermissionSet"></a>

#### Initializers <a name="Initializers" id="pwed-cdk.pwed_bastion.BastionPermissionSet.Initializer"></a>

```typescript
import { pwed_bastion } from 'pwed-cdk'

new pwed_bastion.BastionPermissionSet(scope: Construct, id: string, props: BastionPermissionSetProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.BastionPermissionSet.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.BastionPermissionSet.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.BastionPermissionSet.Initializer.parameter.props">props</a></code> | <code>pwed-cdk.pwed_bastion.BastionPermissionSetProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pwed-cdk.pwed_bastion.BastionPermissionSet.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pwed-cdk.pwed_bastion.BastionPermissionSet.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="pwed-cdk.pwed_bastion.BastionPermissionSet.Initializer.parameter.props"></a>

- *Type:* pwed-cdk.pwed_bastion.BastionPermissionSetProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.BastionPermissionSet.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#pwed-cdk.pwed_bastion.BastionPermissionSet.assign">assign</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="pwed-cdk.pwed_bastion.BastionPermissionSet.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `assign` <a name="assign" id="pwed-cdk.pwed_bastion.BastionPermissionSet.assign"></a>

```typescript
public assign(accountId: string, principalId: string, principalType: string): void
```

###### `accountId`<sup>Required</sup> <a name="accountId" id="pwed-cdk.pwed_bastion.BastionPermissionSet.assign.parameter.accountId"></a>

- *Type:* string

---

###### `principalId`<sup>Required</sup> <a name="principalId" id="pwed-cdk.pwed_bastion.BastionPermissionSet.assign.parameter.principalId"></a>

- *Type:* string

---

###### `principalType`<sup>Required</sup> <a name="principalType" id="pwed-cdk.pwed_bastion.BastionPermissionSet.assign.parameter.principalType"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.BastionPermissionSet.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="pwed-cdk.pwed_bastion.BastionPermissionSet.isConstruct"></a>

```typescript
import { pwed_bastion } from 'pwed-cdk'

pwed_bastion.BastionPermissionSet.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="pwed-cdk.pwed_bastion.BastionPermissionSet.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.BastionPermissionSet.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#pwed-cdk.pwed_bastion.BastionPermissionSet.property.securityTag">securityTag</a></code> | <code>aws-cdk-lib.Tag</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="pwed-cdk.pwed_bastion.BastionPermissionSet.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `securityTag`<sup>Required</sup> <a name="securityTag" id="pwed-cdk.pwed_bastion.BastionPermissionSet.property.securityTag"></a>

```typescript
public readonly securityTag: Tag;
```

- *Type:* aws-cdk-lib.Tag

---


### ScheduleShutdown <a name="ScheduleShutdown" id="pwed-cdk.pwed_bastion.ScheduleShutdown"></a>

#### Initializers <a name="Initializers" id="pwed-cdk.pwed_bastion.ScheduleShutdown.Initializer"></a>

```typescript
import { pwed_bastion } from 'pwed-cdk'

new pwed_bastion.ScheduleShutdown(scope: Construct, id: string, props?: ScheduleShutdownProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.ScheduleShutdown.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.ScheduleShutdown.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.ScheduleShutdown.Initializer.parameter.props">props</a></code> | <code>pwed-cdk.pwed_bastion.ScheduleShutdownProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pwed-cdk.pwed_bastion.ScheduleShutdown.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pwed-cdk.pwed_bastion.ScheduleShutdown.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="pwed-cdk.pwed_bastion.ScheduleShutdown.Initializer.parameter.props"></a>

- *Type:* pwed-cdk.pwed_bastion.ScheduleShutdownProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.ScheduleShutdown.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="pwed-cdk.pwed_bastion.ScheduleShutdown.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.ScheduleShutdown.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="pwed-cdk.pwed_bastion.ScheduleShutdown.isConstruct"></a>

```typescript
import { pwed_bastion } from 'pwed-cdk'

pwed_bastion.ScheduleShutdown.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="pwed-cdk.pwed_bastion.ScheduleShutdown.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.ScheduleShutdown.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="pwed-cdk.pwed_bastion.ScheduleShutdown.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### StaticSite <a name="StaticSite" id="pwed-cdk.pwed_static_site.StaticSite"></a>

#### Initializers <a name="Initializers" id="pwed-cdk.pwed_static_site.StaticSite.Initializer"></a>

```typescript
import { pwed_static_site } from 'pwed-cdk'

new pwed_static_site.StaticSite(scope: Construct, id: string, props: StaticSiteProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_static_site.StaticSite.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_static_site.StaticSite.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_static_site.StaticSite.Initializer.parameter.props">props</a></code> | <code>pwed-cdk.pwed_static_site.StaticSiteProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pwed-cdk.pwed_static_site.StaticSite.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pwed-cdk.pwed_static_site.StaticSite.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="pwed-cdk.pwed_static_site.StaticSite.Initializer.parameter.props"></a>

- *Type:* pwed-cdk.pwed_static_site.StaticSiteProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pwed-cdk.pwed_static_site.StaticSite.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="pwed-cdk.pwed_static_site.StaticSite.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pwed-cdk.pwed_static_site.StaticSite.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="pwed-cdk.pwed_static_site.StaticSite.isConstruct"></a>

```typescript
import { pwed_static_site } from 'pwed-cdk'

pwed_static_site.StaticSite.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="pwed-cdk.pwed_static_site.StaticSite.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_static_site.StaticSite.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="pwed-cdk.pwed_static_site.StaticSite.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### WindowsBastion <a name="WindowsBastion" id="pwed-cdk.pwed_bastion.WindowsBastion"></a>

- *Implements:* aws-cdk-lib.aws_ec2.IInstance

#### Initializers <a name="Initializers" id="pwed-cdk.pwed_bastion.WindowsBastion.Initializer"></a>

```typescript
import { pwed_bastion } from 'pwed-cdk'

new pwed_bastion.WindowsBastion(scope: Construct, id: string, props: WindowsBastionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.Initializer.parameter.props">props</a></code> | <code>pwed-cdk.pwed_bastion.WindowsBastionProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pwed-cdk.pwed_bastion.WindowsBastion.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pwed-cdk.pwed_bastion.WindowsBastion.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="pwed-cdk.pwed_bastion.WindowsBastion.Initializer.parameter.props"></a>

- *Type:* pwed-cdk.pwed_bastion.WindowsBastionProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |

---

##### `toString` <a name="toString" id="pwed-cdk.pwed_bastion.WindowsBastion.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="pwed-cdk.pwed_bastion.WindowsBastion.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops being managed by CloudFormation, either because you've removed it from the CDK application or because you've made a change that requires the resource to be replaced.  The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="pwed-cdk.pwed_bastion.WindowsBastion.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.isResource">isResource</a></code> | Check whether the given construct is a Resource. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="pwed-cdk.pwed_bastion.WindowsBastion.isConstruct"></a>

```typescript
import { pwed_bastion } from 'pwed-cdk'

pwed_bastion.WindowsBastion.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="pwed-cdk.pwed_bastion.WindowsBastion.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isResource` <a name="isResource" id="pwed-cdk.pwed_bastion.WindowsBastion.isResource"></a>

```typescript
import { pwed_bastion } from 'pwed-cdk'

pwed_bastion.WindowsBastion.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="pwed-cdk.pwed_bastion.WindowsBastion.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | The network connections associated with this resource. |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.property.grantPrincipal">grantPrincipal</a></code> | <code>aws-cdk-lib.aws_iam.IPrincipal</code> | The principal to grant permissions to. |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.property.instanceAvailabilityZone">instanceAvailabilityZone</a></code> | <code>string</code> | The availability zone the instance was launched in. |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.property.instanceId">instanceId</a></code> | <code>string</code> | The instance's ID. |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.property.instancePrivateDnsName">instancePrivateDnsName</a></code> | <code>string</code> | Private DNS name for this instance. |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.property.instancePrivateIp">instancePrivateIp</a></code> | <code>string</code> | Private IP for this instance. |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.property.instancePublicDnsName">instancePublicDnsName</a></code> | <code>string</code> | Publicly-routable DNS name for this instance. |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.property.instancePublicIp">instancePublicIp</a></code> | <code>string</code> | Publicly-routable IP  address for this instance. |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.property.securityGroup">securityGroup</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="pwed-cdk.pwed_bastion.WindowsBastion.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="pwed-cdk.pwed_bastion.WindowsBastion.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK (generally, those created by creating new class instances like Role, Bucket, etc.), this is always the same as the environment of the stack they belong to; however, for imported resources (those obtained from static methods like fromRoleArn, fromBucketName, etc.), that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="pwed-cdk.pwed_bastion.WindowsBastion.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `connections`<sup>Required</sup> <a name="connections" id="pwed-cdk.pwed_bastion.WindowsBastion.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

The network connections associated with this resource.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="pwed-cdk.pwed_bastion.WindowsBastion.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

The principal to grant permissions to.

---

##### `instanceAvailabilityZone`<sup>Required</sup> <a name="instanceAvailabilityZone" id="pwed-cdk.pwed_bastion.WindowsBastion.property.instanceAvailabilityZone"></a>

```typescript
public readonly instanceAvailabilityZone: string;
```

- *Type:* string

The availability zone the instance was launched in.

---

##### `instanceId`<sup>Required</sup> <a name="instanceId" id="pwed-cdk.pwed_bastion.WindowsBastion.property.instanceId"></a>

```typescript
public readonly instanceId: string;
```

- *Type:* string

The instance's ID.

---

##### `instancePrivateDnsName`<sup>Required</sup> <a name="instancePrivateDnsName" id="pwed-cdk.pwed_bastion.WindowsBastion.property.instancePrivateDnsName"></a>

```typescript
public readonly instancePrivateDnsName: string;
```

- *Type:* string

Private DNS name for this instance.

---

##### `instancePrivateIp`<sup>Required</sup> <a name="instancePrivateIp" id="pwed-cdk.pwed_bastion.WindowsBastion.property.instancePrivateIp"></a>

```typescript
public readonly instancePrivateIp: string;
```

- *Type:* string

Private IP for this instance.

---

##### `instancePublicDnsName`<sup>Required</sup> <a name="instancePublicDnsName" id="pwed-cdk.pwed_bastion.WindowsBastion.property.instancePublicDnsName"></a>

```typescript
public readonly instancePublicDnsName: string;
```

- *Type:* string

Publicly-routable DNS name for this instance.

(May be an empty string if the instance does not have a public name).

---

##### `instancePublicIp`<sup>Required</sup> <a name="instancePublicIp" id="pwed-cdk.pwed_bastion.WindowsBastion.property.instancePublicIp"></a>

```typescript
public readonly instancePublicIp: string;
```

- *Type:* string

Publicly-routable IP  address for this instance.

(May be an empty string if the instance does not have a public IP).

---

##### `securityGroup`<sup>Required</sup> <a name="securityGroup" id="pwed-cdk.pwed_bastion.WindowsBastion.property.securityGroup"></a>

```typescript
public readonly securityGroup: ISecurityGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup

---


## Structs <a name="Structs" id="Structs"></a>

### BastionAccessPolicyProps <a name="BastionAccessPolicyProps" id="pwed-cdk.pwed_bastion.BastionAccessPolicyProps"></a>

#### Initializer <a name="Initializer" id="pwed-cdk.pwed_bastion.BastionAccessPolicyProps.Initializer"></a>

```typescript
import { pwed_bastion } from 'pwed-cdk'

const bastionAccessPolicyProps: pwed_bastion.BastionAccessPolicyProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.BastionAccessPolicyProps.property.securityTag">securityTag</a></code> | <code>aws-cdk-lib.Tag</code> | *No description.* |

---

##### `securityTag`<sup>Optional</sup> <a name="securityTag" id="pwed-cdk.pwed_bastion.BastionAccessPolicyProps.property.securityTag"></a>

```typescript
public readonly securityTag: Tag;
```

- *Type:* aws-cdk-lib.Tag

---

### BastionPermissionSetProps <a name="BastionPermissionSetProps" id="pwed-cdk.pwed_bastion.BastionPermissionSetProps"></a>

#### Initializer <a name="Initializer" id="pwed-cdk.pwed_bastion.BastionPermissionSetProps.Initializer"></a>

```typescript
import { pwed_bastion } from 'pwed-cdk'

const bastionPermissionSetProps: pwed_bastion.BastionPermissionSetProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.BastionPermissionSetProps.property.permissionSetName">permissionSetName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.BastionPermissionSetProps.property.ssoInstanceArn">ssoInstanceArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.BastionPermissionSetProps.property.securityTag">securityTag</a></code> | <code>aws-cdk-lib.Tag</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.BastionPermissionSetProps.property.sessionDuration">sessionDuration</a></code> | <code>string</code> | *No description.* |

---

##### `permissionSetName`<sup>Required</sup> <a name="permissionSetName" id="pwed-cdk.pwed_bastion.BastionPermissionSetProps.property.permissionSetName"></a>

```typescript
public readonly permissionSetName: string;
```

- *Type:* string

---

##### `ssoInstanceArn`<sup>Required</sup> <a name="ssoInstanceArn" id="pwed-cdk.pwed_bastion.BastionPermissionSetProps.property.ssoInstanceArn"></a>

```typescript
public readonly ssoInstanceArn: string;
```

- *Type:* string

---

##### `securityTag`<sup>Optional</sup> <a name="securityTag" id="pwed-cdk.pwed_bastion.BastionPermissionSetProps.property.securityTag"></a>

```typescript
public readonly securityTag: Tag;
```

- *Type:* aws-cdk-lib.Tag

---

##### `sessionDuration`<sup>Optional</sup> <a name="sessionDuration" id="pwed-cdk.pwed_bastion.BastionPermissionSetProps.property.sessionDuration"></a>

```typescript
public readonly sessionDuration: string;
```

- *Type:* string

---

### ScheduleShutdownProps <a name="ScheduleShutdownProps" id="pwed-cdk.pwed_bastion.ScheduleShutdownProps"></a>

#### Initializer <a name="Initializer" id="pwed-cdk.pwed_bastion.ScheduleShutdownProps.Initializer"></a>

```typescript
import { pwed_bastion } from 'pwed-cdk'

const scheduleShutdownProps: pwed_bastion.ScheduleShutdownProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.ScheduleShutdownProps.property.securityTag">securityTag</a></code> | <code>aws-cdk-lib.Tag</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.ScheduleShutdownProps.property.shutdownSchedule">shutdownSchedule</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.ScheduleShutdownProps.property.timezone">timezone</a></code> | <code>string</code> | *No description.* |

---

##### `securityTag`<sup>Optional</sup> <a name="securityTag" id="pwed-cdk.pwed_bastion.ScheduleShutdownProps.property.securityTag"></a>

```typescript
public readonly securityTag: Tag;
```

- *Type:* aws-cdk-lib.Tag

---

##### `shutdownSchedule`<sup>Optional</sup> <a name="shutdownSchedule" id="pwed-cdk.pwed_bastion.ScheduleShutdownProps.property.shutdownSchedule"></a>

```typescript
public readonly shutdownSchedule: string;
```

- *Type:* string

---

##### `timezone`<sup>Optional</sup> <a name="timezone" id="pwed-cdk.pwed_bastion.ScheduleShutdownProps.property.timezone"></a>

```typescript
public readonly timezone: string;
```

- *Type:* string

---

### StaticSiteProps <a name="StaticSiteProps" id="pwed-cdk.pwed_static_site.StaticSiteProps"></a>

#### Initializer <a name="Initializer" id="pwed-cdk.pwed_static_site.StaticSiteProps.Initializer"></a>

```typescript
import { pwed_static_site } from 'pwed-cdk'

const staticSiteProps: pwed_static_site.StaticSiteProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_static_site.StaticSiteProps.property.domain">domain</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_static_site.StaticSiteProps.property.path">path</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_static_site.StaticSiteProps.property.hostedZone">hostedZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | *No description.* |

---

##### `domain`<sup>Required</sup> <a name="domain" id="pwed-cdk.pwed_static_site.StaticSiteProps.property.domain"></a>

```typescript
public readonly domain: string;
```

- *Type:* string

---

##### `path`<sup>Required</sup> <a name="path" id="pwed-cdk.pwed_static_site.StaticSiteProps.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

##### `hostedZone`<sup>Optional</sup> <a name="hostedZone" id="pwed-cdk.pwed_static_site.StaticSiteProps.property.hostedZone"></a>

```typescript
public readonly hostedZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

---

### WindowsBastionProps <a name="WindowsBastionProps" id="pwed-cdk.pwed_bastion.WindowsBastionProps"></a>

#### Initializer <a name="Initializer" id="pwed-cdk.pwed_bastion.WindowsBastionProps.Initializer"></a>

```typescript
import { pwed_bastion } from 'pwed-cdk'

const windowsBastionProps: pwed_bastion.WindowsBastionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastionProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastionProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastionProps.property.createKeyPair">createKeyPair</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastionProps.property.securityTag">securityTag</a></code> | <code>aws-cdk-lib.Tag</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastionProps.property.windowsPackages">windowsPackages</a></code> | <code>string[]</code> | *No description.* |

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="pwed-cdk.pwed_bastion.WindowsBastionProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `vpcSubnets`<sup>Required</sup> <a name="vpcSubnets" id="pwed-cdk.pwed_bastion.WindowsBastionProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

---

##### `createKeyPair`<sup>Optional</sup> <a name="createKeyPair" id="pwed-cdk.pwed_bastion.WindowsBastionProps.property.createKeyPair"></a>

```typescript
public readonly createKeyPair: boolean;
```

- *Type:* boolean

---

##### `securityTag`<sup>Optional</sup> <a name="securityTag" id="pwed-cdk.pwed_bastion.WindowsBastionProps.property.securityTag"></a>

```typescript
public readonly securityTag: Tag;
```

- *Type:* aws-cdk-lib.Tag

---

##### `windowsPackages`<sup>Optional</sup> <a name="windowsPackages" id="pwed-cdk.pwed_bastion.WindowsBastionProps.property.windowsPackages"></a>

```typescript
public readonly windowsPackages: string[];
```

- *Type:* string[]

---



