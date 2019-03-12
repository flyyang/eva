# 1.1.0 2019/2/27

支持多入口编译。入口 满足 glob pattern : `index?(.)*.js`。

# 1.0.5 2019/2/26

修复 modules[moduleId] undefined 问题. [webpack #issue 5429](https://github.com/webpack/webpack/issues/5429).

# 1.0.3 2018/1/8

修改 host，从 0.0.0.0 到  localhost

# 1.0.2 2018/12/27

支持编译 node_modules。增加是否删除 chunk 开关 - cleanAfterEmit。

# 1.0  2018/12

两个月没变化, 升级稳定版 1.0。

# 0.5.6 2018/10/8

* 通过 extractCss: true, 支持 css 提取。

# 0.5.2 2018/9/21

* 支持 eva lint 命令，快速查看 linting 问题
* 修复 windows lint:fix 错误
* 支持 deploy 时 auto fix style linting。

# 0.5.1 2018/9/20

* eva lint:fix 支持 vue component。

# 0.5.0 2018/9/20

* 支持 vuejs

# 0.4.12 2018/9/10

* 修复扩展linting问题。

# 0.4.11 2018/9/7

* deploy 时 自动 fix js 错误。

# 0.4.10 2018/9/7

* 解决 babel 7 混合模块开发的问题。

# 0.4.9 2018/9/7

* 支持 linting option，可以禁用 linting 了。
* 同时，deploy 也集成了 linting 功能。

# 0.4.6 2018/9/5

* 完善 pollyfill。

# 0.4.3

* 增加 noGlobal 选项。设置为 true 表示不需要输出全局变量，只执行 iife。

# 0.4.2 2018/9/4

* 增加插件执行时间测量工具。方便观察构建瓶颈。debug: true 时生效。
* 调整部分 linting 规则，支持从 eva.config.js 扩展linting。如：

```
// eva.config.js

module.exports = {
  name: 'your-lovely-sdk',
  eslint: {
    globals: {
      'ABC', // 添加一个全局变量
    },
    rules: {
      'no-alert': 0, // 允许 alert, 不不不不推荐，仅供示例
      'semi': 'never', // 全部采用无分号编写
    }
  },
  stylelint: {
    // 自定义stylint 规则
  },
}

````

linting 是代码规范的基础，不推荐过度调整规则。默认已经是基本的最佳实践。

# 0.4.1 2018/8/31

* 利用 rollup 支持输出 esm 模块。
