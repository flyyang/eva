# linting

eva 使用 eslint [airbnb base](https://github.com/airbnb/javascript) 来规范 js
代码， 使用 [stylelint](https://stylelint.io/) 来规范 css 代码。

在迁移旧代码或者某些场景下，可能需要暂时关掉某些规则。

js:

- 禁止检查整个文件

```
// 在文件顶部
/* eslint-disable */
```

- 禁止检查下一行

```
// eslint-disable-next-line no-use-before-define
```

css(less):

举几个例子：

```

/* stylelint-disable */
a {}
/* stylelint-enable */

```

```
/* stylelint-disable selector-no-id, declaration-no-important  */
#id {
  color: pink !important;
}
/* stylelint-enable */
```

```
#id {
  /* stylelint-disable-next-line declaration-no-important */
    color: pink !important;
}
```

查看更多规则[here](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#turning-rules-off-from-within-your-css)。
