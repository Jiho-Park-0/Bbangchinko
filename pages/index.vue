<template>
  <div>
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
h1 {
  color: #42b983;
}
</style>
