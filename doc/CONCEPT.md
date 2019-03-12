# 设计理念

### 零配置

内置了常用的编译配置,不需要在每个项目安装配置了。比如 babel 的配置， post-css
配置。初始完项目就可以开心的写代码。

### 可扩展

可以通过 `eva.config.js` 扩展 eva 的功能，参考[eva.config.js 介绍](EVA-CONFIG.md)。

### 规范化

规范化，一个是目录的规范化，一个 sdk 项目标准目录如下：

```
├── dist // 输出目录
├── eva.config.js // 可选
├── index.html // 调试用 html
├── package.json
├── package-lock.json // or npm-shrinkwrap.json
├── README.md // doc
└── src // your lovely code

```

只有 src 下的代码会被引用、编译。dist 为最终的输出目录。

另外一个是编码的规范化，推荐用 es module 写模块。

### linting

eva 内置了 css 和 js 的 linting。代码报错会直接打到调试页面。方便调试。
