<template>
  <div class="controls">
    <button
      @click="$emit('drawSingle')"
      :disabled="isDrawing"
      :class="{ 'button-disabled': isDrawing }"
    >
      {{ isDrawing ? "추출 중..." : "1회 추출" }}
    </button>
    <button
      @click="$emit('drawTen')"
      :disabled="isDrawing"
      :class="{ 'button-disabled': isDrawing }"
    >
      {{ isDrawing ? "추출 중..." : "10회 추출" }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "GachaControls",
  props: {
    isDrawing: {
      type: Boolean,
      default: false,
    },
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
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #357abd;
}

.button-disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.button-disabled:hover {
  background-color: #cccccc;
}
</style>
