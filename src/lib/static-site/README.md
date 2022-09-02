# static-site

Easily deploy a static site backed by s3 and CloudFront

## Usage

```typescript
import { pwed_static_site } from 'pwed-cdk';
import * as path from 'path';

const website = new pwed_static_site.StaticSite(this, 'PwedDotMe', {
  domain: 'pwed.me',                     // Required
  path: path.join(__dirname, 'static'),  // Required - path to static files
  alternativeDomains: ['blog.pwed.me'],  // Optional - Other names
  hostedZone: zone,                      // Optional - will lookup using the domain if not provided
  enablePrettyPaths: true,               // Optional - will look for index.html in urls ending with a '/' or with no file type
});
```
