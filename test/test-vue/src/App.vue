<template lang="pug">
  div(style="sss" class="example") {{ msg }}
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello world!'
    };
  }
};
</script>

<style>
.example {
  color: red;
}
</style>
