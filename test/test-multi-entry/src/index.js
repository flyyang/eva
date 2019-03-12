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