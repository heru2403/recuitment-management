<template>
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <div class="w-64 bg-gray-800 text-gray-100">
        <div class="p-4">
          <h4 class="text-xl font-bold">Admin Portal</h4>
          <p class="text-gray-400 text-sm">Super Administrator</p>
        </div>
        
        <nav class="mt-4">
          <NuxtLink 
            to="/admin" 
            class="block px-4 py-2 text-gray-300 hover:bg-blue-600 hover:text-white"
            :class="{ 'bg-blue-600 text-white': $route.path === '/admin' }"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink 
            to="/admin/users" 
            class="block px-4 py-2 text-gray-300 hover:bg-blue-600 hover:text-white"
          >
            Manajemen User
          </NuxtLink>
          <NuxtLink 
            to="/admin/settings" 
            class="block px-4 py-2 text-gray-300 hover:bg-blue-600 hover:text-white"
          >
            Pengaturan Sistem
          </NuxtLink>
          <NuxtLink 
            to="/admin/reports" 
            class="block px-4 py-2 text-gray-300 hover:bg-blue-600 hover:text-white"
          >
            Laporan
          </NuxtLink>
          <NuxtLink 
            to="/admin/audit" 
            class="block px-4 py-2 text-gray-300 hover:bg-blue-600 hover:text-white"
          >
            Audit Log
          </NuxtLink>
        </nav>
      </div>
      
      <!-- Main Content -->
      <div class="flex-1 p-6">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // TypeScript setup if needed
  </script>