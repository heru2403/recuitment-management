<template>
  <aside
    :class="[
      'fixed h-full bg-blue-800 text-white z-50 transition-all duration-300 overflow-hidden flex flex-col',
      collapsed ? 'w-16' : 'w-64'
    ]"
  >
    <!-- Header with toggle button -->
    <div
      class="flex items-center justify-between p-4 bg-blue-900 border-b border-blue-700"
      :class="{ 'justify-center': collapsed }"
    >
      <h4 v-if="!collapsed" class="text-xl font-bold">HRD Portal</h4>
      <button
        @click="$emit('toggle')"
        aria-label="Toggle sidebar"
        class="text-white focus:outline-none"
      >
        <svg
          v-if="collapsed"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="p-2 flex-1 overflow-y-auto">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.text">
          <NuxtLink
            :to="item.to"
            class="flex items-center p-3 rounded hover:bg-blue-700 transition-colors"
            :class="{ 'bg-blue-700': $route.path === item.to }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="item.icon === 'tachometer-alt'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              <path v-if="item.icon === 'user-plus'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              <path v-if="item.icon === 'users'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              <path v-if="item.icon === 'calendar-alt'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              <path v-if="item.icon === 'edit'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 3l4 4m-4-4l-4 4m4-4v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h8a2 2 0 012 2z" />
              <path v-if="item.icon === 'file-invoice-dollar'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
              <path v-if="item.icon === 'chart-bar'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span v-if="!collapsed" class="ml-3">{{ item.text }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Logout Button -->
    <div class="p-4 border-t border-blue-700 mt-auto">
      <button
        @click="logout"
        class="w-full flex items-center justify-center p-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span v-if="!collapsed" class="ml-3">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface MenuItem {
  text: string
  to: string
  icon: string
}

export default defineComponent({
  name: 'Sidebar',
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle'],
  setup() {
    const menuItems: MenuItem[] = [
      { text: 'Dashboard', to: '/dashboard-hrd', icon: 'tachometer-alt' },
      { text: 'Rekrutmen', to: '/recruitment', icon: 'user-plus' },
      { text: 'Karyawan', to: '/employees', icon: 'users' },
      { text: 'Absensi', to: '/attendance', icon: 'calendar-alt' },
      { text: 'Penggajian', to: '/payroll', icon: 'file-invoice-dollar' },
      { text: 'Computer Based Test', to: '/cbt', icon: 'edit' }, // Menu baru untuk CBT
      { text: 'Laporan', to: '/reports', icon: 'chart-bar' },
    ]

    const logout = async () => {
      try {
        localStorage.removeItem('token')
        window.location.href = '/login'
      } catch (error) {
        console.error('Logout error:', error)
      }
    }

    return {
      menuItems,
      logout
    }
  }
})
</script>