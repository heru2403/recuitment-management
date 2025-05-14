<template>
  <aside class="w-64 min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col shadow-xl">
    <!-- Brand/Header Section -->
    <div class="p-4 border-b border-gray-700 flex items-center justify-between bg-gray-900">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-indigo-600 rounded-lg shadow">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 class="text-xl font-bold tracking-wide">Admin<span class="text-indigo-400">Pro</span></h1>
      </div>
      <button @click="toggleCollapse" class="text-gray-400 hover:text-white transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>

    <!-- User Profile -->
    <div class="p-4 border-b border-gray-700 flex items-center space-x-3 bg-gray-800 bg-opacity-50">
      <div class="relative">
        <img class="w-10 h-10 rounded-full border-2 border-indigo-500 shadow" src="https://randomuser.me/api/portraits/men/75.jpg" alt="Super Admin">
        <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
      </div>
      <div>
        <p class="font-medium">Super Admin</p>
        <p class="text-xs text-gray-300">admin@example.com</p>
      </div>
    </div>

    <!-- Main Navigation -->
    <nav class="flex-1 overflow-y-auto py-4">
      <!-- Dashboard Section -->
      <div class="px-4 mb-6">
        <h3 class="text-xs uppercase font-semibold text-gray-400 mb-3 tracking-wider">Main Menu</h3>
        <ul class="space-y-2">
          <li>
            <NuxtLink 
              to="/admin/dashboard" 
              class="flex items-center px-3 py-2.5 text-sm rounded-lg transition-all"
              :class="isActive('/admin/dashboard') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
              <span v-if="isActive('/admin/dashboard')" class="ml-auto w-2 h-2 bg-indigo-300 rounded-full"></span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- System Management -->
      <div class="px-4 mb-6">
        <h3 class="text-xs uppercase font-semibold text-gray-400 mb-3 tracking-wider">Manajemen Sistem</h3>
        <ul class="space-y-2">
          <!-- In your AdminSidebar.vue -->
          <li>
            <NuxtLink 
              to="/admin/users" 
              class="flex items-center px-3 py-2.5 text-sm rounded-lg transition-all"
              :class="isActive('/admin/users') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              Manajemen User
              <span v-if="pendingUsers > 0" class="ml-auto px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
                {{ pendingUsers }}
              </span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/admin/roles" 
              class="flex items-center px-3 py-2.5 text-sm rounded-lg transition-all"
              :class="isActive('/admin/roles') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
              </svg>
              Manajemen Role
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/admin/permissions" 
              class="flex items-center px-3 py-2.5 text-sm rounded-lg transition-all"
              :class="isActive('/admin/permissions') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
              Izin Akses
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Content Management -->
      <div class="px-4 mb-6">
        <h3 class="text-xs uppercase font-semibold text-gray-400 mb-3 tracking-wider">Konten</h3>
        <ul class="space-y-2">
          <li>
            <NuxtLink 
              to="/admin/pages" 
              class="flex items-center px-3 py-2.5 text-sm rounded-lg transition-all"
              :class="isActive('/admin/pages') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              Halaman
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/admin/media" 
              class="flex items-center px-3 py-2.5 text-sm rounded-lg transition-all"
              :class="isActive('/admin/media') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              Media Library
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/admin/menus" 
              class="flex items-center px-3 py-2.5 text-sm rounded-lg transition-all"
              :class="isActive('/admin/menus') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              Manajemen Menu
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- System Tools -->
      <div class="px-4 mb-6">
        <h3 class="text-xs uppercase font-semibold text-gray-400 mb-3 tracking-wider">Alat Sistem</h3>
        <ul class="space-y-2">
          <li>
            <NuxtLink 
              to="/admin/settings" 
              class="flex items-center px-3 py-2.5 text-sm rounded-lg transition-all"
              :class="isActive('/admin/settings') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Pengaturan Sistem
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/admin/backup" 
              class="flex items-center px-3 py-2.5 text-sm rounded-lg transition-all"
              :class="isActive('/admin/backup') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
              Backup & Restore
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/admin/logs" 
              class="flex items-center px-3 py-2.5 text-sm rounded-lg transition-all"
              :class="isActive('/admin/logs') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              Log Sistem
              <span v-if="errorLogs > 0" class="ml-auto px-2 py-0.5 text-xs rounded-full bg-yellow-500 text-white">{{ errorLogs }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Tambahkan di bagian navigasi -->
<div class="px-4 mb-6">
  <h3 class="text-xs uppercase font-semibold text-gray-400 mb-3 tracking-wider">CBT</h3>
  <ul class="space-y-2">
    <li>
      <NuxtLink 
        to="/admin/cbt" 
        class="flex items-center px-3 py-2.5 text-sm rounded-lg transition-all"
        :class="isActive('/admin/cbt') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
      >
        <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5h6a2 2 0 012 2v12a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2zm0 0V3a2 2 0 012-2h2a2 2 0 012 2v2" />
        </svg>
        CBT
      </NuxtLink>
    </li>
  </ul>
</div>

    </nav>



    <!-- Bottom Section -->
    <div class="p-4 border-t border-gray-700 mt-auto">
      <button 
        @click="logout"
        class="w-full flex items-center justify-center px-3 py-2.5 text-sm rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-all"
      >
        <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        Keluar
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const isCollapsed = ref(false)
const pendingUsers = ref(3)
const errorLogs = ref(2)

const isActive = (path: string) => {
  return route.path.startsWith(path)
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const logout = () => {
  // Logic logout
  router.push('/login')
}
</script>

<style scoped>
aside {
  transition: all 0.3s ease;
}

.router-link-active:not(.exact-active) {
  @apply bg-gray-700 text-white;
}

.exact-active {
  @apply bg-indigo-600 text-white shadow-md;
}
</style>