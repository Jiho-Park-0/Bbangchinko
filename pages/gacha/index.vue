<template>
  <div>
    <h1>뽑기 페이지</h1>
    <p>{{ url }}</p>
    <!-- 뽑기 컨트롤 컴포넌트 -->
    <GachaControls @drawSingle="handleSingleDraw" @drawTen="handleTenDraw" />
    <!-- 뽑기 결과 표시 컴포넌트 -->
    <GachaDisplay :items="randomItems" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Context } from "@nuxt/types";
import GachaControls from "@/components/gacha/GachaControls.vue";
import GachaDisplay from "@/components/gacha/GachaDisplay.vue";
import { drawSingle, drawTen } from "~/utils/gachaLogic";

// DataItem 인터페이스: id 추가, grade는 string 또는 number, type으로 identity/ego 구분
export interface DataItem {
  id: number;
  grade: string | number;
  beforeImage?: string;
  image?: string;
  type: "identity" | "ego";
}

export default Vue.extend({
  components: {
    GachaControls,
    GachaDisplay,
  },
  data() {
    return {
      url: "",
      allData: [] as DataItem[],
      randomItems: [] as DataItem[],
      // 픽업 id 설정 (빈 배열도 가능, 1개 이상 지정 가능)
      identityPickupIds: [138, 137],
      egoPickupIds: [96],
      // 제외할 데이터 id 배열 (빈 배열 또는 특정 id 지정)
      // 발푸밤 인격 13, 34, 83, 84, 103, 119, 120, 131, 132
      // 이벤트 인격 116, 117, 110, 111, 80, 53, 41, 74, 90
      identityExcludedIds: [
        13, 34, 83, 84, 103, 119, 120, 131, 132, 116, 117, 110, 111, 80, 53, 41,
        74, 90,
      ] as number[],
      // 포함시킬 ego 데이터 id 배열 (이 목록에 포함된 ego 데이터만 사용)
      egoIncludedIds: [
        79, 61, 58, 90, 96, 8, 3, 47, 95, 30, 21, 17, 91, 92, 25, 43, 52, 56, 6,
        60, 46, 63, 80, 83, 35, 11, 65,
      ] as number[],
    };
  },
  async asyncData({ $config }: Context) {
    try {
      const baseURL = $config.baseURL;
      const identityUrl = `${baseURL}/dictionary/identity`;
      const egoUrl = `${baseURL}/dictionary/ego`;

      // 두 API를 병렬 호출
      const [identityResponse, egoResponse] = await Promise.all([
        fetch(identityUrl).then((res) => res.json()),
        fetch(egoUrl).then((res) => res.json()),
      ]);

      // 각 데이터에 type 필드 추가
      const identityData = identityResponse.map((item: any) => ({
        ...item,
        type: "identity" as const,
      }));
      const egoData = egoResponse.map((item: any) => ({
        ...item,
        type: "ego" as const,
      }));

      const allData = [...identityData, ...egoData];

      return { allData, url: baseURL };
    } catch (error) {
      console.error("API 데이터 로딩 실패:", error);
      return { allData: [], url: "" };
    }
  },
  methods: {
    handleSingleDraw() {
      // identity: 제외할 id가 있으면 제거, ego: 반드시 포함해야 하는 id 목록에 포함된 데이터만 사용
      const filteredData = this.allData.filter((item: DataItem) => {
        if (
          item.type === "identity" &&
          this.identityExcludedIds.includes(item.id)
        ) {
          return false;
        }
        if (item.type === "ego" && !this.egoIncludedIds.includes(item.id)) {
          return false;
        }
        return true;
      });
      const result = drawSingle(
        filteredData,
        false,
        this.identityPickupIds,
        this.egoPickupIds
      );
      console.log({ id: result.id, grade: result.grade });
      this.randomItems = [result];
    },
    handleTenDraw() {
      const filteredData = this.allData.filter((item: DataItem) => {
        if (
          item.type === "identity" &&
          this.identityExcludedIds.includes(item.id)
        ) {
          return false;
        }
        if (item.type === "ego" && !this.egoIncludedIds.includes(item.id)) {
          return false;
        }
        return true;
      });
      const results = drawTen(
        filteredData,
        this.identityPickupIds,
        this.egoPickupIds
      );
      console.log(results.map((item) => ({ id: item.id, grade: item.grade })));
      this.randomItems = results;
    },
  },
});
</script>
