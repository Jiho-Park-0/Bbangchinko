<template>
  <div class="home-container">
    <div class="intro-section">
      <h1 class="intro-title">빵칭코</h1>
      <div class="intro-toggle-container">
        <div class="intro-toggle" @click="toggleNotice">
          {{ isNoticeExpanded ? "공지사항 접기 ▲" : "공지사항 펼치기 ▼" }}
        </div>

        <div class="intro-content" :class="{ expanded: isNoticeExpanded }">
          <p class="intro-text">안녕하세요. 단빵숲 입니다.</p>
          <p class="intro-text">
            여태까지 '빵칭코'의 추출에서는 동기화 전 일러스트가 출력되었습니다.
          </p>
          <p class="intro-text">
            그러나 이제부터는 일러스트 대신 각 데이터의 텍스트와 등급이
            표시되도록 변경되었습니다.
          </p>
          <br />
          <p class="intro-text">
            많은 분들이 이용해 주신 덕분에 정말 감사한 마음뿐이지만, 서버의
            이미지 사용량이 과도하게 증가하여 부득이하게 텍스트 출력 방식으로
            조정하게 되었습니다.
          </p>
          <p class="intro-text">
            갑작스러운 변경으로 불편을 끼쳐 드려 죄송하며, 앞으로도 많은 관심과
            이용 부탁드립니다. 감사합니다.
          </p>
          <br />
          <p class="intro-text">
            추가적으로 이전 개발 테스트 추출에 많은 관심을 주셔서 임의
            발부르기스의 밤 추출을 추가하였습니다.
          </p>
          <!-- <p class="intro-text">림버스 컴퍼니 추출 시뮬레이션 '빵칭코'입니다.</p>

          <p class="intro-text">
            현재 임시 테스트 단계이며, 갑작스럽게 사이트가 닫힐 수 있습니다.
          </p>
          <p class="intro-text">
            기능 및 확률은 시뮬레이터 설명칸을 참조 바랍니다.
          </p>
          
          <p class="intro-text">
            '빵칭코'는 추가적인 기능 업데이트는 없으며 추출리스트만 갱신할
            예정입니다.
          </p> -->
        </div>
      </div>
    </div>
    <div class="pickup-grid">
      <!-- 각 픽업 카드 -->
      <div v-for="id in 4" :key="id" class="pickup-card">
        <nuxt-link :to="`/gacha/${id}`">
          <h2>{{ getPickupTitle(id) }}</h2>
          <div class="content-container">
            <!-- 픽업이 있는 경우 (2개 이상) -->
            <div v-if="hasPickups(id) && getPickupImages(id).length > 1">
              <carousel :items="getPickupImages(id)" />
            </div>

            <!-- 픽업이 있는 경우 (1개만) -->
            <div
              v-else-if="hasPickups(id) && getPickupImages(id).length === 1"
              class="single-image"
            >
              <nuxt-img
                preset="low_quality"
                class="single-image-img"
                :src="
                  getPickupImages(id)[0].beforeImage ||
                  getPickupImages(id)[0].image
                "
                :alt="getPickupImages(id)[0].name"
                loading="lazy"
                format="webp"
                width="600"
                height="300"
              />
              <div class="single-image-caption">
                <h3>{{ getPickupImages(id)[0].name }}</h3>
                <p v-if="getPickupImages(id)[0].character">
                  {{ getPickupImages(id)[0].character }}
                </p>
              </div>
            </div>

            <!-- 픽업이 없는 경우 -->
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
import Carousel from "@/components/main/carousel.vue";
import { DataItem } from "@/types/index";

export default Vue.extend({
  components: {
    Carousel,
  },

  data() {
    return {
      allData: [] as DataItem[],
      pickupTitles: {
        "1": "심야청소 - 신규 인격 특정 추출",
        "2": "특정 추출 - 홍루",
        "3": "상시 추출",
        "4": "발푸르기스의 밤 추출",
      } as { [key: string]: string },
      isNoticeExpanded: false, // 토글 상태 추가 (기본값: 접힘)
    };
  },

  computed: {
    // 픽업 이미지 맵 계산
    pickupImageMap(): { [key: string]: DataItem[] } {
      const result: { [key: string]: DataItem[] } = {};

      // 모든 픽업 ID에 대해
      for (const id in this.$store.state.pickupConfig) {
        result[id] = [];

        // 인격 픽업 이미지 가져오기
        const identityPickups =
          this.$store.state.pickupConfig[id]?.identity || [];
        for (const pickupId of identityPickups) {
          const item = this.allData.find(
            (item) => item.type === "identity" && item.id === pickupId
          );
          if (item) result[id].push(item);
        }

        // EGO 픽업 이미지 가져오기
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
    // 픽업 이미지 가져오기
    getPickupImages(id: number): DataItem[] {
      return this.pickupImageMap[id.toString()] || [];
    },

    // 픽업이 있는지 확인
    hasPickups(id: number): boolean {
      const config = this.$store.state.pickupConfig[id];

      return Boolean(config?.identity?.length > 0 || config?.ego?.length > 0);
    },

    // 픽업 제목 가져오는 메서드 추가
    getPickupTitle(id: number): string {
      return this.pickupTitles[id.toString()] || `픽업 ${id}`;
    },

    // 토글 메서드 추가
    toggleNotice() {
      this.isNoticeExpanded = !this.isNoticeExpanded;
    },
  },

  async fetch() {
    try {
      const baseURL = this.$config.baseURL;

      const identityUrl = `${baseURL}/dictionary/identity`;
      const egoUrl = `${baseURL}/dictionary/ego`;

      const [identityResponse, egoResponse] = await Promise.all([
        fetch(identityUrl).then((res) => res.json()),
        fetch(egoUrl).then((res) => res.json()),
      ]);

      const identityData = identityResponse.map((item: any) => ({
        ...item,
        type: "identity" as const,
      }));

      const egoData = egoResponse.map((item: any) => ({
        ...item,
        type: "ego" as const,
      }));

      this.allData = [...identityData, ...egoData];
    } catch (error) {
      console.error("API 데이터 로딩 실패:", error);
    }
  },
});
</script>

<style scoped src="@/assets/css/home.css"></style>

<style scoped>
/* 기존 스타일은 유지 */

.intro-toggle-container {
  margin: 20px 0;
}

.intro-toggle {
  display: inline-block;
  padding: 8px 16px;
  background-color: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-bottom: 8px;
}

.intro-toggle:hover {
  background-color: #e0e0e0;
}

.intro-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.intro-content.expanded {
  max-height: 500px; /* 충분히 큰 값으로 설정 */
  margin-top: 15px;
  padding: 0 50px;
}
</style>
