<template>
  <my-component :people="name"></my-component>
</template>

<script>
import MyComponent from "./my-component.vue";
export default {
  data() {
    return {
      name: "flyyang"
    };
  },
  components: {
    MyComponent
  }
};
</script>
