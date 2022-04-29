<template>
  <div id="app">
    <nav class="nav">
      <router-link
        class="link"
        to="/"
      >Home</router-link>
      <router-link
        class="link"
        to="about"
      >About</router-link>
    </nav>
    <nav>
      <h3
        href=""
        @click="goBack"
      >Click GO Back！</h3>
    </nav>
    <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive"></router-view>
      <!--这里是会被缓存的组件-->
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.nav {
  width: 200px;
  display: flex;
  justify-content: space-around;
  margin: 10px auto;
}

h3 {
  text-decoration: underline;
  color: #1b95f9;
  cursor: pointer;
}
</style>

