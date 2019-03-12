# 如何版本化你的 sdk

推荐用 package.json 来版本化你的 sdk。

### 源码中的 version

通常在 src/index.js 中:

```
import { version } from '../package.json';

// 最后

export default {
 version,
}
```

在浏览器中可以通过暴露的全局变量，如 'xm.verison' 打出线上的版本号。

### package.json 中的 version

推荐用语义化来管理 version。版本号一般有三位：

```
0.0.0
```
通过 npm version patch 改变最后一位，minor、major改变中间和最高位。

所以最终的工作流是什么呢？

- 修改你的代码，deploy，然后做 commit。
- commit 完成后，本地 git 仓库没有多余文件，此时按需 npm 打 verison。
- 最后运行 eva upload 上传代码。
