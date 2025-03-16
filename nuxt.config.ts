export default {
  buildModules: ["@nuxt/typescript-build"],
  css: ["@/assets/css/main.css", "@/assets/css/fonts.css"],

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
  },
};
