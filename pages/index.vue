<template>
  <div class="container">
    <div>
      <nuxt-link :to="`/gacha/${1}`">다이나믹라우팅1</nuxt-link>
      <nuxt-link :to="`/gacha/${2}`">다이나믹라우팅2</nuxt-link>
      <nuxt-link :to="`/gacha/${3}`">다이나믹라우팅3</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      page1: 1,
    };
  },
});
</script>

<style scoped>
html,
body {
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
}

h1 {
  color: #42b983;
}
</style>
