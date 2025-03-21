<template>
  <div>
    <PickupInfo
      :id="id"
      :identityPickups="currentIdentityPickups"
      :egoPickups="currentEgoPickups"
      :identityDetails="identityDetails"
      :egoDetails="egoDetails"
    />

    <IdealControl :id="id" :ideal="currentIdeal" />

    <PickupStats
      :id="id"
      :identityCount="pickupIdentityCount"
      :egoCount="pickupEgoCount"
    />

    <GachaControls
      @drawSingle="handleSingleDraw"
      @drawTen="handleTenDraw"
      :isDrawing="isDrawing"
    />

    <GachaDisplay
      :items="randomItems"
      :drawCount="currentIdeal"
      :id="id"
      :isLoading="isLoading"
    />

    <GachaDescription />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Context } from "@nuxt/types";
import GachaControls from "@/components/gacha/GachaControls.vue";
import GachaDisplay from "@/components/gacha/GachaDisplay.vue";
import PickupInfo from "@/components/gacha/PickupInfo.vue";
import IdealControl from "@/components/gacha/IdealControl.vue";
import PickupStats from "@/components/gacha/PickupStats.vue";
import GachaDescription from "@/components/gacha/GachaDescription.vue";
import { mapState, mapMutations } from "vuex";
import GachaHandler from "@/utils/gachaHandler";
import { DataItem } from "@/types/index";

export default Vue.extend({
  components: {
    GachaControls,
    GachaDisplay,
    PickupInfo,
    IdealControl,
    PickupStats,
    GachaDescription,
  },

  data() {
    return {
      url: "",
      allData: [] as DataItem[],
      randomItems: [] as DataItem[],
      identityExcludedIds: [
        13, 34, 83, 84, 103, 119, 120, 131, 132, 116, 117, 110, 111, 80, 53, 41,
        74, 90, 17, 65, 140,
      ] as number[],
      egoIncludedIds: [
        79, 61, 58, 90, 96, 8, 3, 47, 95, 30, 21, 17, 91, 92, 25, 43, 52, 56, 6,
        60, 46, 63, 80, 83, 35, 11, 65,
      ] as number[],
      isDrawing: false, // 추출 중인지 여부를 추적할 상태 변수 추가
      isLoading: false, // 로딩 상태를 추적할 상태 변수 추가
    };
  },

  computed: {
    ...mapState(["idealValues", "pickupConfig", "pickupCounts"]),
    currentIdentityPickups(): number[] {
      return this.$store.state.pickupConfig?.[this.id]?.identity || [];
    },
    currentEgoPickups(): number[] {
      return this.$store.state.pickupConfig?.[this.id]?.ego || [];
    },
    currentIdeal(): number {
      return this.$store.state.idealValues?.[this.id] || 0;
    },
    pickupIdentityCount(): number {
      return this.$store.state.pickupCounts?.[this.id]?.identity || 0;
    },
    pickupEgoCount(): number {
      return this.$store.state.pickupCounts?.[this.id]?.ego || 0;
    },
    // 인격 픽업 상세 정보
    identityDetails(): DataItem[] {
      return this.allData.filter(
        (item) =>
          item.type === "identity" &&
          this.currentIdentityPickups.includes(item.id)
      );
    },
    // EGO 픽업 상세 정보
    egoDetails(): DataItem[] {
      return this.allData.filter(
        (item) =>
          item.type === "ego" && this.currentEgoPickups.includes(item.id)
      );
    },
    gachaHandler(): GachaHandler {
      return new GachaHandler(
        this.allData,
        this.identityExcludedIds,
        this.egoIncludedIds,
        this.currentIdentityPickups,
        this.currentEgoPickups
      );
    },
  },

  async asyncData({ params, $config }: Context) {
    try {
      const id = params?.id || "1";
      const baseURL = $config.baseURL;

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

      const allData = [...identityData, ...egoData];

      return { allData, url: baseURL, id };
    } catch (error) {
      console.error("API 데이터 로딩 실패:", error);
      return { allData: [], url: "", id: params?.id || "1" };
    }
  },

  mounted() {
    this.$store.dispatch("checkExpiration");
  },

  methods: {
    ...mapMutations(["increment", "incrementTen", "incrementPickupCount"]),

    handleSingleDraw() {
      // 이미 추출 중이면 실행 취소
      if (this.isDrawing) {
        return;
      }

      // 추출 상태 설정
      this.isDrawing = true;

      // GachaHandler 클래스를 사용하여 뽑기 실행
      const result = this.gachaHandler.drawSingle();

      // 픽업 아이템인지 확인하고 카운트 증가
      if (
        result.type === "identity" &&
        this.currentIdentityPickups.includes(result.id)
      ) {
        this.incrementPickupCount({ id: this.id, type: "identity" });
      } else if (
        result.type === "ego" &&
        this.currentEgoPickups.includes(result.id)
      ) {
        this.incrementPickupCount({ id: this.id, type: "ego" });
      }

      this.randomItems = [result];
      this.increment(this.id);

      // 단일 추출은 바로 완료 처리
      this.isDrawing = false;
    },

    handleTenDraw() {
      // 이미 추출 중이면 실행 취소
      if (this.isDrawing) {
        return;
      }

      // 추출 상태 설정
      this.isDrawing = true;

      // GachaHandler 클래스를 사용하여 10연속 뽑기 실행
      const results = this.gachaHandler.drawTen();

      // 각 결과 아이템에 대해 픽업 여부 확인
      results.forEach((item) => {
        if (
          item.type === "identity" &&
          this.currentIdentityPickups.includes(item.id)
        ) {
          this.incrementPickupCount({ id: this.id, type: "identity" });
        } else if (
          item.type === "ego" &&
          this.currentEgoPickups.includes(item.id)
        ) {
          this.incrementPickupCount({ id: this.id, type: "ego" });
        }
      });

      // 결과 표시 및 카운터 증가
      this.randomItems = [];
      this.incrementTen(this.id);

      // 마지막 아이템이 추가되면 추출 상태 해제
      let itemsAdded = 0;

      results.forEach((item, index) => {
        setTimeout(() => {
          this.randomItems.push(item);
          itemsAdded++;

          // 모든 아이템이 추가되면 추출 상태 해제
          if (itemsAdded === results.length) {
            this.isDrawing = false;
          }
        }, 300 * index);
      });
    },
  },
});
</script>

<style src="@/assets/css/gacha-components.css"></style>
