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
    <span>광기: {{ computedLunacy }}</span>
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
  data() {
    return {
      ceilingAudio: null as HTMLAudioElement | null,
      prevIdeal: 0, // 이전 ideal 값 저장
    };
  },
  mounted() {
    // 천장 효과음 생성
    this.ceilingAudio = new Audio("/sounds/gacha_ceiling.mp3");
    this.ceilingAudio.volume = 0.2;

    // 초기 값 저장
    this.prevIdeal = this.ideal;
  },
  watch: {
    ideal(newValue, oldValue) {
      // ideal이 200 이상이 되었을 때와 200의 배수일 때 사운드 재생 (0일 때는 제외)
      if (
        newValue !== 0 &&
        ((newValue >= 200 && oldValue < 200) ||
          (newValue % 200 === 0 && newValue !== oldValue))
      ) {
        this.playCeilingSound();
      }
    },
  },
  methods: {
    ...mapMutations(["resetStatsById"]),
    resetStats() {
      this.resetStatsById(this.id);
    },
    playCeilingSound() {
      // 오디오가 준비되었는지 확인
      if (this.ceilingAudio) {
        console.log("천장 효과음 재생 시도");

        // 재생 중이라면 처음으로 되감기
        if (!this.ceilingAudio.paused) {
          this.ceilingAudio.currentTime = 0;
        }

        // 재생 시작 (사용자 상호작용 필요)
        this.ceilingAudio
          .play()
          .then(() => console.log("천장 효과음 재생 성공"))
          .catch((err) => {
            console.error("천장 효과음 재생 오류:", err);
          });
      }
    },
  },
  computed: {
    computedLunacy(): number {
      return this.ideal * 130 * -1;
    },
  },
  // 컴포넌트 파괴 시 메모리 정리
  beforeDestroy() {
    if (this.ceilingAudio) {
      this.ceilingAudio.pause();
      this.ceilingAudio = null;
    }
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
