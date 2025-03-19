<template>
  <div class="Ideal-controls">
    <button @click="resetStats">초기화</button>
    <span>이상[理想]: {{ ideal }}</span>
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
  },
  methods: {
    ...mapMutations(["resetStatsById"]),
    resetStats() {
      this.resetStatsById(this.id);
    },
  },
});
</script>
