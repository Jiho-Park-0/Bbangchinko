<template>
  <header class="header">
    <div class="container">
      <h1 class="title">빵칭코</h1>
      <nav>
        <ul class="nav-links">
          <li><NuxtLink to="/" class="nav-item">메인</NuxtLink></li>
          <li><NuxtLink to="/getcha" class="nav-item">뽑기</NuxtLink></li>
          <li><NuxtLink to="/explain" class="nav-item">설명서</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style>
.header {
  background: #f9fafb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
}

.title {
  font-size: 28px;
  color: #42b983;
  font-weight: bold;
  font-family: "KOTRA_BOLD", sans-serif;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-item {
  color: 42b983;
  text-decoration: none;
  transition: color 0.3s;
}
</style>
