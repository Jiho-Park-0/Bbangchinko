export default {
  buildModules: ["@nuxt/typescript-build"],
  css: ["@/assets/css/main.css", "@/assets/css/fonts.css"],

  publicRuntimeConfig: {
    baseUrl: process.env.NUXT_PUBLIC_API_URL || "",
  },
};
