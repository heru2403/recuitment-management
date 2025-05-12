<template>
  <header class="employee-header fixed top-0 right-0 left-0 md:left-64 h-16 bg-white border-b border-gray-100 shadow-sm z-40 flex items-center justify-between px-4 md:px-6 transition-all duration-300">
    <!-- Left section - Sidebar toggle and breadcrumbs -->
    <div class="flex items-center space-x-4">
      <!-- Mobile sidebar toggle -->
      <button 
        class="p-2 rounded-md hover:bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
        @click="$emit('toggle-sidebar')"
        aria-label="Toggle sidebar"
      >
        <Bars3Icon class="w-5 h-5" />
      </button>

      <!-- Breadcrumbs (optional) -->
      <nav class="hidden md:flex items-center text-sm">
        <ol class="flex items-center space-x-2">
          <li class="text-gray-500">Dashboard</li>
          <li>
            <ChevronRightIcon class="w-4 h-4 text-gray-400" />
          </li>
          <li class="text-primary-600 font-medium">Attendance</li>
        </ol>
      </nav>
    </div>

    <!-- Right section - User profile and notifications -->
    <div class="flex items-center space-x-4">
      <!-- Notification button -->
      <button 
        class="p-2 relative rounded-full hover:bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Notifications"
      >
        <BellIcon class="w-5 h-5" />
        <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      <!-- User profile dropdown -->
      <div class="relative">
        <button 
          @click="toggleProfileMenu"
          class="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
          aria-label="User menu"
        >
          <div class="relative">
            <img 
              src="https://randomuser.me/api/portraits/men/41.jpg" 
              class="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border-2 border-white shadow-sm"
              alt="User profile"
            >
            <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          <span class="hidden md:inline font-medium text-gray-700">John Doe</span>
          <ChevronDownIcon 
            class="w-4 h-4 text-gray-500 transition-transform duration-200"
            :class="{ 'transform rotate-180': isProfileMenuOpen }"
          />
        </button>

        <!-- Dropdown menu -->
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div 
            v-show="isProfileMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
            @click.outside="closeProfileMenu"
          >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <div class="border-t border-gray-100 my-1"></div>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  Bars3Icon, 
  ChevronDownIcon,
  ChevronRightIcon,
  BellIcon
} from '@heroicons/vue/24/outline'

const isProfileMenuOpen = ref(false)

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const closeProfileMenu = () => {
  isProfileMenuOpen.value = false
}
</script>

<style scoped>
.employee-header {
  transition: left 0.3s ease;
}

/* Add a smooth transition for the dropdown icon */
.rotate-enter-active, .rotate-leave-active {
  transition: transform 0.2s ease;
}
.rotate-enter-from, .rotate-leave-to {
  transform: rotate(180deg);
}
</style>