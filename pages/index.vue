<template>
  <div class="container">
    <h1>{{ message }}</h1>
    <p>{{ reversedMessage }}</p>
    <button @click="updateMessage">Update Message</button>
    <nuxt-link to="/test">test</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      message: "Hello, Nuxt 2 + TypeScript!",
    };
  },
  computed: {
    reversedMessage(): string {
      return this.message.split("").reverse().join("");
    },
  },
  methods: {
    updateMessage(): void {
      this.message = "Updated!";
    },
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
