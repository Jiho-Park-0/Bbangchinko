<template>
  <div class="Ideal-controls">
    <button @click="resetStats">초기화</button>
    <img :src="require('~/assets/images/Ideal.webp')" alt="이상" class="icon" />
    <span>이상[理想]: {{ ideal }}</span>
    <img
      :src="require('~/assets/images/Lunacy.webp')"
      alt="광기"
      class="icon"
    />
    <span>소모된 광기: {{ computedLunacy }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  name: "IdealControl",
  props: {
    id: {
      type: String,
      required: true,
    },
    ideal: {
      type: Number,
      default: 0,
    },
    lunacy: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    ...mapMutations(["resetStatsById"]),
    resetStats() {
      this.resetStatsById(this.id);
    },
  },
  computed: {
    computedLunacy(): number {
      return this.ideal * 130 * -1;
    },
  },
});
</script>

<style scoped>
.icon {
  height: 24px; /* 높이만 지정하여 비율 유지 */
  width: auto; /* 원본 비율 유지 */
  image-rendering: -webkit-optimize-contrast; /* Safari/Chrome 최적화 */
  image-rendering: crisp-edges; /* Firefox 최적화 */
  -ms-interpolation-mode: nearest-neighbor; /* IE 최적화 */
  vertical-align: middle;
}
</style>
