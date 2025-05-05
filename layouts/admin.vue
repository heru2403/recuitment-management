<template>
    <div class="flex min-h-screen bg-gray-50">
      <!-- Sidebar -->
      <AdminSidebar />
      
      <!-- Main Content -->
      <div class="flex-1 overflow-y-auto">
        <!-- Top Navigation -->
        <header class="bg-white shadow-sm">
          <div class="px-6 py-4 flex items-center justify-between">
            <h1 class="text-xl font-semibold text-gray-900">
              {{ $route.meta.title || 'Admin Dashboard' }}
            </h1>
            <div class="flex items-center space-x-4">
              <button class="p-2 text-gray-400 hover:text-gray-500">
                <i class="fas fa-bell"></i>
              </button>
              <div class="relative">
                <button 
                  @click="toggleUserMenu"
                  class="flex items-center space-x-2"
                >
                  <img 
                    class="h-8 w-8 rounded-full" 
                    src="https://randomuser.me/api/portraits/men/1.jpg" 
                    alt="User"
                  >
                  <span class="hidden md:inline text-sm font-medium">
                    Admin User
                  </span>
                </button>
                <!-- User dropdown menu -->
                <div 
                  v-if="isUserMenuOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                >
                  <NuxtLink 
                    to="/admin/profile" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profil Saya
                  </NuxtLink>
                  <button 
                    @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <!-- Page Content -->
        <main class="p-6">
          <slot />
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const isUserMenuOpen = ref(false)
  
  const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value
  }
  
  const logout = () => {
    // Implement logout logic
    navigateTo('/login')
  }
  </script>