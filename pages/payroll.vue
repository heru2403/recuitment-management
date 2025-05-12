<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />

    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <Header />
      
      <!-- Main content - Payroll Management -->
      <main class="flex-1 overflow-y-auto" :class="[sidebarCollapsed ? 'ml-16' : 'ml-64']">
        <div class="p-6 bg-white rounded-lg shadow m-4">
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
                    {{ formatCurrency(payroll.bpjsDeduction + payroll.taxDeduction + payroll.otherDeductions) }}
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
                <tr v-if="filteredPayroll.length === 0">
                  <td colspan="9" class="px-6 py-4 text-center text-sm text-gray-500">
                    Tidak ada data penggajian yang ditemukan
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
                  <h4 class="font-medium mb-3">Pendapatan</h4>
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
                  <h4 class="font-medium mb-3">Potongan</h4>
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
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'

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

export default defineComponent({
  name: 'PayrollManagementPage',
  components: {
    FontAwesomeIcon,
    Sidebar,
    Header
  },
  setup() {
    // Sidebar state
    const sidebarCollapsed = ref(false)
    const toggleSidebar = () => {
      sidebarCollapsed.value = !sidebarCollapsed.value
    }

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
      // ... (keep your existing payroll data)
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
          p.nik.toLowerCase().includes(query) ||
          p.position.toLowerCase().includes(query) ||
          p.department.toLowerCase().includes(query))
      }
      
      return result
    })

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount)
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
      const payroll = payrolls.value.find(p => p.id === id)
      if (payroll) {
        alert(`Mengedit data penggajian untuk ${payroll.name}`)
      }
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
      const payroll = payrolls.value.find(p => p.id === id)
      if (payroll) {
        alert(`Mencetak slip gaji untuk ${payroll.name}`)
      }
    }

    return {
      sidebarCollapsed,
      toggleSidebar,
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