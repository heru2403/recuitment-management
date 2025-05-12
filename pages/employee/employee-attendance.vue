<template>
  <div class="employee-layout">
    <EmployeeSidebar :isOpen="sidebarOpen" />
    <EmployeeHeader @toggle-sidebar="toggleSidebar" />
    
    <main class="main-content ml-0 md:ml-64 pt-16 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 py-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div class="flex items-center mb-4 md:mb-0">
            <CalendarIcon class="w-10 h-10 text-gray-600 mr-3" />
            <div>
              <h1 class="text-2xl font-bold text-gray-800">Attendance Records</h1>
              <p class="text-gray-500">{{ currentMonth }} {{ currentYear }}</p>
            </div>
          </div>
          <div class="flex space-x-3">
            <button class="btn-outline flex items-center">
              <ArrowDownTrayIcon class="w-5 h-5 mr-2" />
              Export
            </button>
            <DatePicker v-model="selectedDate" />
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <AttendanceStatCard 
            title="Working Days" 
            :value="attendanceStats.workingDays" 
            :icon="CalendarDaysIcon"
            color="blue"
          />
          <AttendanceStatCard 
            title="Present" 
            :value="attendanceStats.present" 
            :icon="CheckCircleIcon"
            color="green"
          />
          <AttendanceStatCard 
            title="Late Arrivals" 
            :value="attendanceStats.late" 
            :icon="ClockIcon"
            color="yellow"
          />
          <AttendanceStatCard 
            title="Absent" 
            :value="attendanceStats.absent" 
            :icon="XCircleIcon"
            color="red"
          />
        </div>

        <!-- Calendar View -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <AttendanceCalendar :records="attendanceRecords" />
        </div>

        <!-- Detailed Records -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-800">Detailed Records</h3>
            <div class="relative">
              <select v-model="selectedFilter" class="select-input">
                <option value="all">All Status</option>
                <option value="present">Present Only</option>
                <option value="late">Late Only</option>
                <option value="absent">Absent Only</option>
              </select>
            </div>
          </div>
          <AttendanceTable :records="filteredRecords" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ArrowDownTrayIcon,
  CalendarIcon  
} from '@heroicons/vue/24/outline'
import EmployeeSidebar from '@/components/employee/EmployeeSidebar.vue'
import EmployeeHeader from '@/components/employee/EmployeeHeader.vue'
import AttendanceStatCard from '@/components/employee/attendance/AttendanceStatCard.vue'
import AttendanceCalendar from '@/components/employee/attendance/AttendanceCalendar.vue'
import AttendanceTable from '@/components/employee/attendance/AttendanceTable.vue'
import DatePicker from '@/components/employee/ui/DatePicker.vue'

interface AttendanceRecord {
  date: string
  day: string
  checkIn: string
  checkOut: string
  status: 'present' | 'late' | 'absent' | 'holiday'
  hours: string
  notes?: string
}

export default defineComponent({
  name: 'EmployeeAttendance',
  components: {
    EmployeeSidebar,
    EmployeeHeader,
    CalendarIcon,
    ArrowDownTrayIcon,
    CalendarDaysIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    AttendanceStatCard,
    AttendanceCalendar,
    AttendanceTable,
    DatePicker
  },
  setup() {
    const sidebarOpen = ref(true)
    const selectedDate = ref(new Date())
    const selectedFilter = ref('all')

    const currentMonth = computed(() => {
      return selectedDate.value.toLocaleString('default', { month: 'long' })
    })

    const currentYear = computed(() => {
      return selectedDate.value.getFullYear()
    })

    const attendanceStats = ref({
      workingDays: 22,
      present: 20,
      late: 2,
      absent: 0
    })

    const attendanceRecords = ref<AttendanceRecord[]>([
      {
        date: '2023-06-01',
        day: 'Thursday',
        checkIn: '08:15 AM',
        checkOut: '05:30 PM',
        status: 'present',
        hours: '8.5'
      },
      {
        date: '2023-06-15',
        day: 'Thursday',
        checkIn: '09:15 AM',
        checkOut: '06:00 PM',
        status: 'late',
        hours: '8.0',
        notes: 'Traffic jam'
      },
    ])

    const filteredRecords = computed(() => {
      if (selectedFilter.value === 'all') return attendanceRecords.value
      return attendanceRecords.value.filter(record => record.status === selectedFilter.value)
    })

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value
    }

    return {
      sidebarOpen,
      selectedDate,
      selectedFilter,
      currentMonth,
      currentYear,
      attendanceStats,
      attendanceRecords,
      filteredRecords,
      toggleSidebar,
      // Expose icons to template
      CalendarDaysIcon,
      CheckCircleIcon,
      ClockIcon,
      XCircleIcon
    }
  }
})
</script>