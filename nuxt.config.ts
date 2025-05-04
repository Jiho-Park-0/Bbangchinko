export default {
  modules: [
    "@nuxtjs/axios", // API 호출을 위한 axios 모듈 추가
  ],
  buildModules: ["@nuxt/typescript-build"],

  // 빌드 설정 추가
  build: {
    extend(config) {
      config.stats = "errors-only"; // 오류 메시지만 출력
    },
  },
  css: ["@/assets/css/main.css", "@/assets/css/fonts.css"],
  target: "static",

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    imageCacheTime: 60 * 60 * 24 * 30, // 30일 캐싱 (초 단위)
  },

  // 렌더링 설정
  render: {
    static: {
      maxAge: "1y", // 정적 자산은 1년 캐싱
      etag: true,
    },
    compressor: {
      threshold: 0,
    },
  },

  // HTTP 헤더 설정 (정적 호스팅 시)
  server: {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable", // 1년 캐싱
    },
  },

  // 기존 설정 유지
  plugins: [
    { src: "~/plugins/vue-lazyload", mode: "client" },
    { src: "~/plugins/vuex-persistedstate.ts", ssr: false },
  ],
  head: {
    // 기존 head 설정 유지
  },
  generate: {
    fallback: true,
  },
};
