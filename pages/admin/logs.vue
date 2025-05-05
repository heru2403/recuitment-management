<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Log Sistem</h1>
  
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-4 border-b flex justify-between items-center">
          <div class="flex space-x-4">
            <select v-model="logLevel" class="border rounded px-3 py-2">
              <option value="all">Semua Level</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            <input type="date" v-model="dateFilter" class="border rounded px-3 py-2">
          </div>
          <button @click="exportLogs" class="btn-secondary">
            <DownloadIcon class="icon" /> Export
          </button>
        </div>
  
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left">Waktu</th>
              <th class="px-6 py-3 text-left">Level</th>
              <th class="px-6 py-3 text-left">Pesan</th>
              <th class="px-6 py-3 text-left">User</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in filteredLogs" :key="log.id">
              <td class="px-6 py-4">{{ formatDate(log.timestamp) }}</td>
              <td class="px-6 py-4">
                <span :class="logLevelClass(log.level)">
                  {{ log.level }}
                </span>
              </td>
              <td class="px-6 py-4">{{ log.message }}</td>
              <td class="px-6 py-4">{{ log.user || 'System' }}</td>
            </tr>
          </tbody>
        </table>
  
        <Pagination 
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="currentPage = $event"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  definePageMeta({
    middleware: 'role',
    layout: 'admin',
    requiredPermission: 'view_logs'
  })
  
  interface LogEntry {
    id: string
    timestamp: string
    level: 'info' | 'warning' | 'error'
    message: string
    user: string | null
  }
  
  const logs = ref<LogEntry[]>([])
  const logLevel = ref('all')
  const dateFilter = ref('')
  const currentPage = ref(1)
  const itemsPerPage = 10
  
  const logLevelClass = (level: string) => {
    return {
      'px-2 py-1 rounded-full text-xs': true,
      'bg-blue-100 text-blue-800': level === 'info',
      'bg-yellow-100 text-yellow-800': level === 'warning',
      'bg-red-100 text-red-800': level === 'error'
    }
  }
  
  const filteredLogs = computed(() => {
      let result = logs.value
      
      if (logLevel.value !== 'all') {
        result = result.filter(log => log.level === logLevel.value)
      }
      
      if (dateFilter.value) {
        result = result.filter(log => log.timestamp.startsWith(dateFilter.value))
      }
      
      return result.slice(
        (currentPage.value - 1) * itemsPerPage,
        currentPage.value * itemsPerPage
      )
    })
  
  const totalPages = computed(() => {
      return Math.ceil(logs.value.length / itemsPerPage)
    })
  
  const fetchLogs = async () => {
      // Replace with API call
      logs.value = [
        {
          id: '1',
          timestamp: new Date().toISOString(),
          level: 'info',
          message: 'Sistem dijalankan',
          user: null
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          level: 'warning',
          message: 'Percobaan login gagal',
          user: 'user@example.com'
        }
      ]
    }
  
  const exportLogs = () => {
      const csvContent = logs.value.map(log => 
        `${log.timestamp},${log.level},${log.message},${log.user || 'System'}`
      ).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'logs.csv';
      link.click();
      URL.revokeObjectURL(url);
    }
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust format as needed
  }
  
  onMounted(fetchLogs)

  definePageMeta({
  layout: 'admin',
  title: 'Manajemen Log',
  })
  </script>