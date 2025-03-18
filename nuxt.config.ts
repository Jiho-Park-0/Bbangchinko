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
        },
      },
    },
  },
  plugins: [{ src: "~/plugins/vue-lazyload", mode: "client" }],
  render: {
    static: {
      maxAge: "1d", // 1일 동안 캐싱
    },
  },
  head: {
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      },
    ],
  },
};
