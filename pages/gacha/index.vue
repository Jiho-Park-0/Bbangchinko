<template>
  <div>
    뽑기 페이지
    <p>{{ url }}</p>
    <div v-if="allData && allData.length">
      <div v-for="(item, index) in allData" :key="index">
        <p>{{ item.name }}</p>
        <p>캐릭터: {{ item.character }}</p>
        <p>등급: {{ item.grade }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Context } from "@nuxt/types";

interface Identity {
  name: string;
  character: string;
  grade: string;
}

export default Vue.extend({
  // Vue 컴포넌트의 기본 데이터
  data() {
    return {
      url: "",
      allData: [] as Identity[],
    };
  },
  // Nuxt 전용 옵션: asyncData
  async asyncData({ $config }: Context) {
    try {
      // nuxt.config.js에서 설정한 $config.baseURL 값을 사용
      const baseURL = $config.baseURL;
      console.log("baseURL:", baseURL);
      const url = `${baseURL}/dictionary/identity?grade=1`;
      const posts = await fetch(url).then((res) => res.json());
      return { allData: posts, url };
    } catch (error) {
      console.error("API 데이터 로딩 실패:", error);
      return { allData: [], url: "" };
    }
  },
});
</script>

<style scoped>
/* 원하는 스타일을 추가할 수 있습니다 */
</style>
