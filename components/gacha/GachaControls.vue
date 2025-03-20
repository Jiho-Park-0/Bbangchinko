<template>
  <div class="controls">
    <button
      @click="$emit('drawSingle')"
      :disabled="isDrawing"
      :class="{ 'button-disabled': isDrawing }"
    >
      {{ isDrawing ? "추출 중..." : "1회 추출"
      }}<span v-if="!isDrawing"
        ><img
          :src="require('~/assets/images/Lunacy.webp')"
          alt="광기"
          class="icon"
        />
        130</span
      >
    </button>
    <button
      @click="$emit('drawTen')"
      :disabled="isDrawing"
      :class="{ 'button-disabled': isDrawing }"
    >
      {{ isDrawing ? "추출 중..." : "10회 추출" }}
      <span v-if="!isDrawing"
        ><img
          :src="require('~/assets/images/Lunacy.webp')"
          alt="광기"
          class="icon"
        />
        1300</span
      >
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

.icon {
  height: 24px; /* 높이만 지정하여 비율 유지 */
  width: auto; /* 원본 비율 유지 */
  image-rendering: -webkit-optimize-contrast; /* Safari/Chrome 최적화 */
  image-rendering: crisp-edges; /* Firefox 최적화 */
  -ms-interpolation-mode: nearest-neighbor; /* IE 최적화 */
  vertical-align: middle;
}
</style>
