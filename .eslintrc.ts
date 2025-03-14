module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
  },
  extends: [
    "@nuxtjs/eslint-config", // Nuxt 2용
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    // 커스텀 규칙 추가
    "vue/multi-word-component-names": "off", // 단일 컴포넌트명 허용
  },
};
