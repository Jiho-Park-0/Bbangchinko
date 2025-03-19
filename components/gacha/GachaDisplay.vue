<template>
  <div>
    <div class="extraction">
      <template v-if="items && items.length">
        <div v-for="(item, index) in items" :key="`${item.id}-${index}`">
          <a
            :href="getItemLink(item)"
            class="card"
            :class="getGradeClass(item)"
            target="_blank"
          >
            <nuxt-img
              preset="low_quality"
              class="image"
              :src="item.beforeImage || item.image"
              :alt="'Item ' + item.id"
              loading="lazy"
              format="webp"
              width="200"
              height="120"
            />
          </a>
        </div>
      </template>
      <div v-else-if="isLoading" class="loading-message">
        <div class="spinner"></div>
        <span>광기를 추출 중입니다...</span>
      </div>
      <div v-else class="empty-message">당신의 광기를 녹여보세요.</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { DataItem } from "@/types/index";

export default Vue.extend({
  name: "GachaDisplay",
  props: {
    items: {
      type: Array as () => DataItem[],
      default: () => [],
    },
    drawCount: {
      type: Number,
      default: 0,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getGradeClass(item: DataItem) {
      if (typeof item.grade === "number") {
        if (item.grade === 1) return "grade-1";
        if (item.grade === 2) return "grade-2";
        if (item.grade === 3) return "grade-3";
      } else {
        return "ego";
      }
      return "";
    },
    getItemLink(item: DataItem) {
      return typeof item.grade === "number"
        ? `https://baslimbus.info/identity/${item.id}`
        : `https://baslimbus.info/ego/${item.id}`;
    },
  },
});
</script>

<style src="@/assets/css/gacha.css"></style>

<style>
.loading-message {
  grid-column: 1 / -1;
  text-align: center;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #4a90e2;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
