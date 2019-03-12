## eva 命令行介绍

### init

`eva init`。回答几个问题，帮你生成一个 sdk 项目。

```
只在 *nix 系统中可用。
```


### lint && lint:fix

检视linting，修复能修复的错误。

### watch

`eva watch`。开启 watch 模式调试你的 sdk 。默认启动端口 58000，可以在
eva.config.js 中自定义端口。自定义端口低于 1024，需要 sudo 权限。

### deploy

`eva deploy`。输出生产环境代码。

### upload。

`eva upload`。将生产环境代码上传至 cdn。
