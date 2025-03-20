export default {
  buildModules: ["@nuxt/typescript-build", "@nuxt/image"],
  css: ["@/assets/css/main.css", "@/assets/css/fonts.css"],

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
  },
  image: {
    // 기본 provider는 'static'입니다.
    // provider: 'static',
    // 원격 이미지를 사용할 경우 whitelist에 도메인을 추가합니다.
    domains: [
      "https://limbus-image-bucket.s3.amazonaws.com",
      "https://limbus-image-bucket.s3.ap-northeast-2.amazonaws.com",
    ],
    // 프리셋을 사용하면 여러 곳에서 공통 설정을 적용할 수 있습니다.
    presets: {
      low_quality: {
        modifiers: {
          quality: 70,
          format: "webp",
          fit: "cover",
        },
      },
    },
  },
  plugins: [
    { src: "~/plugins/vue-lazyload", mode: "client" },
    { src: "~/plugins/vuex-persistedstate.ts", ssr: false },
  ],
  render: {
    static: {
      maxAge: "1d", // 1일 동안 캐싱
    },
  },
  head: {
    title: "빵칭코 - 추출 시뮬레이터", // 기본 타이틀
    titleTemplate: "%s - 빵칭코", // 각 페이지의 타이틀 앞뒤로 붙일 템플릿 (페이지별 title이 %s에 들어감)
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      },
    ],
    link: [
      // favicon 파일은 보통 static 폴더에 위치하며, 빌드 시 루트 경로로 복사됩니다.
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
  },
};
