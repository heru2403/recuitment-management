<template>
  <aside
    :class="[
      'fixed h-full bg-blue-800 text-white z-50 transition-all duration-300 overflow-hidden',
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
        @click="toggleSidebar"
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
    <nav class="p-2">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.text">
          <NuxtLink
            :to="item.to"
            class="flex items-center p-3 rounded hover:bg-blue-700 transition-colors"
            :class="{ 'bg-blue-700': $route.path === item.to }"
          >
            <FontAwesomeIcon :icon="item.icon" class="w-5" />
            <span v-if="!collapsed" class="ml-3">{{ item.text }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { MenuItem } from '~/types/dashboard'

export default defineComponent({
  name: 'Sidebar',
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const menuItems: MenuItem[] = [
      { text: 'Dashboard', to: '/dashboard-hrd', icon: 'tachometer-alt' },
      { text: 'Rekrutmen', to: '/recruitment', icon: 'user-plus' },
      { text: 'Karyawan', to: '/employees', icon: 'users' },
      { text: 'Absensi', to: '/attendance', icon: 'calendar-alt' },
      { text: 'Penggajian', to: '/payroll', icon: 'file-invoice-dollar' },
      { text: 'Laporan', to: '/reports', icon: 'chart-bar' },
      { text: 'Logout', to: '/Logout', icon: 'sign-out-alt' },
    ]

    const toggleSidebar = () => {
      emit('toggle')
    }

    return {
      menuItems,
      toggleSidebar
    }
  },
})
</script>