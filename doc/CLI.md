## eva 命令行介绍

### init

`eva init`。回答几个问题，帮你生成一个 sdk 项目。

```
只在 *nix 系统、或者兼容GNU bash 的系统中（如 vscode 的terminal， git bash 等）工作中可用。
```

### lint && lint:fix

检视linting，修复能修复的错误。

### dev

`eva dev`。开启 watch 模式调试你的 sdk 。默认启动端口 58000，可以在
eva.config.js 中自定义端口。自定义端口低于 1024，需要 sudo 权限。

### prod

`eva prod`。输出生产环境代码。
