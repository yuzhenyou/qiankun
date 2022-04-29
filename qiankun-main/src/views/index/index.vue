<template>
  <div class="home">
    <h3 @click="push('/qiankun-app')">click to qiankun-app ！！！</h3>
  </div>
</template>

<script>
export default {
  methods: {
    push(subapp) {
      history.pushState(null, subapp, subapp);
    },
  },
};
</script>

<style scoped>
h3 {
  text-decoration: underline;
  color: #1b95f9;
  cursor: pointer;
}
</style>