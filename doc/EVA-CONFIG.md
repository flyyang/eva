## eva config

eva 使用 eva.config.js 作为配置文件来扩展 eva 的功能, 不选用 .rc 是因为 .js 比
.rc 有更好的扩展性。eva.config.js 需位于项目根目录。

eva.config.js 通常如下形式：

```
// eva.config.js
module.exports = {
  name: 'my-sdk',
  port: 58001,
  globalVar: 'mySdk',
}

```

### name

项目名。可选。默认会读 package.json 的 name。

### port

自定义端口号。默认58000。可选配置。

### globalVar

暴露到 windows 中的全局变量。

### noGlobal

默认 false，设置为 true 表示不需要输出全局变量，只执行 iife。

### polyfill

production生效。通常不需要。只有代码中有 import() 语法，并且编译目标目标包括 ie 系列时, 设为 true。

### miniOnly

默认 true，production 模式下只输出 .min.js。按需开启。

### debug

开启调试模式, 默认 fasle 。只在 proudction模式生效。

### debugPort

默认 58001。按需配置。

### treeShakingModules

消费支持 tree shaking 的 eva library。

### esm

默认 false。true 标识输出纯 esm 模块。

```
esm 输出内部由 rollup 实现，目前只支持纯 js sdk 输出。
```

### linting

是否开启 linting。默认开启 css 和 js linting。设置为 false 可以禁止 linting 检
测。不推荐。

### vue

是否开启 vue 编译， 默认 false。

### eslint , styleint

默认内置了按团队风格调整过的业界标准 airbnb, 以及 stylelint 规范。如果仍然无法
满足你的需求，可以扩展、覆盖内部规则。

```
// eva.config.js

module.exports = {
  name: 'your-lovely-sdk',
  eslint: {
    globals: {
      'ABC', // 添加一个全局变量
    },
    rules: {
      'no-alert': 0, // 允许 alert, 不推荐，仅供示例
      'semi': 'never', // 全部采用无分号编写
    }
  },
  stylelint: {
    // 自定义stylint 规则
    rules: {
      'declaration-block-no-shorthand-property-overrides': null,
    },
  },
}

````

linting 是代码规范的基础，不推荐过度调整。默认已经是基本的最佳实践。

# extractCss

是否提取 css 到单文件，默认 false。


# cleanAfterEmit

是否删除最终生成的 `chunk`等文件。