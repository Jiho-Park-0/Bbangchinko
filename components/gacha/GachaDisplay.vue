<template>
  <div v-if="items && items.length">
    <div class="extraction">
      <div v-for="(item, index) in items" :key="index">
        <span class="identityBox">
          <img
            class="Image"
            :src="item.beforeImage || item.image"
            :alt="'Item ' + item.id"
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
});
</script>

<style scoped>
.extraction {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  justify-items: center;
}
.identityBox {
  display: flex;
}
img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
