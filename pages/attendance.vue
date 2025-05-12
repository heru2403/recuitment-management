<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />

    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <Header />
      
      <!-- Main content - Attendance Management -->
      <main class="flex-1 overflow-y-auto" :class="[sidebarCollapsed ? 'ml-16' : 'ml-64']">
        <div class="p-6 bg-white rounded-lg shadow m-4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Manajemen Absensi</h2>
            <div class="flex space-x-3">
              <button 
                @click="exportAttendance"
                class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
              >
                <font-awesome-icon icon="file-export" class="mr-2" />
                Export
              </button>
              <button 
                @click="showManualEntryModal = true"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
              >
                <font-awesome-icon icon="plus" class="mr-2" />
                Entri Manual
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
                <label class="block text-sm font-medium text-gray-700 mb-1">Departemen</label>
                <select v-model="selectedDepartment" class="border rounded p-2">
                  <option value="">Semua</option>
                  <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
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
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departemen</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hadir</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Izin</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Sakit</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Alfa</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="employee in filteredAttendance" :key="employee.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" :src="employee.photo || 'https://via.placeholder.com/40'" alt="">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ employee.name }}</div>
                        <div class="text-sm text-gray-500">{{ employee.position }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ employee.nik }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ employee.department }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {{ employee.attendance.present }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {{ employee.attendance.permission }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {{ employee.attendance.sick }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {{ employee.attendance.absent }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    <button @click="viewAttendanceDetail(employee.id)" class="text-blue-600 hover:text-blue-900">Detail</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Manual Entry Modal -->
          <div v-if="showManualEntryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
              <div class="p-4 border-b flex justify-between items-center">
                <h3 class="text-lg font-medium">Entri Absensi Manual</h3>
                <button @click="showManualEntryModal = false" class="text-gray-500 hover:text-gray-700">
                  <font-awesome-icon icon="times" />
                </button>
              </div>
              <div class="p-4">
                <form @submit.prevent="handleManualEntry">
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Karyawan</label>
                    <select v-model="manualEntry.employeeId" class="w-full border rounded p-2" required>
                      <option value="">Pilih Karyawan</option>
                      <option v-for="emp in employees" :key="emp.id" :value="emp.id">{{ emp.name }} ({{ emp.nik }})</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                    <input v-model="manualEntry.date" type="date" class="w-full border rounded p-2" required>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select v-model="manualEntry.status" class="w-full border rounded p-2" required>
                      <option value="present">Hadir</option>
                      <option value="permission">Izin</option>
                      <option value="sick">Sakit</option>
                      <option value="absent">Alfa</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
                    <textarea v-model="manualEntry.notes" class="w-full border rounded p-2" rows="3"></textarea>
                  </div>
                  <div class="mt-4 flex justify-end space-x-2">
                    <button @click="showManualEntryModal = false" type="button" class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
                      Batal
                    </button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Simpan
                    </button>
                  </div>
                </form>
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

interface Employee {
  id: number
  nik: string
  name: string
  department: string
  position: string
  photo?: string
}

interface AttendanceRecord {
  employeeId: number
  date: string
  status: 'present' | 'permission' | 'sick' | 'absent'
  notes?: string
}

interface EmployeeAttendance extends Employee {
  attendance: {
    present: number
    permission: number
    sick: number
    absent: number
  }
}

export default defineComponent({
  name: 'AttendanceManagementPage',
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

    // Attendance data
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
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i)
    const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations']

    const employees = ref<Employee[]>([
      {
        id: 1,
        nik: 'EMP001',
        name: 'Budi Santoso',
        department: 'IT',
        position: 'Frontend Developer',
        photo: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      {
        id: 2,
        nik: 'EMP002',
        name: 'Ani Wijaya',
        department: 'HR',
        position: 'HR Manager',
        photo: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      {
        id: 3,
        nik: 'EMP003',
        name: 'Cahyo Pratama',
        department: 'Finance',
        position: 'Finance Staff',
        photo: 'https://randomuser.me/api/portraits/men/2.jpg'
      }
    ])

    const attendanceRecords = ref<AttendanceRecord[]>([
      { employeeId: 1, date: '2023-05-01', status: 'present' },
      { employeeId: 1, date: '2023-05-02', status: 'present' },
      { employeeId: 1, date: '2023-05-03', status: 'sick', notes: 'Surat dokter terlampir' },
      { employeeId: 2, date: '2023-05-01', status: 'present' },
      { employeeId: 2, date: '2023-05-02', status: 'permission', notes: 'Acara keluarga' },
      { employeeId: 3, date: '2023-05-01', status: 'present' },
      { employeeId: 3, date: '2023-05-02', status: 'present' },
      { employeeId: 3, date: '2023-05-03', status: 'present' }
    ])

    const selectedMonth = ref(new Date().getMonth() + 1)
    const selectedYear = ref(new Date().getFullYear())
    const selectedDepartment = ref('')
    const searchQuery = ref('')
    const showManualEntryModal = ref(false)

    const manualEntry = ref({
      employeeId: '',
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      notes: ''
    })

    const filteredAttendance = computed<EmployeeAttendance[]>(() => {
      // Filter employees based on search and department
      let filteredEmps = employees.value
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filteredEmps = filteredEmps.filter(e => 
          e.name.toLowerCase().includes(query) || 
          e.nik.toLowerCase().includes(query))
      }
      
      if (selectedDepartment.value) {
        filteredEmps = filteredEmps.filter(e => e.department === selectedDepartment.value)
      }
      
      // Calculate attendance for each employee
      return filteredEmps.map(emp => {
        const monthRecords = attendanceRecords.value.filter(record => {
          const recordDate = new Date(record.date)
          return (
            record.employeeId === emp.id &&
            recordDate.getMonth() + 1 === selectedMonth.value &&
            recordDate.getFullYear() === selectedYear.value
          )
        })
        
        return {
          ...emp,
          attendance: {
            present: monthRecords.filter(r => r.status === 'present').length,
            permission: monthRecords.filter(r => r.status === 'permission').length,
            sick: monthRecords.filter(r => r.status === 'sick').length,
            absent: monthRecords.filter(r => r.status === 'absent').length
          }
        }
      })
    })

    const exportAttendance = () => {
      console.log('Exporting attendance data...')
      alert('Data absensi telah diexport')
    }

    const viewAttendanceDetail = (employeeId: number) => {
      console.log('View attendance detail for:', employeeId)
    }

    const handleManualEntry = () => {
      attendanceRecords.value.push({
        employeeId: Number(manualEntry.value.employeeId),
        date: manualEntry.value.date,
        status: manualEntry.value.status as any,
        notes: manualEntry.value.notes
      })
      
      showManualEntryModal.value = false
      manualEntry.value = {
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'present',
        notes: ''
      }
    }

    return {
      sidebarCollapsed,
      toggleSidebar,
      months,
      years,
      departments,
      employees,
      selectedMonth,
      selectedYear,
      selectedDepartment,
      searchQuery,
      filteredAttendance,
      showManualEntryModal,
      manualEntry,
      exportAttendance,
      viewAttendanceDetail,
      handleManualEntry
    }
  }
})
</script>