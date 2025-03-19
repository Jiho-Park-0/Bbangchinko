<template>
  <div class="pickup-info">
    <h2>픽업 정보</h2>

    <!-- 픽업 섹션 컨테이너 추가 -->
    <div class="pickup-sections-container">
      <!-- 인격 픽업 정보 -->
      <div v-if="identityDetails.length" class="pickup-section">
        <h3>인격 픽업</h3>
        <div v-if="identityDetails.length" class="pickup-cards">
          <a
            v-for="item in identityDetails"
            :key="`identity-${item.id}`"
            :href="getItemLink(item)"
            target="_blank"
            class="pickup-card"
          >
            <nuxt-img
              preset="low_quality"
              class="pickup-image"
              :src="item.beforeImage || item.image"
              :alt="item.name"
              loading="lazy"
              format="webp"
              width="200"
              height="120"
            />
            <div class="pickup-details">
              <div class="pickup-name">{{ item.name }}</div>
              <div v-if="item.character" class="pickup-character">
                {{ item.character }}
              </div>
            </div>
          </a>
        </div>
      </div>

      <!-- EGO 픽업 정보 -->
      <div v-if="egoDetails.length" class="pickup-section">
        <h3>EGO 픽업</h3>
        <div v-if="egoDetails.length" class="pickup-cards">
          <a
            v-for="item in egoDetails"
            :key="`ego-${item.id}`"
            :href="getItemLink(item)"
            target="_blank"
            class="pickup-card"
          >
            <nuxt-img
              preset="low_quality"
              class="pickup-image"
              :src="item.beforeImage || item.image"
              :alt="item.name"
              loading="lazy"
              format="webp"
              width="200"
              height="120"
            />
            <div class="pickup-details">
              <div class="pickup-name">{{ item.name }}</div>
              <div v-if="item.character" class="pickup-character">
                {{ item.character }}
              </div>
            </div>
          </a>
        </div>
      </div>

      <!-- 픽업 정보가 없을 때 -->
      <div v-else class="pickup-empty">상시 픽업 입니다.</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { DataItem } from "@/types/index";

export default Vue.extend({
  name: "PickupInfo",
  props: {
    id: {
      type: String,
      required: true,
    },
    identityPickups: {
      type: Array as () => number[],
      default: () => [],
    },
    egoPickups: {
      type: Array as () => number[],
      default: () => [],
    },
    identityDetails: {
      type: Array as () => DataItem[],
      default: () => [],
    },
    egoDetails: {
      type: Array as () => DataItem[],
      default: () => [],
    },
  },
  methods: {
    getItemLink(item: DataItem) {
      return item.type === "identity"
        ? `https://baslimbus.info/identity/${item.id}`
        : `https://baslimbus.info/ego/${item.id}`;
    },
  },
});
</script>

<style scoped>
.pickup-info {
  margin: 24px 0px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pickup-info h2 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
  font-size: 24px;
}

/* 픽업 섹션 컨테이너 스타일 추가 */
.pickup-sections-container {
  display: flex;
  gap: 20px;
}

.pickup-section {
  flex: 1;
  min-width: 0; /* IE11 flex 콘텐츠 넘침 문제 해결 */
}

.pickup-section h3 {
  margin-bottom: 12px;
  color: #4a90e2;
  font-size: 18px;
}

.pickup-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
}

.pickup-card {
  width: 190px; /* 고정 너비 설정 */
  height: 180px; /* 고정 높이 설정 */
  border-radius: 6px;
  overflow: hidden;
  background-color: #f9f9f9;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.pickup-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.pickup-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.pickup-details {
  padding: 10px;
  height: 70px; /* 이미지 제외한 높이 고정 */
  overflow: auto; /* 내용이 넘치면 스크롤 표시 */
}

.pickup-name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
}

.pickup-character {
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
}

.pickup-empty {
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 6px;
  text-align: center;
  color: #999;
  margin-bottom: 20px;
}

/* 모바일 화면 반응형 */
@media (max-width: 768px) {
  .pickup-sections-container {
    flex-direction: column; /* 세로 방향으로 변경 */
  }

  .pickup-cards {
    justify-content: center;
  }
}
</style>
