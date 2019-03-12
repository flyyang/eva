# 使用 vuejs 开发 sdk

在某些复杂的业务向开发过程中，旧的开发手段（即便是通过 eva 构建的项目）仍然有一些
难以处理的问题。

比如， hablders 并不是那么好用，要手动注册自定义的 helpers；jQuery 时代的状态
管理在复杂情况下一团糟，更不要说双向绑定这种黑科技，简而言之，有点过时了；还有
一个我们现在仍然没有解决的问题， scoped css，vue 在 2 年前就搞定了。

所以，你的项目足够复杂吗？可以尝试用 vue 解决你的问题。

首先在 eva.config.js 中 设置 vue: true,

然后安装必要的依赖：

```
npm install vue && npm install vue-template-compiler
```

项目整体结构如下：

```
 ~test-vue/
  |~src/
  | |-App.vue
  | `-index.js
  |-eva.config.js
  |-index.html
  |-package-lock.json
  |-package.json
```

```
// src/index.js
import Vue from 'vue';
import App from './App.vue';

new Vue({
  el: '#app',
  render: h => h(App),
});
```

然后再 App.vue 里开心的写你的代码了。

完整示例在[这里](https://git.pandatv.com/fe/eva/tree/master/test/test-vue)。
