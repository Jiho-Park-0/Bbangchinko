<template>
  <div class="controls">
    <button @click="$emit('drawSingle')">1회 추출</button>
    <button @click="$emit('drawTen')">10회 추출</button>
    <button @click="resetDrawCount()">초기화</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  name: "GachaControls",
  methods: {
    ...mapMutations(["resetDrawCount"]),
  },
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
