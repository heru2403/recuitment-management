<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <div class="w-64 bg-[#174e65] text-white shadow-lg">
      <div class="p-6 flex items-center space-x-3 border-b border-white/10">
        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <i class="fas fa-user text-lg"></i>
        </div>
        <div>
          <p class="font-semibold font-redressed">{{ user?.name }}</p>
          <p class="text-xs text-white/70">{{ user?.email }}</p>
        </div>
      </div>
      
      <nav class="p-4">
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
        >
          <i class="fas fa-clipboard-list w-5"></i>
          <span>Daftar Tes</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/candidate/results" 
          class="flex items-center space-x-3 p-3 rounded-lg mb-2 font-redressed hover:bg-white/10 transition-colors"
        >
          <i class="fas fa-chart-bar w-5"></i>
          <span>Hasil Tes</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/candidate/profile" 
          class="flex items-center space-x-3 p-3 rounded-lg mb-2 font-redressed hover:bg-white/10 transition-colors"
        >
          <i class="fas fa-user-cog w-5"></i>
          <span>Profil Saya</span>
        </NuxtLink>
      </nav>
      
      <div class="p-4 border-t border-white/10 mt-auto">
        <button 
          @click="handleLogout"
          class="w-full flex items-center space-x-3 p-3 rounded-lg font-redressed hover:bg-white/10 transition-colors text-left"
        >
          <i class="fas fa-sign-out-alt w-5"></i>
          <span>Keluar</span>
        </button>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <div class="p-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-[#174e65] font-redressed">Dashboard Kandidat</h1>
          <div class="flex items-center space-x-4">
            <div class="relative">
              <i class="fas fa-bell text-gray-500 text-xl"></i>
              <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div class="w-8 h-8 rounded-full bg-[#174e65] flex items-center justify-center text-white">
              {{ user?.name?.charAt(0) }}
            </div>
          </div>
        </div>
        
        <!-- Welcome Card -->
        <div class="bg-gradient-to-r from-[#174e65] to-[#5fa7ff] rounded-xl p-6 text-white mb-8 shadow-lg">
          <h2 class="text-2xl font-bold mb-2 font-redressed">Selamat datang, {{ user?.name }}!</h2>
          <p class="mb-4">Siap untuk mengerjakan tes berikutnya?</p>
          <button class="px-4 py-2 bg-white text-[#174e65] rounded-lg font-semibold font-redressed hover:bg-gray-100 transition-colors">
            Lihat Tes Tersedia
          </button>
        </div>
        
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <h3 class="text-gray-500 mb-2 font-redressed">Tes Tersedia</h3>
            <p class="text-3xl font-bold">2</p>
          </div>
          
          <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <h3 class="text-gray-500 mb-2 font-redressed">Tes Selesai</h3>
            <p class="text-3xl font-bold">0</p>
          </div>
          
          <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <h3 class="text-gray-500 mb-2 font-redressed">Nilai Rata-rata</h3>
            <p class="text-3xl font-bold">-</p>
          </div>
        </div>
        
        <!-- Available Tests -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-[#174e65] font-redressed">Tes Tersedia</h2>
            <NuxtLink to="/candidate/tests" class="text-sm text-[#174e65] hover:underline font-redressed">
              Lihat Semua
            </NuxtLink>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div>
                <h3 class="font-semibold font-redressed">Tes Matematika Dasar</h3>
                <p class="text-sm text-gray-500">Waktu: 30 menit | 20 soal</p>
              </div>
              <button class="px-4 py-2 bg-[#174e65] text-white rounded-lg font-redressed hover:bg-[#0d3648] transition-colors">
                Mulai Tes
              </button>
            </div>
            
            <div class="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div>
                <h3 class="font-semibold font-redressed">Tes Bahasa Inggris</h3>
                <p class="text-sm text-gray-500">Waktu: 45 menit | 30 soal</p>
              </div>
              <button class="px-4 py-2 bg-[#174e65] text-white rounded-lg font-redressed hover:bg-[#0d3648] transition-colors">
                Mulai Tes
              </button>
            </div>
          </div>
        </div>
        
        <!-- Recent Results -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-[#174e65] font-redressed">Hasil Terakhir</h2>
            <NuxtLink to="/candidate/results" class="text-sm text-[#174e65] hover:underline font-redressed">
              Lihat Semua
            </NuxtLink>
          </div>
          
          <div class="text-center py-8 text-gray-500">
            <i class="fas fa-clipboard-list text-4xl mb-3"></i>
            <p class="font-redressed">Belum ada hasil tes</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = ref(null);

onMounted(() => {
  // Ambil data user dari localStorage/sessionStorage
  const authData = localStorage.getItem('candidateAuth') || sessionStorage.getItem('candidateAuth');
  if (authData) {
    user.value = JSON.parse(authData);
  } else {
    // Jika tidak ada data auth, redirect ke login
    navigateTo('/candidate/login');
  }
});

const handleLogout = () => {
  localStorage.removeItem('candidateAuth');
  sessionStorage.removeItem('candidateAuth');
  navigateTo('/candidate/login');
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Redressed&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.font-redressed {
  font-family: 'Redressed', cursive;
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>