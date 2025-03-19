<template>
  <div class="pickup-stats">
    <h3>픽업 획득 통계</h3>

    <div class="pickup-grid">
      <div class="pickup-item">
        <span class="pickup-label">인격 픽업 획득:</span>
        <span class="pickup-count">{{ identityCount }}회</span>
      </div>
      <div class="pickup-item">
        <span class="pickup-label">EGO 픽업 획득:</span>
        <span class="pickup-count">{{ egoCount }}회</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  name: "PickupStats",
  props: {
    id: {
      type: String,
      required: true,
    },
    identityCount: {
      type: Number,
      default: 0,
    },
    egoCount: {
      type: Number,
      default: 0,
    },
  },
});
</script>
