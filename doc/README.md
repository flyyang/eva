# eva

```
sudo npm install -g eva --registry=http://npm.pandatv.com
```

## eva 是什么？

简而言之，`eva` 是一个用来辅助开发 `sdk` 的工具。它的出现解决了两个问题:

1. sdk 开发流程化、规范化。
2. 社区最佳实践。

## 为什么不是 `muse` ?

首先，`eva` 和 `muse` 解决的问题不一样。`muse` 的目标是解决多页应用构建的问题，
而 `eva` 将专注于 `sdk` 的成套解决方案。

其次，`muse` 要考虑向后兼容的问题。`eva` 则轻装上阵，没有历史包袱。设计思路比较
激进：

  - 零配置
  - 可扩展
  - 规范化
  - linting
  - 社区最佳实践

## 谁会使用 `eva`?

推荐所有 `sdk` 开发者使用。所有打成单一 `js` 文件、发包到 `npm` 的 场景，理论上
都支持。

## CLI

```
  eva --help

  Usage: eva [options] [command]

  Small and delightful sdk cli, i'am eva

  Options:

    -V, --version                output the version number
    -h, --help                   output usage information

  Commands:

    init                         init a sdk project
    lint                         lint the style and js
    lint:fix                     fix eslint and style lint errors
    watch                        watch changes for development
    deploy                       deploy for production
    upload                       upload dist file and output the cdn url
```
