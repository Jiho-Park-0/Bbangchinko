import Vue from "vue";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "/error.png", // 에러 시 표시 이미지
  loading: "/loading.gif", // 로딩 중 표시 이미지 (LQIP로 대체 가능)
  attempt: 1,
});
