<template>
  <div>
    <h1>블로그 글 ID: {{ id }}</h1>
    <p>{{ counter }}</p>
    <button @click="increment">Increment</button>
    <button @click="incrementAsync">Increment Async</button>
    <!-- API 데이터 바인딩 등 추가 구현 -->
  </div>
</template>

<script lang="ts">
import { mapState, mapActions, mapMutations } from "vuex";
import { Context } from "@nuxt/types";

export default {
  async asyncData({ params }: Context) {
    // params.id를 활용해 API 호출 등 로직 구현 가능
    return { id: params.id };
  },

  computed: {
    ...mapState(["counter"]),
  },
  methods: {
    ...mapMutations(["increment"]), // commit을 직접 호출하지 않도록 변경
    ...mapActions(["incrementAsync"]),
  },
};
</script>
