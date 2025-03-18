<template>
  <div>
    <h1>뽑기 페이지</h1>
    <h1>ID: {{ id }}</h1>
    <p>현재 픽업 ID:</p>
    <ul>
      <li>Identity: {{ currentIdentityPickups.join(", ") || "없음" }}</li>
      <li>EGO: {{ currentEgoPickups.join(", ") || "없음" }}</li>
    </ul>
    <div class="Ideal-controls">
      <button @click="resetIdealById(id)">초기화</button>
      <span>이상[理想]: {{ currentIdeal }}</span>
    </div>
    <div class="description">
      <p>픽업 확률</p>
      <p class="percentage">인격: 1.45% / 픽업수</p>
      <p class="percentage">에고: 0.65% / 픽업수</p>

      <p>
        10회추출은 2성 하나가 확정입니다. 이상[理想]은 1시간마다 초기화됩니다.
      </p>
      <p class="percentage">
        1회 추출 확률: EGO 1.3% / 3성 2.9% / 2성 12.8% / 1성 83%
      </p>
      <p class="percentage">
        10회 추출 10번째 확률: EGO 1.3% / 3성 2.9% / 2성 95.8%
      </p>
    </div>

    <!-- 뽑기 컨트롤 컴포넌트 -->
    <GachaControls @drawSingle="handleSingleDraw" @drawTen="handleTenDraw" />
    <!-- 뽑기 결과 표시 컴포넌트 -->
    <GachaDisplay :items="randomItems" :drawCount="currentIdeal" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Context } from "@nuxt/types";
import GachaControls from "@/components/gacha/GachaControls.vue";
import GachaDisplay from "@/components/gacha/GachaDisplay.vue";
import { drawSingle, drawTen } from "~/utils/gachaLogic";
import { mapState, mapMutations } from "vuex";

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
      // 제외할 데이터 id 배열 (빈 배열 또는 특정 id 지정)
      identityExcludedIds: [
        13, 34, 83, 84, 103, 119, 120, 131, 132, 116, 117, 110, 111, 80, 53, 41,
        74, 90, 17, 65,
      ] as number[],
      // 포함시킬 ego 데이터 id 배열 (이 목록에 포함된 ego 데이터만 사용)
      egoIncludedIds: [
        79, 61, 58, 90, 96, 8, 3, 47, 95, 30, 21, 17, 91, 92, 25, 43, 52, 56, 6,
        60, 46, 63, 80, 83, 35, 11, 65,
      ] as number[],
    };
  },
  computed: {
    ...mapState(["idealValues", "pickupConfig"]),
    currentIdentityPickups(): number[] {
      // 하드코딩된 픽업 설정에서 가져오기
      return this.$store.state.pickupConfig?.[this.id]?.identity || [];
    },
    currentEgoPickups(): number[] {
      // 하드코딩된 픽업 설정에서 가져오기
      return this.$store.state.pickupConfig?.[this.id]?.ego || [];
    },
    currentIdeal(): number {
      // Ideal 값은 별도 객체에서 가져오기
      return this.$store.state.idealValues?.[this.id] || 0;
    },
  },

  async asyncData({ params, $config }: Context) {
    try {
      // params.id 활용 (기본값 설정)
      const id = params?.id || "1";

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
    ...mapMutations(["increment", "incrementTen", "resetIdealById"]),
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

      // store에서 가져온 현재 픽업 ID 사용
      const result = drawSingle(
        filteredData,
        false,
        this.currentIdentityPickups,
        this.currentEgoPickups
      );

      console.log({ id: result.id, grade: result.grade });
      this.randomItems = [result];
      this.increment(this.id); // 현재 ID의 Ideal 증가
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

      // store에서 가져온 현재 픽업 ID 사용
      const results = drawTen(
        filteredData,
        this.currentIdentityPickups,
        this.currentEgoPickups
      );

      // 초기화 및 뽑기 횟수 증가
      this.randomItems = [];
      this.incrementTen(this.id); // 현재 ID의 Ideal 10 증가

      // 0.5초 간격으로 아이템 순차적으로 추가
      results.forEach((item, index) => {
        setTimeout(() => {
          this.randomItems.push(item);
        }, 300 * index);
      });

      console.log(results.map((item) => ({ id: item.id, grade: item.grade })));
    },
  },
});
</script>

<style scoped>
.description {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 5px;
  background-color: #f0f4f8;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  line-height: 1.5;
}

.percentage {
  font-style: italic;
  font-size: 12px;
}

p {
  margin: 0 0 10px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 5px;
}

.Ideal-controls {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.Ideal-controls button {
  padding: 5px 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.Ideal-controls button:hover {
  background-color: #ee5253;
}
</style>
