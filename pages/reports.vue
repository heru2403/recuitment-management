<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />

    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <Header />
      
      <!-- Main content - Reports -->
      <main class="flex-1 overflow-y-auto" :class="[sidebarCollapsed ? 'ml-16' : 'ml-64']">
        <div class="p-6 bg-white rounded-lg shadow m-4">
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
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'

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

export default defineComponent({
  name: 'ReportsManagementPage',
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