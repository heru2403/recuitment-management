<template>
  <div class="employee-sidebar fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white z-50 shadow-xl transition-all duration-300"
       :class="{ '-ml-64': !isOpen }">
    <div class="sidebar-header p-6 border-b border-gray-700 flex items-center space-x-3">
      <div class="p-2 bg-white/10 rounded-lg">
        <BuildingOfficeIcon class="w-6 h-6 text-white" />
      </div>
      <h4 class="text-xl font-bold tracking-tight text-white">EMPLOYEE PORTAL</h4>
    </div>
    <div class="sidebar-menu py-4 px-2 h-[calc(100vh-80px)] overflow-y-auto">
      <NuxtLink 
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        class="flex items-center px-4 py-3 rounded-lg mx-2 mb-1 transition-all duration-200 hover:bg-gray-700 group"
        :class="{ 'bg-gray-700 shadow-md': $route.path === item.path }"
      >
        <component :is="item.icon" class="w-5 h-5 mr-3 text-gray-300 group-hover:text-white" 
                  :class="{ 'text-white': $route.path === item.path }" />
        <span class="font-medium text-gray-300 group-hover:text-white"
              :class="{ 'text-white': $route.path === item.path }">{{ item.name }}</span>
        <ChevronRightIcon class="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
      </NuxtLink>
      
      <div class="border-t border-gray-700 mt-4 pt-4 mx-4">
        <button @click="handleLogout" class="flex w-full items-center px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-700 group">
          <ArrowRightOnRectangleIcon class="w-5 h-5 mr-3 text-red-400 group-hover:text-red-300" />
          <span class="font-medium text-red-400 group-hover:text-red-300">Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  ChartBarSquareIcon,
  UserIcon,
  CalendarIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
  BuildingOfficeIcon
} from '@heroicons/vue/24/outline'

export default defineComponent({
  name: 'EmployeeSidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const menuItems = [
      {
        name: 'Dashboard',
        path: '/employee/employee-dashboard',
        icon: ChartBarSquareIcon
      },
      {
        name: 'My Profile',
        path: '/employee/employee-profile',
        icon: UserIcon
      },
      {
        name: 'Attendance',
        path: '/employee/employee-attendance',
        icon: CalendarIcon
      },
      {
        name: 'Leave',
        path: '/employee/employee-leave',
        icon: PaperAirplaneIcon
      },
      {
        name: 'Payroll',
        path: '/employee/employee-payroll',
        icon: DocumentTextIcon
      },
      {
        name: 'Tasks',
        path: '/employee/employee-tasks',
        icon: CheckCircleIcon
      }
    ]

    const handleLogout = () => {
      router.push('/login')
    }

    return {
      menuItems,
      handleLogout
    }
  }
})
</script>

<style scoped>
.employee-sidebar {
  backdrop-filter: blur(10px);
}

.sidebar-menu::-webkit-scrollbar {
  width: 4px;
}

.sidebar-menu::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}
</style>