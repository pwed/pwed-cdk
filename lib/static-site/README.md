# static-site

Easily deploy a static site backed by s3 and CloudFront

## Usage

``` typescript
import { pwed_static_site } from "pwed-cdk";
import * as path from "path";

const website = new pwed_static_site.StaticSite(this, "PwedDotMe", {
    domain: "pwed.me",
    path: path.join(__dirname, "static"),
})
```
