<template>
  <footer class="footer">
    <div class="footer-content">
      <p>팀 단테의 빵과 수프입니다.</p>
      <p>문의사항이나 버그 제보는 메일로 연락해주세요.</p>
      <p class="contact">
        문의:
        <span class="email">bas.limbus@gmail.com</span>
      </p>
      <br />

      <p>&copy; {{ new Date().getFullYear() }} Bbangchinko</p>
      <br />
      <p>2025.03.19 Ver.Nuxt2</p>
      <p>
        빵칭코는 프로젝트문 공식 서비스가 아니며, 모든 게임 아트워크, 정보,
        애셋의 권리와 저작권은 해당 저작권자의 소유입니다.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style>
.footer {
  background-color: #f9fafb;
  color: #42b983;
  padding: 0 10%;
  margin-top: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.footer-content {
  max-width: 1200px;
  padding: 10px;
}

.footer-content p {
  margin: 0;
  font-size: 12px;
}

.contact {
  font-size: 14px;
  margin-top: 5px;
}

.email {
  color: #60a5fa;
  text-decoration: none;
}
</style>
