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