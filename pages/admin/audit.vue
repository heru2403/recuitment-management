<template>
  <div class="p-6">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Log Audit Sistem</h1>
        <p class="text-gray-600 mt-1">
          Catatan lengkap semua aktivitas sistem dalam 30 hari terakhir.
        </p>
      </div>
      <div class="mt-4 md:mt-0 flex space-x-3">
        <button
          @click="refreshData"
          class="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          :disabled="isLoading"
        >
          <i class="fas fa-sync-alt mr-2" :class="{ 'animate-spin': isLoading }"></i>
          Refresh
        </button>
        <div class="relative">
          <select
            v-model="filterType"
            class="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Semua Tipe</option>
            <option value="user">User</option>
            <option value="system">System</option>
            <option value="approval">Approval</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <i class="fas fa-chevron-down text-xs"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Section -->
    <div class="bg-white shadow rounded-lg p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
          <input
            type="date"
            v-model="startDate"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Akhir</label>
          <input
            type="date"
            v-model="endDate"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="filterStatus"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="all">Semua Status</option>
            <option value="success">Berhasil</option>
            <option value="pending">Pending</option>
            <option value="failed">Gagal</option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            @click="applyFilters"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Terapkan Filter
          </button>
        </div>
      </div>
    </div>

    <!-- Audit Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div v-if="isLoading" class="flex justify-center items-center p-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>

      <div v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waktu
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipe
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(log, index) in filteredLogs" :key="index" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDateTime(log.timestamp) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="typeBadgeClass(log.type)">
                    {{ getTypeText(log.type) }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                  {{ log.description }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ log.user || 'System' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="statusBadgeClass(log.status)">
                    {{ getStatusText(log.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="showDetail(log)"
                    class="text-blue-600 hover:text-blue-900 mr-3 focus:outline-none"
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr v-if="filteredLogs.length === 0">
                <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                  Tidak ada data log yang sesuai dengan filter
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Menampilkan
                <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                sampai
                <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span>
                dari
                <span class="font-medium">{{ totalItems }}</span>
                hasil
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  :class="{ 'cursor-not-allowed opacity-50': currentPage === 1 }"
                >
                  <span class="sr-only">Previous</span>
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="{
                    'z-10 bg-blue-50 border-blue-500 text-blue-600': currentPage === page,
                    'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': currentPage !== page
                  }"
                  class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  {{ page }}
                </button>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  :class="{ 'cursor-not-allowed opacity-50': currentPage === totalPages }"
                >
                  <span class="sr-only">Next</span>
                  <i class="fas fa-chevron-right"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="selectedLog" class="fixed inset-0 overflow-y-auto z-50">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full" :class="typeBadgeClass(selectedLog.type)">
                <i :class="typeIcon(selectedLog.type)" class="text-white"></i>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Detail Log Audit
                </h3>
                <div class="mt-4 grid grid-cols-1 gap-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Waktu</label>
                    <p class="mt-1 text-sm text-gray-900">
                      {{ formatDateTime(selectedLog.timestamp) }}
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Tipe</label>
                    <p class="mt-1 text-sm text-gray-900">
                      {{ getTypeText(selectedLog.type) }}
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">User</label>
                    <p class="mt-1 text-sm text-gray-900">
                      {{ selectedLog.user || 'System' }}
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <p class="mt-1 text-sm text-gray-900">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="statusBadgeClass(selectedLog.status)">
                        {{ getStatusText(selectedLog.status) }}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Deskripsi Lengkap</label>
                    <p class="mt-1 text-sm text-gray-900 whitespace-pre-line">
                      {{ selectedLog.description }}
                    </p>
                  </div>
                  <div v-if="selectedLog.details">
                    <label class="block text-sm font-medium text-gray-700">Detail Tambahan</label>
                    <pre class="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded overflow-auto max-h-40">{{ JSON.stringify(selectedLog.details, null, 2) }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="selectedLog = null"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Types
interface AuditLog {
  id: string
  type: 'user' | 'system' | 'approval'
  description: string
  timestamp: Date
  status: 'success' | 'pending' | 'failed'
  user?: string
  details?: any
}

// Data
const isLoading = ref(false)
const auditLogs = ref<AuditLog[]>([])
const selectedLog = ref<AuditLog | null>(null)

// Filter
const filterType = ref('all')
const filterStatus = ref('all')
const startDate = ref('')
const endDate = ref('')

// Pagination
const currentPage = ref(1)
const itemsPerPage = 10

// Methods
const fetchAuditLogs = async () => {
  isLoading.value = true
  try {
    // Simulate API call
    const response = await new Promise<AuditLog[]>((resolve) => {
      setTimeout(() => {
        const mockData: AuditLog[] = []
        const types: ('user' | 'system' | 'approval')[] = ['user', 'system', 'approval']
        const statuses: ('success' | 'pending' | 'failed')[] = ['success', 'pending', 'failed']
        const users = ['admin', 'user1', 'user2', 'user3', 'system']

        for (let i = 0; i < 50; i++) {
          const type = types[Math.floor(Math.random() * types.length)]
          const status = statuses[Math.floor(Math.random() * statuses.length)]
          const daysAgo = Math.floor(Math.random() * 30)
          const hoursAgo = Math.floor(Math.random() * 24)
          const minutesAgo = Math.floor(Math.random() * 60)
          
          mockData.push({
            id: `log-${i}`,
            type,
            status,
            user: type === 'system' ? undefined : users[Math.floor(Math.random() * users.length)],
            timestamp: new Date(Date.now() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000) - (minutesAgo * 60 * 1000)),
            description: getRandomDescription(type, status),
            details: Math.random() > 0.7 ? { 
              ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
              device: ['Desktop', 'Mobile', 'Tablet'][Math.floor(Math.random() * 3)],
              location: ['ID', 'US', 'SG', 'MY'][Math.floor(Math.random() * 4)]
            } : undefined
          })
        }

        // Sort by timestamp (newest first)
        resolve(mockData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()))
      }, 800)
    })
    
    auditLogs.value = response
  } catch (error) {
    console.error('Error fetching audit logs:', error)
    // You might want to show a toast notification here
  } finally {
    isLoading.value = false
  }
}

const getRandomDescription = (type: string, status: string): string => {
  const descriptions: Record<string, Record<string, string[]>> = {
    user: {
      success: [
        'User berhasil login',
        'Profil user diperbarui',
        'User baru terdaftar',
        'Password user diubah'
      ],
      pending: [
        'User mencoba login',
        'Permintaan reset password',
        'Verifikasi email pending'
      ],
      failed: [
        'Login gagal - password salah',
        'Registrasi gagal - email sudah terdaftar',
        'Gagal memperbarui profil'
      ]
    },
    system: {
      success: [
        'Backup database selesai',
        'Update sistem berhasil',
        'Pembersihan cache',
        'Maintenance rutin'
      ],
      pending: [
        'Proses backup sedang berjalan',
        'Update sistem dalam antrian'
      ],
      failed: [
        'Backup database gagal',
        'Update sistem error',
        'Gagal menghapus cache'
      ]
    },
    approval: {
      success: [
        'Permintaan cuti disetujui',
        'Perubahan role user disetujui',
        'Permintaan akses disetujui'
      ],
      pending: [
        'Permintaan cuti menunggu persetujuan',
        'Perubahan role dalam review',
        'Permintaan akses baru'
      ],
      failed: [
        'Permintaan cuti ditolak',
        'Perubahan role tidak disetujui',
        'Permintaan akses ditolak'
      ]
    }
  }

  const possibleDescriptions = descriptions[type][status] || ['Aktivitas tidak diketahui']
  return possibleDescriptions[Math.floor(Math.random() * possibleDescriptions.length)]
}

const refreshData = () => {
  currentPage.value = 1
  fetchAuditLogs()
}

const applyFilters = () => {
  currentPage.value = 1
}

const showDetail = (log: AuditLog) => {
  selectedLog.value = log
}

const formatDateTime = (date: Date) => {
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getTypeText = (type: string) => {
  const types: Record<string, string> = {
    user: 'User',
    system: 'System',
    approval: 'Approval'
  }
  return types[type] || type
}

const getStatusText = (status: string) => {
  const statuses: Record<string, string> = {
    success: 'Berhasil',
    pending: 'Pending',
    failed: 'Gagal'
  }
  return statuses[status] || status
}

const typeBadgeClass = (type: string) => {
  const classes: Record<string, string> = {
    user: 'bg-blue-100 text-blue-800',
    system: 'bg-purple-100 text-purple-800',
    approval: 'bg-yellow-100 text-yellow-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

const statusBadgeClass = (status: string) => {
  const classes: Record<string, string> = {
    success: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const typeIcon = (type: string) => {
  const icons: Record<string, string> = {
    user: 'fas fa-user',
    system: 'fas fa-cog',
    approval: 'fas fa-clock'
  }
  return icons[type] || 'fas fa-info-circle'
}

// Computed
const filteredLogs = computed(() => {
  let logs = auditLogs.value

  // Filter by type
  if (filterType.value !== 'all') {
    logs = logs.filter(log => log.type === filterType.value)
  }

  // Filter by status
  if (filterStatus.value !== 'all') {
    logs = logs.filter(log => log.status === filterStatus.value)
  }

  // Filter by date range
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value)
    const end = new Date(endDate.value)
    end.setHours(23, 59, 59, 999) // Include entire end day

    logs = logs.filter(log => {
      const logDate = new Date(log.timestamp)
      return logDate >= start && logDate <= end
    })
  }

  return logs
})

const totalItems = computed(() => filteredLogs.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = 1
  let end = totalPages.value

  if (totalPages.value > maxVisible) {
    start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
    end = start + maxVisible - 1

    if (end > totalPages.value) {
      end = totalPages.value
      start = end - maxVisible + 1
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredLogs.value.slice(start, end)
})

// Pagination methods
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

// Lifecycle
onMounted(() => {
  // Set default date range (last 7 days)
  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - 7)

  endDate.value = end.toISOString().split('T')[0]
  startDate.value = start.toISOString().split('T')[0]

  fetchAuditLogs()
})

definePageMeta({
  layout: 'admin',
  title: 'Log Audit'
})
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.bg-blue-100 {
  background-color: #dbeafe;
}
.text-blue-800 {
  color: #1e40af;
}
.bg-purple-100 {
  background-color: #e9d5ff;
}
.text-purple-800 {
  color: #5b21b6;
}
.bg-yellow-100 {
  background-color: #fef3c7;
}
.text-yellow-800 {
  color: #92400e;
}
.bg-green-100 {
  background-color: #d1fae5;
}
.text-green-800 {
  color: #065f46;
}
.bg-red-100 {
  background-color: #fee2e2;
}
.text-red-800 {
  color: #991b1b;
}
</style>