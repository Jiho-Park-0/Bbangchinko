<template>
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <Header />
    <main>
      <div class="content-wrapper">
        <Nuxt />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<!-- Google tag (gtag.js) -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-PJP633HKE0"
></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-PJP633HKE0");
</script>

<style>
/* 오직 main 내부의 content-wrapper에만 max-width 적용 */
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
