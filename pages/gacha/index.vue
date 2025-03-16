<template>
  <div>
    뽑기 페이지
    <p>{{ url }}</p>
    <div v-if="allData && allData.length">
      <div v-for="(item, index) in allData" :key="index">
        <p>{{ item.name }}</p>
        <p>캐릭터: {{ item.character }}</p>
        <p>등급: {{ item.grade }}</p>
        <!-- <img :src="item.beforeImage" alt="Before Image" /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: null,
      url: "", // 초기값 설정
      allData: [], // API 데이터를 담을 배열
    };
  },

  async asyncData({ $config }) {
    try {
      // publicRuntimeConfig에서 baseUrl 가져오기
      const baseUrl = $config.baseUrl;
      // https://limbus.store/dictionary/identity?grade=1&minSpeed=1&maxSpeed=9&minWeight=1&maxWeight=9
      const url = `${baseUrl}/dictionary/identity?grade=1`;

      console.log("API 요청 URL:", url);

      const response = await fetch(url);
      const data = await response.json();
      return {
        allData: data,
        url: url,
      };
    } catch (error) {
      console.error("API 데이터 로딩 실패:", error);
      return { allData: [], url: "" };
    }
  },
};
</script>

<style scoped>
/* 스타일을 추가할 수 있습니다 */
</style>
