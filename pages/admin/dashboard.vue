<template>
  <div class="p-6">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p class="text-gray-600 mt-1">
          Anda login sebagai <span class="font-semibold text-blue-600">Admin</span> dengan akses penuh ke sistem.
          <span class="hidden md:inline-block ml-2 text-sm text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
            <i class="fas fa-circle-check mr-1"></i>Status: Aktif
          </span>
        </p>
      </div>
      <div class="mt-4 md:mt-0">
        <button 
          @click="refreshData"
          class="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <i class="fas fa-sync-alt mr-2"></i>
          Refresh Data
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <DashboardCard 
        title="Total User" 
        :value="stats.totalUsers" 
        icon="users"
        color="blue"
        :change="stats.userChange"
      />
      <DashboardCard 
        title="Karyawan Aktif" 
        :value="stats.activeEmployees" 
        icon="user-check"
        color="green"
        :change="stats.employeeChange"
      />
      <DashboardCard 
        title="Pending Approval" 
        :value="stats.pendingApprovals" 
        icon="clock"
        color="yellow"
        :is-warning="true"
      />
    </div>

    <!-- Recent Activity Section -->
    <div class="bg-white shadow rounded-lg p-6 mb-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">Aktivitas Terkini</h3>
        <NuxtLink 
          to="/admin/audit" 
          class="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          Lihat Semua
        </NuxtLink>
      </div>
      <ul class="divide-y divide-gray-200">
        <li v-for="(activity, index) in recentActivities" :key="index" class="py-3">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <span 
                class="h-8 w-8 rounded-full flex items-center justify-center"
                :class="activityIcon(activity.type).bg"
              >
                <i :class="activityIcon(activity.type).icon" class="text-white"></i>
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ activity.description }}
              </p>
              <p class="text-sm text-gray-500">
                {{ formatTime(activity.timestamp) }}
              </p>
            </div>
            <div>
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="activityStatusClass(activity.status)"
              >
                {{ activity.status }}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Types
interface Activity {
  type: 'user' | 'system' | 'approval'
  description: string
  timestamp: Date
  status: 'success' | 'pending' | 'failed'
}

interface Stats {
  totalUsers: number
  activeEmployees: number
  pendingApprovals: number
  userChange: number
  employeeChange: number
}

// Data
const stats = ref<Stats>({
  totalUsers: 0,
  activeEmployees: 0,
  pendingApprovals: 0,
  userChange: 0,
  employeeChange: 0
})

const recentActivities = ref<Activity[]>([])

// Methods
const fetchDashboardData = async () => {
  try {
    // Simulate API call
    const response = await new Promise<Stats>((resolve) => {
      setTimeout(() => {
        resolve({
          totalUsers: 124,
          activeEmployees: 98,
          pendingApprovals: 7,
          userChange: 5.2,
          employeeChange: -1.8
        })
      }, 500)
    })
    
    stats.value = response
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  }
}

const fetchRecentActivities = async () => {
  try {
    // Simulate API call
    const response = await new Promise<Activity[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            type: 'user',
            description: 'User baru "John Doe" terdaftar',
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
            status: 'success'
          },
          {
            type: 'approval',
            description: 'Permintaan cuti dari Sarah',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            status: 'pending'
          },
          {
            type: 'system',
            description: 'Backup database selesai',
            timestamp: new Date(Date.now() - 1000 * 60 * 120),
            status: 'success'
          }
        ])
      }, 500)
    })
    
    recentActivities.value = response
  } catch (error) {
    console.error('Error fetching recent activities:', error)
  }
}

const refreshData = () => {
  fetchDashboardData()
  fetchRecentActivities()
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const activityIcon = (type: Activity['type']) => {
  const icons = {
    user: { icon: 'fas fa-user', bg: 'bg-blue-500' },
    system: { icon: 'fas fa-cog', bg: 'bg-purple-500' },
    approval: { icon: 'fas fa-clock', bg: 'bg-yellow-500' }
  }
  return icons[type]
}

const activityStatusClass = (status: Activity['status']) => {
  const classes = {
    success: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  }
  return classes[status]
}

// Lifecycle hooks
onMounted(() => {
  fetchDashboardData()
  fetchRecentActivities()
})

definePageMeta({
  layout: 'admin',// Middleware to check user role
  title: 'Dashboard Utama' // This will appear in the header
})
</script>

<style scoped>
  .bg-blue-500 {
    background-color: #3b82f6;
  }
  .bg-green-500 {
    background-color: #10b981;
  }
  .bg-yellow-500 {
    background-color: #f59e0b;
  }
  .bg-purple-500 {
    background-color: #8b5cf6;
  }
  .bg-green-100 {
    background-color: #bbf7d0;
  } 
</style>
