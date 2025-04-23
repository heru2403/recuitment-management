<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed h-full bg-blue-800 text-white z-50 transition-all duration-300 overflow-hidden',
        sidebarCollapsed ? 'w-16' : 'w-64'
      ]"
    >
      <!-- Header with toggle button -->
      <div
        class="flex items-center justify-between p-4 bg-blue-900 border-b border-blue-700"
        :class="{ 'justify-center': sidebarCollapsed }"
      >
        <h4 v-if="!sidebarCollapsed" class="text-xl font-bold">HRD Portal</h4>
        <button
          @click="toggleSidebar"
          aria-label="Toggle sidebar"
          class="text-white focus:outline-none"
        >
          <svg
            v-if="sidebarCollapsed"
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
              <font-awesome-icon :icon="item.icon" class="w-5" />
              <span v-if="!sidebarCollapsed" class="ml-3">{{ item.text }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="flex items-center justify-end px-4 py-3 sm:px-6 lg:px-8">
          <div class="flex items-center space-x-4">
            <!-- Notification -->
            <button class="p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
              <span class="sr-only">Notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            
            <!-- User Profile -->
            <div class="flex items-center">
              <div class="ml-3 relative">
                <div class="flex items-center">
                  <img
                    class="h-8 w-8 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User profile"
                  />
                  <span class="ml-2 text-sm font-medium text-gray-700">Admin HRD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Main content - Payroll Management -->
      <main class="flex-1 overflow-y-auto p-4" :class="{ 'ml-16': sidebarCollapsed, 'ml-64': !sidebarCollapsed }">
        <div class="p-6 bg-white rounded-lg shadow">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Manajemen Penggajian</h2>
            <div class="flex space-x-3">
              <button 
                @click="generatePayroll"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
              >
                <font-awesome-icon icon="calculator" class="mr-2" />
                Generate Payroll
              </button>
              <button 
                @click="exportPayroll"
                class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
              >
                <font-awesome-icon icon="file-export" class="mr-2" />
                Export
              </button>
            </div>
          </div>

          <div class="mb-4 flex justify-between items-center">
            <div class="flex space-x-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Bulan</label>
                <select v-model="selectedMonth" class="border rounded p-2">
                  <option v-for="month in months" :key="month.value" :value="month.value">{{ month.label }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tahun</label>
                <select v-model="selectedYear" class="border rounded p-2">
                  <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select v-model="selectedStatus" class="border rounded p-2">
                  <option value="">Semua</option>
                  <option value="draft">Draft</option>
                  <option value="processed">Diproses</option>
                  <option value="paid">Dibayar</option>
                </select>
              </div>
            </div>
            <div class="relative w-64">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Cari karyawan..." 
                class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <font-awesome-icon icon="search" class="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Karyawan</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gaji Pokok</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tunjangan</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potongan</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="payroll in filteredPayroll" :key="payroll.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" :src="payroll.photo || 'https://via.placeholder.com/40'" alt="">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ payroll.name }}</div>
                        <div class="text-sm text-gray-500">{{ payroll.department }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ payroll.nik }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ payroll.position }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatCurrency(payroll.basicSalary) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatCurrency(payroll.positionAllowance + payroll.transportAllowance + payroll.mealAllowance) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatCurrency(payroll.taxDeduction) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ formatCurrency(payroll.total) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="statusClass(payroll.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ payrollStatus(payroll.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button @click="viewPayroll(payroll.id)" class="text-blue-600 hover:text-blue-900 mr-3">Detail</button>
                    <button @click="editPayroll(payroll.id)" class="text-yellow-600 hover:text-yellow-900">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Payroll Detail Modal -->
          <div v-if="selectedPayroll" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl">
              <div class="p-4 border-b flex justify-between items-center">
                <h3 class="text-lg font-medium">Detail Penggajian</h3>
                <button @click="selectedPayroll = null" class="text-gray-500 hover:text-gray-700">
                  <font-awesome-icon icon="times" />
                </button>
              </div>
              <div class="p-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 class="font-medium text-gray-900">{{ selectedPayroll.name }}</h4>
                    <p class="text-sm text-gray-500">{{ selectedPayroll.position }}</p>
                    <p class="text-sm text-gray-500">{{ selectedPayroll.department }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-500">Periode: {{ selectedPayroll.period }}</p>
                    <p class="text-sm text-gray-500">NIK: {{ selectedPayroll.nik }}</p>
                    <p class="text-sm text-gray-500">Status: 
                      <span :class="statusClass(selectedPayroll.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ payrollStatus(selectedPayroll.status) }}
                      </span>
                    </p>
                  </div>
                </div>

                <div class="border-t border-b py-4 my-4">
                  <div class="flex justify-between mb-2">
                    <span>Gaji Pokok:</span>
                    <span>{{ formatCurrency(selectedPayroll.basicSalary) }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span>Tunjangan Jabatan:</span>
                    <span>{{ formatCurrency(selectedPayroll.positionAllowance) }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span>Tunjangan Transport:</span>
                    <span>{{ formatCurrency(selectedPayroll.transportAllowance) }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span>Tunjangan Makan:</span>
                    <span>{{ formatCurrency(selectedPayroll.mealAllowance) }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span>Lembur:</span>
                    <span>{{ formatCurrency(selectedPayroll.overtime) }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span>Bonus:</span>
                    <span>{{ formatCurrency(selectedPayroll.bonus) }}</span>
                  </div>
                </div>

                <div class="border-b py-4 my-4">
                  <div class="flex justify-between mb-2">
                    <span>Potongan BPJS:</span>
                    <span class="text-red-600">-{{ formatCurrency(selectedPayroll.bpjsDeduction) }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span>Potongan Pajak:</span>
                    <span class="text-red-600">-{{ formatCurrency(selectedPayroll.taxDeduction) }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span>Potongan Lainnya:</span>
                    <span class="text-red-600">-{{ formatCurrency(selectedPayroll.otherDeductions) }}</span>
                  </div>
                </div>

                <div class="flex justify-between font-bold text-lg">
                  <span>Total Gaji:</span>
                  <span>{{ formatCurrency(selectedPayroll.total) }}</span>
                </div>
              </div>
              <div class="p-4 border-t flex justify-end">
                <button 
                  v-if="selectedPayroll.status === 'draft'"
                  @click="processPayroll(selectedPayroll.id)"
                  class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                >
                  Proses Pembayaran
                </button>
                <button 
                  @click="printPayroll(selectedPayroll.id)"
                  class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mr-2"
                >
                  Cetak Slip Gaji
                </button>
                <button 
                  @click="selectedPayroll = null"
                  class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

interface Payroll {
  id: number
  nik: string
  name: string
  department: string
  position: string
  period: string
  basicSalary: number
  positionAllowance: number
  transportAllowance: number
  mealAllowance: number
  overtime: number
  bonus: number
  bpjsDeduction: number
  taxDeduction: number
  otherDeductions: number
  total: number
  status: 'draft' | 'processed' | 'paid'
  photo?: string
}

interface MenuItem {
  text: string
  to: string
  icon: string
}

export default defineComponent({
  name: 'PayrollManagementLayout',
  components: {
    FontAwesomeIcon
  },
  setup() {
    // Sidebar state
    const sidebarCollapsed = ref(false)
    const toggleSidebar = () => {
      sidebarCollapsed.value = !sidebarCollapsed.value
    }

    // Menu items
    const menuItems: MenuItem[] = [
      { text: 'Dashboard', to: '/dashboard-hrd', icon: 'tachometer-alt' },
      { text: 'Rekrutmen', to: '/recruitment', icon: 'user-plus' },
      { text: 'Karyawan', to: '/employees', icon: 'users' },
      { text: 'Absensi', to: '/attendance', icon: 'calendar-alt' },
      { text: 'Penggajian', to: '/payroll', icon: 'file-invoice-dollar' },
      { text: 'Laporan', to: '/reports', icon: 'chart-bar' },
      { text: 'Logout', to: '/logout', icon: 'sign-out-alt' },
    ]

    // Payroll data
    const months = [
      { value: 1, label: 'Januari' },
      { value: 2, label: 'Februari' },
      { value: 3, label: 'Maret' },
      { value: 4, label: 'April' },
      { value: 5, label: 'Mei' },
      { value: 6, label: 'Juni' },
      { value: 7, label: 'Juli' },
      { value: 8, label: 'Agustus' },
      { value: 9, label: 'September' },
      { value: 10, label: 'Oktober' },
      { value: 11, label: 'November' },
      { value: 12, label: 'Desember' }
    ]

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 3 }, (_, i) => currentYear - i)
    
    const payrolls = ref<Payroll[]>([
      {
        id: 1,
        nik: 'EMP001',
        name: 'Budi Santoso',
        department: 'IT',
        position: 'Frontend Developer',
        period: 'Mei 2023',
        basicSalary: 8000000,
        positionAllowance: 1000000,
        transportAllowance: 500000,
        mealAllowance: 600000,
        overtime: 750000,
        bonus: 0,
        bpjsDeduction: 300000,
        taxDeduction: 450000,
        otherDeductions: 0,
        total: 10100000,
        status: 'paid',
        photo: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      {
        id: 2,
        nik: 'EMP002',
        name: 'Ani Wijaya',
        department: 'HR',
        position: 'HR Manager',
        period: 'Mei 2023',
        basicSalary: 12000000,
        positionAllowance: 1500000,
        transportAllowance: 500000,
        mealAllowance: 600000,
        overtime: 0,
        bonus: 1000000,
        bpjsDeduction: 450000,
        taxDeduction: 1200000,
        otherDeductions: 0,
        total: 13800000,
        status: 'paid',
        photo: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      {
        id: 3,
        nik: 'EMP003',
        name: 'Cahyo Pratama',
        department: 'Finance',
        position: 'Finance Staff',
        period: 'Mei 2023',
        basicSalary: 7000000,
        positionAllowance: 750000,
        transportAllowance: 500000,
        mealAllowance: 600000,
        overtime: 250000,
        bonus: 0,
        bpjsDeduction: 300000,
        taxDeduction: 350000,
        otherDeductions: 0,
        total: 8850000,
        status: 'processed',
        photo: 'https://randomuser.me/api/portraits/men/2.jpg'
      }
    ])

    const selectedMonth = ref(new Date().getMonth() + 1)
    const selectedYear = ref(new Date().getFullYear())
    const selectedStatus = ref('')
    const searchQuery = ref('')
    const selectedPayroll = ref<Payroll | null>(null)

    const filteredPayroll = computed(() => {
      let result = payrolls.value
      
      // Filter by period (month and year)
      const periodFilter = `${months.find(m => m.value === selectedMonth.value)?.label} ${selectedYear.value}`
      result = result.filter(p => p.period === periodFilter)
      
      // Filter by status
      if (selectedStatus.value) {
        result = result.filter(p => p.status === selectedStatus.value)
      }
      
      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.nik.toLowerCase().includes(query))
      }
      
      return result
    })

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
    }

    const payrollStatus = (status: string) => {
      const statusMap: Record<string, string> = {
        'draft': 'Draft',
        'processed': 'Diproses',
        'paid': 'Dibayar'
      }
      return statusMap[status] || status
    }

    const statusClass = (status: string) => {
      const classes: Record<string, string> = {
        'draft': 'bg-gray-100 text-gray-800',
        'processed': 'bg-yellow-100 text-yellow-800',
        'paid': 'bg-green-100 text-green-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }

    const generatePayroll = () => {
      alert('Payroll untuk periode terpilih telah digenerate')
    }

    const exportPayroll = () => {
      console.log('Exporting payroll data...')
      alert('Data penggajian telah diexport')
    }

    const viewPayroll = (id: number) => {
      const payroll = payrolls.value.find(p => p.id === id)
      if (payroll) {
        selectedPayroll.value = { ...payroll }
      }
    }

    const editPayroll = (id: number) => {
      console.log('Edit payroll:', id)
    }

    const processPayroll = (id: number) => {
      const index = payrolls.value.findIndex(p => p.id === id)
      if (index !== -1) {
        payrolls.value[index].status = 'processed'
        if (selectedPayroll.value) {
          selectedPayroll.value.status = 'processed'
        }
        alert('Payroll telah diproses untuk pembayaran')
      }
    }

    const printPayroll = (id: number) => {
      console.log('Printing payroll slip for:', id)
      alert('Slip gaji telah dicetak')
    }

    return {
      sidebarCollapsed,
      toggleSidebar,
      menuItems,
      months,
      years,
      payrolls,
      selectedMonth,
      selectedYear,
      selectedStatus,
      searchQuery,
      filteredPayroll,
      selectedPayroll,
      formatCurrency,
      payrollStatus,
      statusClass,
      generatePayroll,
      exportPayroll,
      viewPayroll,
      editPayroll,
      processPayroll,
      printPayroll
    }
  }
})
</script>