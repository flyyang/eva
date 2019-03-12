# package.json 维护

先检查下项目根目录有没有 package.json。若没有，通过 `npm init` 生成一个 package.json。


package.json 有几个字段需要特别关注：

- main

入口文件。通常为编译的结果地址 `./dist/your_proj_name.min.js`。

import 默认会从这个地址取。

- repository

仓库地址。在使用 npm 版本化时使用。


- module

新提案。用于 treeshaking 。让打包工具从你的 module 配置取源码。module 可以指向源码, 但后续仍需要编译配合。

- sideEffects

webpack [标准](https://github.com/webpack/webpack/tree/master/examples/side-effects)。用于 [tree shaking](./TSK.md)。
