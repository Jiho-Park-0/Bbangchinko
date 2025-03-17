<template>
  <div v-if="items && items.length">
    <div class="extraction">
      <div v-for="(item, index) in items" :key="index">
        <!-- grade 값에 따라 동적 클래스 부여 -->
        <span class="card" :class="getGradeClass(item)">
          <nuxt-img
            preset="low_quality"
            class="Image"
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
      }
      return "";
    },
  },
});
</script>

<style scoped>
.Image {
  transition: opacity 0.3s ease;
}
.Image[data-loaded="false"] {
  opacity: 0;
}
.Image[data-loaded="true"] {
  opacity: 1;
}
.extraction {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  justify-items: center;
}

.card {
  display: flex;
}

/* grade=1: 갈색 테두리 */
.grade-1 {
  border: 4px solid #8b4513; /* 갈색 */
  box-shadow: 0 0 5px #8b4513;
}

/* grade=2: 적색 테두리 */
.grade-2 {
  border: 4px solid #ff0000; /* 적색 */
  box-shadow: 0 0 5px #ff0000;
}

/* grade=3: 황금색 테두리 */
.grade-3 {
  border: 4px solid #ffd700; /* 황금색 */
  box-shadow: 0 0 5px #ffd700;
}

img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}
</style>
