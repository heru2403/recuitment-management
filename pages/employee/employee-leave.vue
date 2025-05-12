<template>
  <div class="employee-layout">
    <EmployeeSidebar />
    <EmployeeHeader />
    
    <main class="main-content ml-0 md:ml-64 pt-16 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-2xl font-bold text-gray-800 flex items-center">
            <PaperAirplaneIcon class="w-8 h-8 mr-2 text-green-600" />
            Leave Management
          </h1>
          <button class="btn-primary" @click="showLeaveModal = true">
            <PlusIcon class="w-5 h-5 mr-2" />
            New Leave Request
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <LeaveBalanceCard 
            title="Annual Leave" 
            :used="8" 
            :total="12" 
            :percentage="66"
            color="green"
          />
          <LeaveBalanceCard 
            title="Sick Leave" 
            :used="2" 
            :total="5" 
            :percentage="40"
            color="blue"
          />
          <LeaveBalanceCard 
            title="Emergency Leave" 
            :used="0" 
            :total="3" 
            :percentage="0"
            color="yellow"
          />
        </div>

        <LeaveHistoryTable />

        <LeaveRequestModal 
          :isOpen="showLeaveModal" 
          @close="showLeaveModal = false" 
          @submit="handleLeaveSubmit"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { PaperAirplaneIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import LeaveBalanceCard from '~/components/employee/dashboard/LeaveBalanceCard.vue'
import LeaveHistoryTable from '~/components/employee/dashboard/LeaveRequestModal.vue'

const showLeaveModal = ref(false)

const handleLeaveSubmit = (leaveData: any) => {
  console.log('Leave submitted:', leaveData)
  // Implement submission logic here
}
</script>