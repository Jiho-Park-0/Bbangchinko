<template>
  <div class="container">
    <div>
      <nuxt-link :to="`/gacha/${page1}`">다이나믹라우팅</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      page1: "불그렉 동섕돈",
    };
  },
});
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  text-align: center;
}

h1 {
  color: #42b983;
}
</style>
