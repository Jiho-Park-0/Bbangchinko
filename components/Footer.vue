<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ new Date().getFullYear() }} 빵칭코. All rights reserved.</p>
      <p class="contact">
        문의:
        <a href="bas.limbus@gmail.com" class="email">bas.limbus@gmail.com</a>
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
  text-align: center;
  padding: 20px 0;
  margin-top: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact {
  font-size: 14px;
  margin-top: 5px;
}

.email {
  color: #60a5fa;
  text-decoration: none;
}

.email:hover {
  text-decoration: underline;
}
</style>
