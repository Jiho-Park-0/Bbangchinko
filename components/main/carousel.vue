<template>
  <div class="carousel">
    <div class="carousel-container">
      <div class="carousel-slide" :style="slideStyle">
        <!-- 첫 번째 슬라이드 앞에 마지막 슬라이드 복제 -->
        <div class="carousel-item" v-if="items.length > 0">
          <!-- 이미지 유무 체크 추가 -->
          <template
            v-if="
              items[items.length - 1].beforeImage ||
              items[items.length - 1].image
            "
          >
            <nuxt-img
              preset="low_quality"
              class="carousel-image"
              :src="
                items[items.length - 1].beforeImage ||
                items[items.length - 1].image
              "
              :alt="items[items.length - 1].name || '이미지'"
              loading="lazy"
              format="webp"
              width="600"
              height="300"
            />
          </template>
          <div v-else class="image-placeholder">
            <span>이미지 준비중</span>
          </div>
          <div class="carousel-caption">
            <h3>{{ items[items.length - 1].name }}</h3>
            <p v-if="items[items.length - 1].character">
              {{ items[items.length - 1].character }}
            </p>
          </div>
        </div>

        <!-- 실제 슬라이드들 -->
        <div v-for="(item, index) in items" :key="index" class="carousel-item">
          <template v-if="item.beforeImage || item.image">
            <nuxt-img
              preset="low_quality"
              class="carousel-image"
              :src="item.beforeImage || item.image"
              :alt="item.name"
              loading="lazy"
              format="webp"
              width="600"
              height="300"
            />
          </template>
          <div v-else class="image-placeholder">
            <span>이미지 준비중</span>
          </div>
          <div class="carousel-caption">
            <h3>{{ item.name }}</h3>
            <p v-if="item.character">{{ item.character }}</p>
          </div>
        </div>

        <!-- 마지막 슬라이드 뒤에 첫 번째 슬라이드 복제 -->
        <div class="carousel-item" v-if="items.length > 0">
          <!-- 이미지 유무 체크 추가 -->
          <template v-if="items[0].beforeImage || items[0].image">
            <nuxt-img
              preset="low_quality"
              class="carousel-image"
              :src="items[0].beforeImage || items[0].image"
              :alt="items[0].name || '이미지'"
              loading="lazy"
              format="webp"
              width="600"
              height="300"
            />
          </template>
          <div v-else class="image-placeholder">
            <span>이미지 준비중</span>
          </div>
          <div class="carousel-caption">
            <h3>{{ items[0].name }}</h3>
            <p v-if="items[0].character">{{ items[0].character }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { DataItem } from "@/types/index";

export default Vue.extend({
  name: "Carousel",
  props: {
    items: {
      type: Array as PropType<DataItem[]>,
      required: true,
    },
    speed: {
      type: Number,
      default: 30, // 낮을수록 더 빠름
    },
  },
  data() {
    return {
      currentIndex: 0,
      slidePosition: 0,
      animationId: null as number | null,
      isPaused: false,
      lastTimestamp: 0,
    };
  },
  computed: {
    slideStyle() {
      return {
        transform: `translateX(${-this.slidePosition}%)`,
      };
    },
    totalSlides() {
      return this.items.length;
    },
  },
  methods: {
    animate(timestamp: number) {
      if (!this.lastTimestamp) this.lastTimestamp = timestamp;
      const elapsed = timestamp - this.lastTimestamp;

      // 일시 정지 상태가 아니면 슬라이드를 이동시킴
      if (!this.isPaused) {
        // 움직임 속도 조절 (낮을수록 빠름)
        const increment = elapsed / (this.speed * 2);
        this.slidePosition += increment;

        // 모든 슬라이드를 지나면 처음으로 순간 이동 (무한 루프)
        if (this.slidePosition >= (this.totalSlides + 1) * 100) {
          this.slidePosition = 0;
        }
      }

      this.lastTimestamp = timestamp;
      this.animationId = requestAnimationFrame(this.animate);
    },
    startAnimation() {
      if (!this.animationId) {
        this.lastTimestamp = 0;
        this.animationId = requestAnimationFrame(this.animate);
      }
    },
    stopAnimation() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    },
    pauseAnimation() {
      this.isPaused = true;
    },
    resumeAnimation() {
      this.isPaused = false;
      this.lastTimestamp = 0; // 타임스탬프 리셋
    },
  },
  mounted() {
    // 아이템이 있을 경우에만 애니메이션 시작
    if (this.items.length > 0) {
      this.startAnimation();
    }
  },
  beforeDestroy() {
    this.stopAnimation();
  },
  watch: {
    items() {
      this.slidePosition = 0;
      this.stopAnimation();
      this.startAnimation();
    },
  },
});
</script>

<style scoped>
.carousel {
  width: 100%;
  max-width: 600px;
  min-width: 400px;
  height: 300px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.carousel-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.carousel-slide {
  display: flex;
  width: 100%;
  height: 100%;
  transition: none; /* 애니메이션이 requestAnimationFrame으로 처리되므로 transition 제거 */
}

.carousel-item {
  min-width: 100%;
  height: 100%;
  position: relative;
  flex-shrink: 0;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9) contrast(0.95);
}

/* 캡션 스타일 - 중앙 하단 배치 */
.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 16px;
  text-align: center;
}

.carousel-caption h3 {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: bold;
}

.carousel-caption p {
  margin: 0 0 4px;
  font-size: 14px;
  opacity: 0.9;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .carousel {
    height: 250px;
  }

  .carousel-caption {
    padding: 8px 12px;
  }

  .carousel-caption h3 {
    font-size: 16px;
    margin-bottom: 4px;
  }
}

@media (max-width: 480px) {
  .carousel {
    height: 200px;
  }

  .carousel-caption {
    padding: 6px 10px;
  }

  .carousel-caption h3 {
    font-size: 14px;
    margin-bottom: 2px;
  }

  .carousel-caption p {
    font-size: 12px;
  }
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #666;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
}

/* 필요시 반응형 디자인에 추가 */
@media (max-width: 768px) {
  .image-placeholder {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .image-placeholder {
    font-size: 16px;
  }
}
</style>
