[![Build Status](https://travis-ci.org/flyyang/eva.svg?branch=master)](https://travis-ci.org/flyyang/eva)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## eva

```js
sudo npm install -g eva-sdk
// 现在可以在命令行使用 eva 了
```

## why eva?

在某些场景下，我们需要写一些 js sdk。

即便是中高级前端工程师，配置一套基于 webpack、babel、postcss等工具的构建脚本也不是那么容易。往往是还没开始写，构建脚本先准备一天。

还有一些工程师会有一些压箱底的历史脚本，拷贝使用，缺点是没有长效的维护升级手段。

eva 的目的就是为了解决这些问题，它抽象了 js sdk 的 开发流程，并集成主流工具的最佳实践。让 sdk 开发变得更加容易。

## 如何使用?

一个标准的开发流程通常有以下三步：

1. eva init 生成一个标准的 sdk 模板

![image](https://user-images.githubusercontent.com/3912408/54226337-93b35780-4538-11e9-9ac1-2cedb7c671b6.png)

2. eva dev 开发调试

![image](https://user-images.githubusercontent.com/3912408/54226250-62d32280-4538-11e9-971f-9478d91244e0.png)
![image](https://user-images.githubusercontent.com/3912408/54226352-9c0b9280-4538-11e9-8368-8ade51aa56c0.png)

dev 条件下会起端口，打开在浏览器控制台可以看到输出到的全局变量。可以用来和 web 交互。

```
默认输出 umd 模式。
```

3. eva prod 生成可发布的文件

最终在 dist 目录下生成压缩后的文件。

eva 使用 eva.config.js 配置其功能，详见[配置文档](./doc/EVA-CONFIG.md)。

## CLI

```js
  eva --help

  Usage: eva [options] [command]

  Small and delightful sdk cli helper, called eva

  Options:

    -V, --version                output the version number
    -h, --help                   output usage information

  Commands:

    init                         init a sdk project
    lint                         lint the style and js
    lint:fix                     fix eslint and style lint errors
    dev                          watch changes for development
    prod                         deploy for production
```
