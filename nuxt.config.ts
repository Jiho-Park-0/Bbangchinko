export default {
  buildModules: ["@nuxt/typescript-build", "@nuxt/image"],
  css: ["@/assets/css/main.css", "@/assets/css/fonts.css"],

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
  },
  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: false, // 프로덕션 빌드 시 최적화 적용
    webp: {
      quality: 5, // 원하는 품질로 설정
    },
    // LQIP 옵션 (낮은 품질의 플레이스홀더 생성)
    inlineImageLimit: 0, // 인라인 대신 파일로 처리
    defaultImageLoader: "img-loader",
  },
  plugins: ["~/plugins/vue-lazyload.ts"],
  render: {
    static: {
      maxAge: "1d", // 1일 동안 캐싱
    },
  },
};
