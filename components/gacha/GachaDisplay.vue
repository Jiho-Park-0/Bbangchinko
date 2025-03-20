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
            <template v-if="item.beforeImage || item.image">
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
            </template>
            <div v-else class="image-placeholder">
              <span>이미지 준비중</span>
            </div>
          </a>
        </div>
      </template>
      <div v-else-if="isLoading" class="loading-message">
        <div class="spinner"></div>
        <span>광기를 추출 중입니다...</span>
      </div>
      <div v-else class="empty-message">광기가 사르륵</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { DataItem } from "@/types/index";
import { mapMutations } from "vuex"; // mapMutations 추가

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
    isLoading: {
      type: Boolean,
      default: false,
    },
    id: {
      // id prop 추가
      type: String,
      required: true,
    },
  },
  data() {
    return {
      normalAudio: null as HTMLAudioElement | null,
      rareAudio: null as HTMLAudioElement | null,
      prevItemsLength: 0, // 이전 아이템 길이 추적
    };
  },
  mounted() {
    // 일반 아이템 효과음 생성
    this.normalAudio = new Audio("/sounds/gacha_dialogueOn.mp3");
    this.normalAudio.volume = 0.5;

    // 레어 아이템 효과음 생성
    this.rareAudio = new Audio("/sounds/gacha_nameTitleOn.mp3");
    this.rareAudio.volume = 0.5;
  },
  watch: {
    items: {
      handler(newItems) {
        // 새 카드가 추가되었을 때만 사운드 재생
        if (newItems.length > this.prevItemsLength) {
          // 마지막으로 추가된 아이템 가져오기
          const lastItem = newItems[newItems.length - 1];

          // 아이템 등급에 따라 효과음 선택
          const isRare =
            (typeof lastItem.grade === "number" && lastItem.grade === 3) ||
            typeof lastItem.grade !== "number"; // EGO인 경우

          this.playSound(isRare);

          // 고급 아이템이면 저장 (신규 추가)
          if (isRare) {
            this.addRareItem({ id: this.id, item: lastItem });
          }
        }
        this.prevItemsLength = newItems.length;
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations(["addRareItem"]), // 뮤테이션 추가
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
    // 사운드 재생 메서드 - 등급에 따라 다른 효과음 재생
    playSound(isRare: boolean) {
      // 사용할 오디오 객체 결정
      const audioToPlay = isRare ? this.rareAudio : this.normalAudio;

      // 오디오가 준비되었고 재생 가능한 상태인지 확인
      if (audioToPlay && audioToPlay.readyState >= 2) {
        // 재생 중이라면 처음으로 되감기
        if (!audioToPlay.paused) {
          audioToPlay.currentTime = 0;
        } else {
          // 아니라면 재생 시작
          audioToPlay.play().catch((err) => {
            console.error("오디오 재생 오류:", err);
          });
        }
      }
    },
  },
  // 컴포넌트 파괴 시 메모리 정리
  beforeDestroy() {
    if (this.normalAudio) {
      this.normalAudio.pause();
      this.normalAudio = null;
    }
    if (this.rareAudio) {
      this.rareAudio.pause();
      this.rareAudio = null;
    }
  },
});
</script>

<style src="@/assets/css/gacha.css"></style>

<style>
.loading-message {
  grid-column: 1 / -1;
  text-align: center;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #4a90e2;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-message {
  grid-column: 1 / -1;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #666;
}

.image-placeholder {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #666;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
}
</style>
