# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### BastionPermissionSet <a name="BastionPermissionSet" id="pwed-cdk.pwed_bastion.BastionPermissionSet"></a>

#### Initializers <a name="Initializers" id="pwed-cdk.pwed_bastion.BastionPermissionSet.Initializer"></a>

```typescript
import { pwed_bastion } from 'pwed-cdk'

new pwed_bastion.BastionPermissionSet(scope: Construct, id: string, props: IBastionPermissionSetProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.BastionPermissionSet.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.BastionPermissionSet.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.BastionPermissionSet.Initializer.parameter.props">props</a></code> | <code>pwed-cdk.pwed_bastion.IBastionPermissionSetProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pwed-cdk.pwed_bastion.BastionPermissionSet.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pwed-cdk.pwed_bastion.BastionPermissionSet.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="pwed-cdk.pwed_bastion.BastionPermissionSet.Initializer.parameter.props"></a>

- *Type:* pwed-cdk.pwed_bastion.IBastionPermissionSetProps

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

new pwed_bastion.ScheduleShutdown(scope: Construct, id: string, props?: IScheduleShutdownProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.ScheduleShutdown.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.ScheduleShutdown.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.ScheduleShutdown.Initializer.parameter.props">props</a></code> | <code>pwed-cdk.pwed_bastion.IScheduleShutdownProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pwed-cdk.pwed_bastion.ScheduleShutdown.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pwed-cdk.pwed_bastion.ScheduleShutdown.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="pwed-cdk.pwed_bastion.ScheduleShutdown.Initializer.parameter.props"></a>

- *Type:* pwed-cdk.pwed_bastion.IScheduleShutdownProps

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

#### Initializers <a name="Initializers" id="pwed-cdk.pwed_bastion.WindowsBastion.Initializer"></a>

```typescript
import { pwed_bastion } from 'pwed-cdk'

new pwed_bastion.WindowsBastion(scope: Construct, id: string, props: IWindowsBastionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.Initializer.parameter.props">props</a></code> | <code>pwed-cdk.pwed_bastion.IWindowsBastionProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pwed-cdk.pwed_bastion.WindowsBastion.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pwed-cdk.pwed_bastion.WindowsBastion.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="pwed-cdk.pwed_bastion.WindowsBastion.Initializer.parameter.props"></a>

- *Type:* pwed-cdk.pwed_bastion.IWindowsBastionProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="pwed-cdk.pwed_bastion.WindowsBastion.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

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

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#pwed-cdk.pwed_bastion.WindowsBastion.property.securityGroup">securityGroup</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="pwed-cdk.pwed_bastion.WindowsBastion.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `securityGroup`<sup>Required</sup> <a name="securityGroup" id="pwed-cdk.pwed_bastion.WindowsBastion.property.securityGroup"></a>

```typescript
public readonly securityGroup: ISecurityGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup

---


## Structs <a name="Structs" id="Structs"></a>

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


## Protocols <a name="Protocols" id="Protocols"></a>

### IBastionPermissionSetProps <a name="IBastionPermissionSetProps" id="pwed-cdk.pwed_bastion.IBastionPermissionSetProps"></a>

- *Implemented By:* pwed-cdk.pwed_bastion.IBastionPermissionSetProps


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.IBastionPermissionSetProps.property.permissionSetName">permissionSetName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.IBastionPermissionSetProps.property.ssoInstanceArn">ssoInstanceArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.IBastionPermissionSetProps.property.securityTag">securityTag</a></code> | <code>aws-cdk-lib.Tag</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.IBastionPermissionSetProps.property.sessionDuration">sessionDuration</a></code> | <code>string</code> | *No description.* |

---

##### `permissionSetName`<sup>Required</sup> <a name="permissionSetName" id="pwed-cdk.pwed_bastion.IBastionPermissionSetProps.property.permissionSetName"></a>

```typescript
public readonly permissionSetName: string;
```

- *Type:* string

---

##### `ssoInstanceArn`<sup>Required</sup> <a name="ssoInstanceArn" id="pwed-cdk.pwed_bastion.IBastionPermissionSetProps.property.ssoInstanceArn"></a>

```typescript
public readonly ssoInstanceArn: string;
```

- *Type:* string

---

##### `securityTag`<sup>Optional</sup> <a name="securityTag" id="pwed-cdk.pwed_bastion.IBastionPermissionSetProps.property.securityTag"></a>

```typescript
public readonly securityTag: Tag;
```

- *Type:* aws-cdk-lib.Tag

---

##### `sessionDuration`<sup>Optional</sup> <a name="sessionDuration" id="pwed-cdk.pwed_bastion.IBastionPermissionSetProps.property.sessionDuration"></a>

```typescript
public readonly sessionDuration: string;
```

- *Type:* string

---

### IScheduleShutdownProps <a name="IScheduleShutdownProps" id="pwed-cdk.pwed_bastion.IScheduleShutdownProps"></a>

- *Implemented By:* pwed-cdk.pwed_bastion.IScheduleShutdownProps


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.IScheduleShutdownProps.property.securityTag">securityTag</a></code> | <code>aws-cdk-lib.Tag</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.IScheduleShutdownProps.property.shutdownSchedule">shutdownSchedule</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.IScheduleShutdownProps.property.timezone">timezone</a></code> | <code>string</code> | *No description.* |

---

##### `securityTag`<sup>Optional</sup> <a name="securityTag" id="pwed-cdk.pwed_bastion.IScheduleShutdownProps.property.securityTag"></a>

```typescript
public readonly securityTag: Tag;
```

- *Type:* aws-cdk-lib.Tag

---

##### `shutdownSchedule`<sup>Optional</sup> <a name="shutdownSchedule" id="pwed-cdk.pwed_bastion.IScheduleShutdownProps.property.shutdownSchedule"></a>

```typescript
public readonly shutdownSchedule: string;
```

- *Type:* string

---

##### `timezone`<sup>Optional</sup> <a name="timezone" id="pwed-cdk.pwed_bastion.IScheduleShutdownProps.property.timezone"></a>

```typescript
public readonly timezone: string;
```

- *Type:* string

---

### IWindowsBastionProps <a name="IWindowsBastionProps" id="pwed-cdk.pwed_bastion.IWindowsBastionProps"></a>

- *Implemented By:* pwed-cdk.pwed_bastion.IWindowsBastionProps


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pwed-cdk.pwed_bastion.IWindowsBastionProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.IWindowsBastionProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.IWindowsBastionProps.property.createKeyPair">createKeyPair</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.IWindowsBastionProps.property.securityTag">securityTag</a></code> | <code>aws-cdk-lib.Tag</code> | *No description.* |
| <code><a href="#pwed-cdk.pwed_bastion.IWindowsBastionProps.property.windowsPackages">windowsPackages</a></code> | <code>string[]</code> | *No description.* |

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="pwed-cdk.pwed_bastion.IWindowsBastionProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `vpcSubnets`<sup>Required</sup> <a name="vpcSubnets" id="pwed-cdk.pwed_bastion.IWindowsBastionProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

---

##### `createKeyPair`<sup>Optional</sup> <a name="createKeyPair" id="pwed-cdk.pwed_bastion.IWindowsBastionProps.property.createKeyPair"></a>

```typescript
public readonly createKeyPair: boolean;
```

- *Type:* boolean

---

##### `securityTag`<sup>Optional</sup> <a name="securityTag" id="pwed-cdk.pwed_bastion.IWindowsBastionProps.property.securityTag"></a>

```typescript
public readonly securityTag: Tag;
```

- *Type:* aws-cdk-lib.Tag

---

##### `windowsPackages`<sup>Optional</sup> <a name="windowsPackages" id="pwed-cdk.pwed_bastion.IWindowsBastionProps.property.windowsPackages"></a>

```typescript
public readonly windowsPackages: string[];
```

- *Type:* string[]

---

