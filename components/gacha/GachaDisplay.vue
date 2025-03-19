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
      <div v-else class="empty-message">당신의 광기를 녹여보세요.</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { DataItem } from "@/pages/gacha/_id.vue";

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
