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
      
      <!-- Main content - Reports -->
      <main class="flex-1 overflow-y-auto p-4" :class="{ 'ml-16': sidebarCollapsed, 'ml-64': !sidebarCollapsed }">
        <div class="p-6 bg-white rounded-lg shadow">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Laporan HRD</h2>
            <div class="flex space-x-3">
              <button 
                @click="exportReport"
                class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
              >
                <font-awesome-icon icon="file-export" class="mr-2" />
                Export
              </button>
            </div>
          </div>

          <div class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="border rounded-lg p-4">
              <h3 class="font-medium text-gray-900 mb-2">Laporan Karyawan</h3>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Jenis Laporan</label>
                <select v-model="employeeReport.type" class="w-full border rounded p-2">
                  <option value="all">Semua Karyawan</option>
                  <option value="byDepartment">Berdasarkan Departemen</option>
                  <option value="byPosition">Berdasarkan Jabatan</option>
                  <option value="byStatus">Berdasarkan Status</option>
                </select>
              </div>
              <div v-if="employeeReport.type === 'byDepartment'" class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Departemen</label>
                <select v-model="employeeReport.department" class="w-full border rounded p-2">
                  <option value="">Semua Departemen</option>
                  <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
                </select>
              </div>
              <div v-if="employeeReport.type === 'byPosition'" class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                <select v-model="employeeReport.position" class="w-full border rounded p-2">
                  <option value="">Semua Jabatan</option>
                  <option v-for="pos in positions" :key="pos" :value="pos">{{ pos }}</option>
                </select>
              </div>
              <div v-if="employeeReport.type === 'byStatus'" class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select v-model="employeeReport.status" class="w-full border rounded p-2">
                  <option value="Active">Aktif</option>
                  <option value="Terminated">Non-Aktif</option>
                </select>
              </div>
              <button 
                @click="generateEmployeeReport"
                class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Generate Laporan
              </button>
            </div>

            <div class="border rounded-lg p-4">
              <h3 class="font-medium text-gray-900 mb-2">Laporan Absensi</h3>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Bulan</label>
                <select v-model="attendanceReport.month" class="w-full border rounded p-2">
                  <option v-for="month in months" :key="month.value" :value="month.value">{{ month.label }}</option>
                </select>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Tahun</label>
                <select v-model="attendanceReport.year" class="w-full border rounded p-2">
                  <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                </select>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Departemen</label>
                <select v-model="attendanceReport.department" class="w-full border rounded p-2">
                  <option value="">Semua Departemen</option>
                  <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
                </select>
              </div>
              <button 
                @click="generateAttendanceReport"
                class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Generate Laporan
              </button>
            </div>

            <div class="border rounded-lg p-4">
              <h3 class="font-medium text-gray-900 mb-2">Laporan Penggajian</h3>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Bulan</label>
                <select v-model="payrollReport.month" class="w-full border rounded p-2">
                  <option v-for="month in months" :key="month.value" :value="month.value">{{ month.label }}</option>
                </select>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Tahun</label>
                <select v-model="payrollReport.year" class="w-full border rounded p-2">
                  <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                </select>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select v-model="payrollReport.status" class="w-full border rounded p-2">
                  <option value="">Semua Status</option>
                  <option value="draft">Draft</option>
                  <option value="processed">Diproses</option>
                  <option value="paid">Dibayar</option>
                </select>
              </div>
              <button 
                @click="generatePayrollReport"
                class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Generate Laporan
              </button>
            </div>
          </div>

          <div v-if="activeReport" class="border rounded-lg p-4">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium">{{ activeReport.title }}</h3>
              <div class="flex space-x-2">
                <button 
                  @click="printReport"
                  class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
                >
                  <font-awesome-icon icon="print" class="mr-1" /> Cetak
                </button>
                <button 
                  @click="downloadReport"
                  class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
                >
                  <font-awesome-icon icon="download" class="mr-1" /> Download
                </button>
              </div>
            </div>

            <div v-if="activeReport.type === 'employee'" class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departemen</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Bergabung</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="employee in employeeReportData" :key="employee.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.nik }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ employee.name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.department }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.position }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ employee.status === 'Active' ? 'Aktif' : 'Non-Aktif' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(employee.joinDate) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="activeReport.type === 'attendance'" class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departemen</th>
                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hadir</th>
                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Izin</th>
                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Sakit</th>
                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Alfa</th>
                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Persentase</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="att in attendanceReportData" :key="att.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ att.nik }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ att.name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ att.department }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{{ att.present }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{{ att.permission }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{{ att.sick }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{{ att.absent }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {{ calculateAttendancePercentage(att) }}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="activeReport.type === 'payroll'" class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departemen</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gaji Pokok</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tunjangan</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potongan</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="payroll in payrollReportData" :key="payroll.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ payroll.nik }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ payroll.name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ payroll.department }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatCurrency(payroll.basicSalary) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatCurrency(payroll.allowances) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatCurrency(payroll.deductions) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ formatCurrency(payroll.total) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="payrollStatusClass(payroll.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ payrollStatusText(payroll.status) }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="payrollReportData.length > 0" class="bg-gray-50 font-medium">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" colspan="3">Total</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(payrollReportData.reduce((sum, p) => sum + p.basicSalary, 0)) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(payrollReportData.reduce((sum, p) => sum + p.allowances, 0)) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(payrollReportData.reduce((sum, p) => sum + p.deductions, 0)) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(payrollReportData.reduce((sum, p) => sum + p.total, 0)) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap"></td>
                  </tr>
                </tbody>
              </table>
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

interface Employee {
  id: number
  nik: string
  name: string
  department: string
  position: string
  status: string
  joinDate: string
}

interface AttendanceReport {
  id: number
  nik: string
  name: string
  department: string
  present: number
  permission: number
  sick: number
  absent: number
}

interface PayrollReport {
  id: number
  nik: string
  name: string
  department: string
  basicSalary: number
  allowances: number
  deductions: number
  total: number
  status: string
}

interface Report {
  title: string
  type: string
  generatedAt: string
}

interface MenuItem {
  text: string
  to: string
  icon: string
}

export default defineComponent({
  name: 'ReportsManagementLayout',
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

    // Report data
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
    const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations']
    const positions = ['Manager', 'Supervisor', 'Staff', 'Intern']

    // Report forms
    const employeeReport = ref({
      type: 'all',
      department: '',
      position: '',
      status: 'Active'
    })

    const attendanceReport = ref({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      department: ''
    })

    const payrollReport = ref({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      status: ''
    })

    // Report data
    const activeReport = ref<Report | null>(null)
    const employeeReportData = ref<Employee[]>([])
    const attendanceReportData = ref<AttendanceReport[]>([])
    const payrollReportData = ref<PayrollReport[]>([])

    // Mock data
    const mockEmployees: Employee[] = [
      {
        id: 1,
        nik: 'EMP001',
        name: 'Budi Santoso',
        department: 'IT',
        position: 'Frontend Developer',
        status: 'Active',
        joinDate: '2020-05-15'
      },
      {
        id: 2,
        nik: 'EMP002',
        name: 'Ani Wijaya',
        department: 'HR',
        position: 'HR Manager',
        status: 'Active',
        joinDate: '2019-08-10'
      },
      {
        id: 3,
        nik: 'EMP003',
        name: 'Cahyo Pratama',
        department: 'Finance',
        position: 'Finance Staff',
        status: 'Active',
        joinDate: '2021-02-20'
      }
    ]

    const mockAttendance: AttendanceReport[] = [
      {
        id: 1,
        nik: 'EMP001',
        name: 'Budi Santoso',
        department: 'IT',
        present: 20,
        permission: 1,
        sick: 1,
        absent: 0
      },
      {
        id: 2,
        nik: 'EMP002',
        name: 'Ani Wijaya',
        department: 'HR',
        present: 18,
        permission: 2,
        sick: 0,
        absent: 2
      },
      {
        id: 3,
        nik: 'EMP003',
        name: 'Cahyo Pratama',
        department: 'Finance',
        present: 22,
        permission: 0,
        sick: 0,
        absent: 0
      }
    ]

    const mockPayroll: PayrollReport[] = [
      {
        id: 1,
        nik: 'EMP001',
        name: 'Budi Santoso',
        department: 'IT',
        basicSalary: 8000000,
        allowances: 2100000,
        deductions: 750000,
        total: 9350000,
        status: 'paid'
      },
      {
        id: 2,
        nik: 'EMP002',
        name: 'Ani Wijaya',
        department: 'HR',
        basicSalary: 12000000,
        allowances: 3100000,
        deductions: 1650000,
        total: 13450000,
        status: 'paid'
      },
      {
        id: 3,
        nik: 'EMP003',
        name: 'Cahyo Pratama',
        department: 'Finance',
        basicSalary: 7000000,
        allowances: 1850000,
        deductions: 650000,
        total: 8200000,
        status: 'paid'
      }
    ]

    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('id-ID', options)
    }

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
    }

    const calculateAttendancePercentage = (att: AttendanceReport) => {
      const totalDays = att.present + att.permission + att.sick + att.absent
      return totalDays > 0 ? Math.round((att.present / totalDays) * 100) : 0
    }

    const payrollStatusText = (status: string) => {
      const statusMap: Record<string, string> = {
        'draft': 'Draft',
        'processed': 'Diproses',
        'paid': 'Dibayar'
      }
      return statusMap[status] || status
    }

    const payrollStatusClass = (status: string) => {
      const classes: Record<string, string> = {
        'draft': 'bg-gray-100 text-gray-800',
        'processed': 'bg-yellow-100 text-yellow-800',
        'paid': 'bg-green-100 text-green-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }

    const generateEmployeeReport = () => {
      let result = [...mockEmployees]
      
      if (employeeReport.value.type === 'byDepartment' && employeeReport.value.department) {
        result = result.filter(e => e.department === employeeReport.value.department)
      }
      
      if (employeeReport.value.type === 'byPosition' && employeeReport.value.position) {
        result = result.filter(e => e.position === employeeReport.value.position)
      }
      
      if (employeeReport.value.type === 'byStatus') {
        result = result.filter(e => e.status === employeeReport.value.status)
      }
      
      employeeReportData.value = result
      activeReport.value = {
        title: `Laporan Karyawan - ${new Date().toLocaleDateString('id-ID')}`,
        type: 'employee',
        generatedAt: new Date().toISOString()
      }
    }

    const generateAttendanceReport = () => {
      let result = [...mockAttendance]
      
      if (attendanceReport.value.department) {
        result = result.filter(a => a.department === attendanceReport.value.department)
      }
      
      attendanceReportData.value = result
      const monthName = months.find(m => m.value === attendanceReport.value.month)?.label
      activeReport.value = {
        title: `Laporan Absensi ${monthName} ${attendanceReport.value.year}`,
        type: 'attendance',
        generatedAt: new Date().toISOString()
      }
    }

    const generatePayrollReport = () => {
      let result = [...mockPayroll]
      
      if (payrollReport.value.status) {
        result = result.filter(p => p.status === payrollReport.value.status)
      }
      
      payrollReportData.value = result
      const monthName = months.find(m => m.value === payrollReport.value.month)?.label
      activeReport.value = {
        title: `Laporan Penggajian ${monthName} ${payrollReport.value.year}`,
        type: 'payroll',
        generatedAt: new Date().toISOString()
      }
    }

    const exportReport = () => {
      if (!activeReport.value) return
      console.log(`Exporting ${activeReport.value.type} report...`)
      alert(`Laporan ${activeReport.value.title} telah diexport`)
    }

    const printReport = () => {
      if (!activeReport.value) return
      console.log(`Printing ${activeReport.value.type} report...`)
      alert(`Laporan ${activeReport.value.title} telah dicetak`)
    }

    const downloadReport = () => {
      if (!activeReport.value) return
      console.log(`Downloading ${activeReport.value.type} report...`)
      alert(`Laporan ${activeReport.value.title} telah didownload`)
    }

    return {
      sidebarCollapsed,
      toggleSidebar,
      menuItems,
      months,
      years,
      departments,
      positions,
      employeeReport,
      attendanceReport,
      payrollReport,
      activeReport,
      employeeReportData,
      attendanceReportData,
      payrollReportData,
      formatDate,
      formatCurrency,
      calculateAttendancePercentage,
      payrollStatusText,
      payrollStatusClass,
      generateEmployeeReport,
      generateAttendanceReport,
      generatePayrollReport,
      exportReport,
      printReport,
      downloadReport
    }
  }
})
</script>