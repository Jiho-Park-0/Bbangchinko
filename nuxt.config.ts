export default {
  modules: [
    "@nuxtjs/pwa",
    "@nuxtjs/axios", // API 호출을 위한 axios 모듈 추가
  ],
  buildModules: ["@nuxt/typescript-build"],
  css: ["@/assets/css/main.css", "@/assets/css/fonts.css"],
  target: "static",

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    imageCacheTime: 60 * 60 * 24 * 30, // 30일 캐싱 (초 단위)
  },

  // PWA 워크박스 설정 추가
  pwa: {
    workbox: {
      enabled: true,
      runtimeCaching: [
        {
          urlPattern: "https://limbus-image-bucket.s3.amazonaws.com/.*",
          handler: "CacheFirst",
          method: "GET",
          options: {
            cacheName: "image-cache",
            expiration: {
              maxEntries: 200,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30일 캐싱
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern:
            "https://limbus-image-bucket.s3.ap-northeast-2.amazonaws.com/.*",
          handler: "CacheFirst",
          method: "GET",
          options: {
            cacheName: "image-cache-2",
            expiration: {
              maxEntries: 200,
              maxAgeSeconds: 60 * 60 * 24 * 30 * 3000, // 30일 캐싱
            },
          },
        },
      ],
    },
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
