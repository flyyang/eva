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