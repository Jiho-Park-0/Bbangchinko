<template>
  <div class="controls">
    <button @click="$emit('drawSingle')">1회 추출</button>
    <button @click="$emit('drawTen')">10회 추출</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "GachaControls",
});
</script>

<style scoped>
.controls {
  margin-bottom: 20px;
}
button {
  margin-right: 10px;
  padding: 8px 16px;
  font-size: 16px;
}
</style>
