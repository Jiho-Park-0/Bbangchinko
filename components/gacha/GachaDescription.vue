<template>
  <div class="description">
    <h3>픽업 확률</h3>
    <p class="percentage">인격: 1.45% / 픽업수</p>
    <p class="percentage">에고: 0.65% / 픽업수</p>

    <p>
      10회 추출은 2성이 하나 확정입니다. 사용한 이상[理想], 광기, 인격 획득은
      1시간마다 초기화됩니다.
    </p>
    <p class="percentage">
      1회 추출 확률: EGO 1.3% / 3성 2.9% / 2성 12.8% / 1성 83%
    </p>
    <p class="percentage">
      10회 추출 10번째 확률: EGO 1.3% / 3성 2.9% / 2성 95.8%
    </p>
    <p class="bold">
      림버스 컴퍼니와 다르게 EGO가 중복으로 나올 수 있으며, 아나운서는 포함되지
      않았습니다.
    </p>
    <p>픽업 외 정보는 림버스 컴퍼니에 편성된 정보와 동일하게 포함했습니다.</p>
    <p>
      예상치 못한 데이터가 나왔을 경우, 문의 메일로 연락해 주시면
      감사하겠습니다.
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

.bold {
  font-weight: bold;
}
</style>
