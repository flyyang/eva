# es module 语法概览

es module（简称 esm） 是 js 语言首次内置的模块语法。一个 esm 是一个文件。esm 有以下几个特点。

* esm 默认走严格模式，在模块的全局中引用 this 得到 undefined 而不是 global(window)。
* esm 模块支持静态分析。静态分析是tree shaking 的基础。另外 import 须写在顶部（非顶部会提升（hoist）），不能写在类似于条件语句（运行时才知道）中。
* 导入导出是 live binding。方便做循环引用检测。

esm 的静态分析是 treeshaking 的基础。eva 推荐(强制)使用 esm 来构建你的 library。

## 模块语法

### named exports

```
//------ lib.js ------
// 导出一个变量
export const sqrt = Math.sqrt;

// 导出一个函数
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}

//------ main.js ------
// 解构引用
import { square, diag } from 'lib';
// 利用 as 声明别名
import { square as sq, diag } from 'lib';
// 导出所有到一个变量
import * as lib from 'lib';

```

### default exports


```
// 导出函数
export default function foo() {}
// 导出匿名函数
export default function () {}
// 导出 class
export default class Bar {}
// 导出匿名 class
// export default class {}

// import 导入

import foo from './foo.js'
```

default 导出不支持导出变量名。

1. 无意义
2. 某些条件无法判定默认导出哪一个。干脆不支持。

举例：
```
// 语法错误，无法判定哪个默认导出
export default const a, b, c;
// 若 a 的值 为1,直接默认导出即可
export default 1;
```
```
不推荐混合两种导出模式。
```

## 补充

### empty import
```
// 执行模块内的代码，但不导出任何内容。
// 下面是以打包工具导入 less 文件的例子, 注意不要用 import('index.less')
import 'index.less'
```
###  dynamic import

esm 的静态分析特性导致我们不能按照运行时加载文件。但是这种需求有时又是必须的。
所以有了[新的提案](https://github.com/tc39/proposal-dynamic-import)引入了dynamic import。

dynamic import 语法形式为 import('xxx.js')。返回值为 Promise。

```
if (cod === true) {
  // dynamic import 导出返回一个 promise, then 回调接受模块本身。
  import('./foo.js').then(foo => {
   // use foo do your work
  })
}
```
dynamic import 是 wepback 代码拆分的基础。
