# Tree shaking

Tree Shaking 分为三个部分：

1. 在源码中如何使用 treeshaking
2. 引入第三方库如何 treeshaking
3. eva 编译的库如何 treeshaking

在开始 treeshaking 之前，我们要了解：

只有 [esm](./ESM.md) 模块才有 treeshaking 的功能。

## 源码中如何使用 treeshaking

### json tree shaking

```
import { version } from '../package.json';

export default {
  version,
}
```

### 源码中的用法

假设有两个文件 index.js， 和 math.js。

```
// index.js

import { version } from '../package.json';
import { cube } from './math';


export default {
  cube,
  version,
}

```

```
// math.js

export function cube() {
  console.log('cube');
}

export function square() {
  console.log('square');
}
```

运行 eva deploy。默认生成两个文件。假设叫 test.js 和 test.min.js。
其中 test.min.js 会被 treeshaking。

原因在于 webpack 本身不做代码的移除工作，而是由 UglifyjsPlugin 代劳。从性能上来
考虑的化，不应将 test.js 作为生产环境代码。。.

## 第三方库的 treeshaking

使用第三方库需要优先找支持 treeshaking 的版本。以 loadash 为例，你需要的是
loadash-es。

假设我们需要其中一个 zip 方法。可以这么做：

```
import { zip } from 'lodash-es';

export default {
  zip,
}
```

打包压缩后的大小为 4.17 KB。


对比另外一种引入方法：


```
import * as _ from 'lodash-es';

export default {
  _,
};
```

打包体积98.4 KiB。这种按需打包的思路也适合 ui 库。

## 用 eva 构建的 library 如何 tree shaking

eva 默认构建出来的包是 umd 格式，理论上与 treeshaking 无缘。

但是 wepback 支持通过 `module` 字段加载 es6 源码。

```
// tree-shaking-module

export function a() { console.log('a') }
export function b() { console.log('b') }
```

我们要加载的 module 是需要编译的，可以在使用 module-treeshaking 的模块中配置
`treeShasKingModules:['tree-shaking-module']`。

这样我们的 eva 项目就可以编译支持 tree shaking 的 eva libarary 了。

通常我们在讨论 tree shaking 的时候，除了 module 字段外，还会会涉及到
sideEffects。

那 package.json 中的 `sideEffects` 又是什么意思呢？

其实是内部实现了一个 module 查找机制，将:

```
// 源码
import { a, b } from "big-module-with-flag"

// 转换为

import { a } from "big-module-with-flag/a"; import { b } from "big-module-with-flag/b"
```

大的模块由多个小的模块组成，各个小的模块是独立的结果。通过运行时转换，找到具体的文件。

总结一下，如果你想让你的 library 可以 tree shaking，除了在代码设计上考量外，可以
通过 module 字段公开 es6 源码。在某些场景下也可以通过 sideEffects 帮你转换。

而使用者只需要在 eva.config.js 配置 treeShakingModules 即可。
