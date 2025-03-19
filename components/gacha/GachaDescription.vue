<template>
  <div class="description">
    <p>픽업 확률</p>
    <p class="percentage">인격: 1.45% / 픽업수</p>
    <p class="percentage">에고: 0.65% / 픽업수</p>

    <p>
      10회추출은 2성 하나가 확정입니다. 이상[理想]은 1시간마다 초기화됩니다.
    </p>
    <p class="percentage">
      1회 추출 확률: EGO 1.3% / 3성 2.9% / 2성 12.8% / 1성 83%
    </p>
    <p class="percentage">
      10회 추출 10번째 확률: EGO 1.3% / 3성 2.9% / 2성 95.8%
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "GachaDescription",
});
</script>

<style>
.description {
  margin: 20px 0;
}
</style>
