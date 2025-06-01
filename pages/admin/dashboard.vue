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
          class="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          :disabled="isLoading"
        >
          <i class="fas fa-sync-alt mr-2" :class="{'animate-spin': isLoading}"></i>
          {{ isLoading ? 'Memuat...' : 'Refresh Data' }}
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
        :loading="isLoading"
      />
      <DashboardCard 
        title="Karyawan Aktif" 
        :value="stats.activeEmployees" 
        icon="user-check"
        color="green"
        :change="stats.employeeChange"
        :loading="isLoading"
      />
      <DashboardCard 
        title="Pending Approval" 
        :value="stats.pendingApprovals" 
        icon="clock"
        color="yellow"
        :is-warning="true"
        :loading="isLoading"
      />
    </div>

    <!-- Recent Activity Section -->
    <div class="bg-white shadow rounded-lg p-6 mb-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">Aktivitas Terkini</h3>
        <NuxtLink 
          to="/admin/audit" 
          class="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
        >
          Lihat Semua
        </NuxtLink>
      </div>
      
      <div v-if="isLoadingActivities" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
      
      <ul v-else class="divide-y divide-gray-200">
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
                {{ getStatusText(activity.status) }}
              </span>
            </div>
          </div>
        </li>
        
        <li v-if="recentActivities.length === 0" class="py-4 text-center text-gray-500">
          Tidak ada aktivitas terbaru
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
const isLoading = ref(false)
const isLoadingActivities = ref(false)

// Methods
const fetchDashboardData = async () => {
  isLoading.value = true
  try {
    // Simulate API call with error handling
    const response = await new Promise<Stats>((resolve, reject) => {
      setTimeout(() => {
        // Simulate 10% chance of error for demo purposes
        if (Math.random() < 0.1) {
          reject(new Error('Gagal memuat data statistik'))
        } else {
          resolve({
            totalUsers: 124,
            activeEmployees: 98,
            pendingApprovals: 7,
            userChange: 5.2,
            employeeChange: -1.8
          })
        }
      }, 800)
    })
    
    stats.value = response
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    // You might want to show a toast notification here
  } finally {
    isLoading.value = false
  }
}

const fetchRecentActivities = async () => {
  isLoadingActivities.value = true
  try {
    // Simulate API call with error handling
    const response = await new Promise<Activity[]>((resolve, reject) => {
      setTimeout(() => {
        // Simulate 10% chance of error for demo purposes
        if (Math.random() < 0.1) {
          reject(new Error('Gagal memuat aktivitas terbaru'))
        } else {
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
            },
            {
              type: 'user',
              description: 'User "Jane Smith" memperbarui profil',
              timestamp: new Date(Date.now() - 1000 * 60 * 180),
              status: 'success'
            },
            {
              type: 'approval',
              description: 'Permintaan izin dari Budi ditolak',
              timestamp: new Date(Date.now() - 1000 * 60 * 240),
              status: 'failed'
            }
          ])
        }
      }, 1000)
    })
    
    recentActivities.value = response
  } catch (error) {
    console.error('Error fetching recent activities:', error)
    // You might want to show a toast notification here
  } finally {
    isLoadingActivities.value = false
  }
}

const refreshData = () => {
  fetchDashboardData()
  fetchRecentActivities()
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Baru saja'
  if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} jam yang lalu`
  
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
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

const getStatusText = (status: Activity['status']) => {
  const texts = {
    success: 'Berhasil',
    pending: 'Menunggu',
    failed: 'Gagal'
  }
  return texts[status]
}

// Lifecycle hooks
onMounted(() => {
  refreshData()
})

definePageMeta({
  layout: 'admin',
   // Ensure this middleware checks for admin role
  title: 'Dashboard Utama'
})
</script>

<style scoped>
  .animate-spin {
    animation: spin 1s linear infinite;
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
}

  .transition-colors {
    transition-property: color, background-color, border-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
</style>