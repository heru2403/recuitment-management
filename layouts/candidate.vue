<template>
  <div class="candidate-layout">
    <header class="candidate-header" v-if="$auth.loggedIn">
      <div class="header-content">
        <div class="logo">Recruitment System</div>
        <div class="user-info">
          <span>{{ $auth.user.full_name }}</span>
          <button @click="logout" class="logout-btn">Logout</button>
        </div>
      </div>
    </header>
    
    <main class="candidate-main">
      <nuxt />
    </main>
    
    <footer class="candidate-footer">
      <div class="footer-content">
        <p>&copy; {{ new Date().getFullYear() }} Recruitment Management System</p>
        <p>Candidate Portal</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push('/candidate/login');
    }
  }
}
</script>

<style scoped>
.candidate-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.candidate-header {
  background-color: #2c3e50;
  color: white;
  padding: 0 20px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logout-btn {
  padding: 6px 12px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.candidate-main {
  flex: 1;
  background-color: #f5f7fa;
}

.candidate-footer {
  background-color: #2c3e50;
  color: white;
  padding: 15px 20px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}
</style>