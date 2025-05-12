<template>
  <div>
    <EmployeeSidebar :isOpen="sidebarOpen" />
    <EmployeeHeader @toggle-sidebar="toggleSidebar" />
    
    <main class="main-content ml-0 md:ml-64 pt-16 min-h-screen p-6 bg-gray-50 transition-all duration-300">
      <div class="container mx-auto">
        <h2 class="text-2xl font-bold mb-6 flex items-center">
          <ChartBarSquareIcon class="w-6 h-6 mr-2 text-green-500" />
          Dashboard Karyawan
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div class="lg:col-span-1">
            <EmployeeProfileCard />
            <EmployeeLeaveInfoCard />
          </div>
          
          <div class="lg:col-span-3">
            <EmployeeTaskListCard />
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <EmployeeAttendanceCard />
              <EmployeeAnnouncementCard />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ChartBarSquareIcon } from '@heroicons/vue/24/outline'
import EmployeeSidebar from '~/components/employee/EmployeeSidebar.vue'
import EmployeeHeader from '~/components/employee/EmployeeHeader.vue'
import EmployeeProfileCard from '~/components/employee/dashboard/EmployeeProfileCard.vue'
import EmployeeLeaveInfoCard from '~/components/employee/dashboard/EmployeeLeaveInfoCard.vue'
import EmployeeTaskListCard from '~/components/employee/dashboard/EmployeeTaskListCard.vue'
import EmployeeAttendanceCard from '~/components/employee/dashboard/EmployeeAttendanceCard.vue'
import EmployeeAnnouncementCard from '~/components/employee/dashboard/EmployeeAnnouncementCard.vue'
import { ref } from 'vue'

const sidebarOpen = ref(true)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<style scoped>
.main-content {
  transition: margin-left 0.3s;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
</style>