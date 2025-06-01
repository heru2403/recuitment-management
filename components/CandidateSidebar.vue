<template>
  <div class="w-64 bg-[#174e65] text-white shadow-lg flex flex-col h-screen sticky top-0">
    <div class="p-6 flex items-center space-x-3 border-b border-white/10">
      <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
        <i class="fas fa-user text-lg"></i>
      </div>
      <div>
        <p class="font-semibold font-redressed">{{ user?.name }}</p>
        <p class="text-xs text-white/70">{{ user?.email }}</p>
      </div>
    </div>
    
    <nav class="p-4 flex-1">
      <NuxtLink 
        to="/candidate/dashboard" 
        class="flex items-center space-x-3 p-3 rounded-lg mb-2 font-redressed hover:bg-white/10 transition-colors"
        :class="{'bg-white/10': $route.path === '/candidate/dashboard'}"
      >
        <i class="fas fa-home w-5"></i>
        <span>Dashboard</span>
      </NuxtLink>
      
      <NuxtLink 
        to="/candidate/tests" 
        class="flex items-center space-x-3 p-3 rounded-lg mb-2 font-redressed hover:bg-white/10 transition-colors"
        :class="{'bg-white/10': $route.path === '/candidate/tests'}"
      >
        <i class="fas fa-clipboard-list w-5"></i>
        <span>Daftar Tes</span>
      </NuxtLink>
      
      <NuxtLink 
        to="/candidate/results" 
        class="flex items-center space-x-3 p-3 rounded-lg mb-2 font-redressed hover:bg-white/10 transition-colors"
        :class="{'bg-white/10': $route.path === '/candidate/results'}"
      >
        <i class="fas fa-chart-bar w-5"></i>
        <span>Hasil Tes</span>
      </NuxtLink>
      
      <NuxtLink 
        to="/candidate/profile" 
        class="flex items-center space-x-3 p-3 rounded-lg mb-2 font-redressed hover:bg-white/10 transition-colors"
        :class="{'bg-white/10': $route.path === '/candidate/profile'}"
      >
        <i class="fas fa-user-cog w-5"></i>
        <span>Profil Saya</span>
      </NuxtLink>
    </nav>
    
    <div class="p-4 border-t border-white/10">
      <button 
        @click="handleLogout"
        class="w-full flex items-center space-x-3 p-3 rounded-lg font-redressed hover:bg-white/10 transition-colors text-left"
      >
        <i class="fas fa-sign-out-alt w-5"></i>
        <span>Keluar</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const user = ref(null);

onMounted(() => {
  const authData = localStorage.getItem('candidateAuth') || sessionStorage.getItem('candidateAuth');
  if (authData) {
    user.value = JSON.parse(authData);
  }
});

const handleLogout = () => {
  localStorage.removeItem('candidateAuth');
  sessionStorage.removeItem('candidateAuth');
  navigateTo('/candidate/login');
};
</script>