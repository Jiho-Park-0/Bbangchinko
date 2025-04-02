<template>
  <div class="home-container">
    <div class="intro-section">
      <h1 class="intro-title">빵칭코</h1>
      <div class="intro-content">
        <p class="intro-text">안녕하세요. 단빵숲 입니다.</p>
        <p class="intro-text">
          '빵칭코'의 시범 테스트는 4월 30일까지 진행 예정입니다.
        </p>
        <p class="intro-text">참고 바랍니다.</p>
      </div>
    </div>
    <div class="pickup-grid">
      <!-- 각 픽업 카드 -->
      <div v-for="id in 3" :key="id" class="pickup-card">
        <nuxt-link :to="`/gacha/${id}`">
          <h2>{{ getPickupTitle(id) }}</h2>
          <div class="content-container">
            <!-- 픽업 데이터가 존재하는 경우에만 렌더링 -->
            <div v-if="getPickupImages(id).length > 0" class="single-image">
              <img
                class="single-image-img"
                :src="
                  getPickupImages(id)[0]?.beforeImage ||
                  getPickupImages(id)[0]?.image
                "
                :alt="getPickupImages(id)[0]?.name || '이미지 없음'"
                loading="lazy"
                width="600"
                height="300"
              />
              <div class="single-image-caption">
                <h3>{{ getPickupImages(id)[0]?.name || "이름 없음" }}</h3>
                <p v-if="getPickupImages(id)[0]?.character">
                  {{ getPickupImages(id)[0]?.character }}
                </p>
              </div>
            </div>
            <div v-else class="no-pickup">
              {{ id === 3 ? "상시 추출" : "픽업 없음" }}
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { DataItem } from "@/types/index";

export default Vue.extend({
  data() {
    return {
      allData: [] as DataItem[],
      pickupTitles: {
        "1": "심야청소 - 신규 인격 특정 추출",
        "2": "특정 추출 - 돈키호테",
        "3": "상시 추출",
      } as { [key: string]: string },
    };
  },
  computed: {
    pickupImageMap(): { [key: string]: DataItem[] } {
      const result: { [key: string]: DataItem[] } = {};
      for (const id in this.$store.state.pickupConfig) {
        result[id] = [];
        const identityPickups =
          this.$store.state.pickupConfig[id]?.identity || [];
        for (const pickupId of identityPickups) {
          const item = this.allData.find(
            (item) => item.type === "identity" && item.id === pickupId
          );
          if (item) result[id].push(item);
        }
        const egoPickups = this.$store.state.pickupConfig[id]?.ego || [];
        for (const pickupId of egoPickups) {
          const item = this.allData.find(
            (item) => item.type === "ego" && item.id === pickupId
          );
          if (item) result[id].push(item);
        }
      }
      return result;
    },
  },
  methods: {
    getPickupImages(id: number): DataItem[] {
      return this.pickupImageMap[id.toString()] || [];
    },
    getPickupTitle(id: number): string {
      return this.pickupTitles[id.toString()] || `픽업 ${id}`;
    },
  },
});
</script>

<style scoped src="@/assets/css/home.css"></style>
