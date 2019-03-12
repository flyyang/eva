# polyfill

eva 编译项目通常无需手动引入 polyfill。

如果你需要做代码拆分，即代码中有 import(xxx) 语法时，需要在 eva.config.js 中配置 polyfill 为 true。

另外如果是用到类似 window.fetch 非 js 语法功能，需要手动引入对应的 polyfill。

就是这么简单。

## 参考

- [webpack issue](https://github.com/webpack/webpack/issues/3531)。
- [babel-plugin-transform-runtime](https://babeljs.io/docs/en/next/babel-plugin-transform-runtime.html)。
