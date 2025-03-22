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
            <div class="card-content">
              <div class="item-info">
                <div class="item-name">
                  {{ item.name || `Item ${item.id}` }}
                </div>
                <div v-if="item.character" class="item-character">
                  {{ item.character }}
                </div>
              </div>
              <div class="grade-badge">
                <img
                  v-if="typeof item.grade === 'number'"
                  :src="require(`@/assets/images/${item.grade}.webp`)"
                  :alt="`등급 ${item.grade}`"
                />
                <img
                  v-else-if="typeof item.grade === 'string'"
                  :src="require(`@/assets/images/${item.grade}.webp`)"
                  :alt="`${item.grade}`"
                />
              </div>
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
import { mapMutations } from "vuex";

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
      type: String,
      required: true,
    },
  },
  data() {
    return {
      normalAudio: null as HTMLAudioElement | null,
      rareAudio: null as HTMLAudioElement | null,
      prevItemsLength: 0,
    };
  },
  mounted() {
    this.normalAudio = new Audio("/sounds/gacha_dialogueOn.mp3");
    this.normalAudio.volume = 0.5;

    this.rareAudio = new Audio("/sounds/gacha_nameTitleOn.mp3");
    this.rareAudio.volume = 0.5;
  },
  watch: {
    items: {
      handler(newItems) {
        if (newItems.length > this.prevItemsLength) {
          const lastItem = newItems[newItems.length - 1];
          const isRare =
            (typeof lastItem.grade === "number" && lastItem.grade === 3) ||
            typeof lastItem.grade !== "number";

          this.playSound(isRare);

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
    ...mapMutations(["addRareItem"]),
    getGradeClass(item: DataItem) {
      if (typeof item.grade === "number") {
        if (item.grade === 1) return "grade-1";
        if (item.grade === 2) return "grade-2";
        if (item.grade === 3) return "grade-3";
      } else if (typeof item.grade === "string") {
        // 모든 EGO는 등급과 상관없이 'ego' 클래스만 사용
        return "ego";
      }
      return "";
    },
    getItemLink(item: DataItem) {
      return typeof item.grade === "number"
        ? `https://baslimbus.info/identity/${item.id}`
        : `https://baslimbus.info/ego/${item.id}`;
    },
    playSound(isRare: boolean) {
      const audioToPlay = isRare ? this.rareAudio : this.normalAudio;

      if (audioToPlay && audioToPlay.readyState >= 2) {
        if (!audioToPlay.paused) {
          audioToPlay.currentTime = 0;
        } else {
          audioToPlay.play().catch((err) => {
            console.error("오디오 재생 오류:", err);
          });
        }
      }
    },
  },
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
