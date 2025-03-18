<template>
  <div v-if="items && items.length">
    <div class="extraction">
      <div v-for="(item, index) in items" :key="index">
        <span class="card" :class="getGradeClass(item)">
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
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { DataItem } from "@/pages/gacha/index.vue";

export default Vue.extend({
  name: "GachaDisplay",
  props: {
    items: {
      type: Array as () => DataItem[],
      default: () => [],
    },
  },
  methods: {
    getGradeClass(item: DataItem) {
      // grade가 number인지 확인 후, 1,2,3에 따라 클래스 부여
      if (typeof item.grade === "number") {
        if (item.grade === 1) return "grade-1";
        if (item.grade === 2) return "grade-2";
        if (item.grade === 3) return "grade-3";
      } else {
        return "ego";
      }
      return "";
    },
  },
});
</script>

<style src="@/assets/css/gacha.css"></style>
