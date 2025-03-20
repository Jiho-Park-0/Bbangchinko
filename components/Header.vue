<template>
  <header class="header">
    <div class="container">
      <h1 class="title">
        <img
          src="@/assets/images/logo.webp"
          class="logo-img"
          alt="빵칭코 로고"
        />

        <NuxtLink to="/" class="nav-item" @click.native="closeMenu"
          >빵칭코</NuxtLink
        >
      </h1>

      <!-- 햄버거 메뉴 버튼 -->
      <button
        class="hamburger"
        @click="toggleMenu"
        aria-label="메뉴 토글"
        :class="{ 'is-active': isMenuOpen }"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>

      <!-- 네비게이션 메뉴 -->
      <nav class="nav" :class="{ 'is-active': isMenuOpen }">
        <ul class="nav-links">
          <li>
            <NuxtLink to="/" class="nav-item" @click.native="closeMenu"
              >추출 리스트</NuxtLink
            >
          </li>
          <li>
            <a
              href="https://baslimbus.info"
              class="nav-item"
              target="_blank"
              rel="noopener noreferrer"
              @click="closeMenu"
              >단빵숲</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style>
.header {
  background: #f9fafb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 1920px;
  position: relative;
}

.container {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  position: relative;
}

.title {
  font-size: 28px;
  color: #42b983;
  font-weight: bold;
  font-family: "KOTRA_BOLD", sans-serif;
  z-index: 1000;
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
  width: auto;
  margin-right: 10px;
  vertical-align: middle;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  z-index: 999;
}

.nav-item {
  color: #42b983;
  text-decoration: none;
  transition: color 0.3s;
  font-weight: 500;
}

/* 햄버거 메뉴 스타일 */
.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 100;
}

.hamburger .bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  background-color: #42b983;
  transition: all 0.3s ease;
}

/* 모바일 스타일 */
@media (max-width: 768px) {
  .title {
    font-size: 24px;
  }

  .logo-img {
    height: 32px;
  }

  .hamburger {
    display: block;
    z-index: 1000; /* z-index 값 증가 */
  }

  .hamburger.is-active .bar:nth-child(2) {
    opacity: 0;
  }

  .hamburger.is-active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .hamburger.is-active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .nav {
    position: absolute;
    top: -200px; /* 위에 숨겨둠 */
    left: 0;
    right: 0;
    background-color: #f9fafb;
    width: 100%;
    height: auto; /* 컨텐츠에 맞게 자동 조절 */
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 999; /* title보다 낮고 다른 컨텐츠보다 높게 설정 */
    border-radius: 0 0 10px 10px; /* 하단 모서리 둥글게 */
    padding: 15px 0; /* 위아래 여백 추가 */
  }

  .nav.is-active {
    top: 60px; /* 헤더 아래에 위치하도록 조정 */
    left: 0;
  }

  .nav-links {
    flex-direction: column;
    gap: 1rem; /* 간격 줄임 */
    padding: 0;
    margin: 0;
  }

  .nav-item {
    font-size: 1.2rem;
    padding: 0.7rem 0; /* 패딩 줄임 */
    display: block;
  }
}

@media (max-width: 480px) {
  /* 모바일 사이즈 대응 */
  .title {
    font-size: 22px;
  }

  .logo-img {
    height: 28px;
  }

  .nav-item {
    font-size: 1.1rem;
  }
}
</style>
