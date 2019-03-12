# eva

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
2. eva dev 开发调试
3. eva prod 生成可发布的文件

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
