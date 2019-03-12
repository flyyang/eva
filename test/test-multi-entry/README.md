# eva 编译多入口

本例为构建多入口示例。我们的目的是将一个 Vue 组件 `my-component` 提供给第三方使用。

有两个入口：

* `index.js` 。构建出一个 umd 版本 sdk , 可以发 CDN 。
* `index.vue.js`。构建出一个 Vue 组件。以插件的形式暴露。

```
index.js是一个特殊的入口整个调试过程依赖此入口。
```

我们先来看看 `my-component` 的内容：

```js
<template>
  <div>{{people}}{{message}}</div>
</template>
<style>
</style>
<script>
export default {
  props: ["people"],
  data() {
    return {
      message: " say hello to Vue!"
    };
  }
};
</script>
```

`my-component` 组件很简单，接受一个参数 people。我们先来看看 umd 版本的入口 `index.js`:

```js
import Vue from 'vue'; // 默认加载 esm.runtime
import App from './App.vue';

const ID = 'vue-component-test';

const createHookPoint = () => {
  const div = document.createElement('div');
  div.id = ID;
  document.body.append(div);
};

createHookPoint();

// eslint-disable-next-line
new Vue({
  el: `#${ID}`,
  render: h => h(App), //REMEMBER: use render function avoid compile online
});
```

有几点需要注意：

1. Vue 默认加载 esm.runtime。性能最好。但是没有 compiler。所以 需要一个 render function 和一个 外层 vue wrapper，`App.vue`。
2. 示例中自定义了一个挂载点，不需要业务支持。
3. 如果页面中有全局的 `Vue`, 我们甚至可以搞一另外一个入口，提供一个不带 Vue 版本的入口, 如 `index.no-vue.js`。仅仅需要将上面的 `import Vue from 'Vue'` 删除，并在调试页面加上 Vue 的 cdn 即可。


Vue 插件形式暴露相对更简单一些：

```js
import component from './my-component.vue';

function install(Vue) {
  Vue.component('my-component', component);
}

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To allow use as module (npm/webpack/etc.) export component
export default plugin;
```

只需按插件的模式提供一个 install 方法即可。业务中 Vue.use(pluginName) 即可。

以上仅为示例，理论上你可以通过不同入口输出任何脚本。
