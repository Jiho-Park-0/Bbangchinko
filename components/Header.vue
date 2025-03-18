<template>
  <header class="header">
    <div class="container">
      <h1 class="title">빵칭코</h1>

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
              >메인</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/gacha" class="nav-item" @click.native="closeMenu"
              >뽑기</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/explain" class="nav-item" @click.native="closeMenu"
              >설명서</NuxtLink
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

  .hamburger {
    display: block;
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
    position: fixed;
    left: -100%;
    top: 0;
    gap: 0;
    flex-direction: column;
    background-color: #f9fafb;
    width: 100%;
    height: 100vh;
    text-align: center;
    transition: 0.3s;
    padding-top: 70px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .nav.is-active {
    left: 0;
  }

  .nav-links {
    flex-direction: column;
    gap: 2rem;
  }

  .nav-item {
    font-size: 1.2rem;
    padding: 1rem 0;
  }
}

@media (max-width: 480px) {
  /* 모바일 사이즈 대응 */
  .title {
    font-size: 22px;
  }

  .nav-item {
    font-size: 1.1rem;
  }
}
</style>
