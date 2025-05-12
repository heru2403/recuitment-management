<template>
  <div class="employee-layout">
    <EmployeeSidebar />
    <EmployeeHeader />
    
    <main class="main-content ml-0 md:ml-64 pt-16 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-2xl font-bold text-gray-800 flex items-center">
            <CheckCircleIcon class="w-8 h-8 mr-2 text-green-600" />
            My Tasks
          </h1>
          <button class="btn-primary" @click="showTaskModal = true">
            <PlusIcon class="w-5 h-5 mr-2" />
            New Task
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <TaskStatusCard 
            status="Not Started" 
            :count="3" 
            color="gray"
            icon="clock"
          />
          <TaskStatusCard 
            status="In Progress" 
            :count="5" 
            color="blue"
            icon="arrow-path"
          />
          <TaskStatusCard 
            status="Pending Review" 
            :count="2" 
            color="yellow"
            icon="eye"
          />
          <TaskStatusCard 
            status="Completed" 
            :count="12" 
            color="green"
            icon="check"
          />
        </div>

        <div class="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <TaskListTable />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskProgressChart />
          <TaskCalendar />
        </div>

        <TaskModal 
          :isOpen="showTaskModal" 
          @close="showTaskModal = false" 
          @save="handleTaskSave"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import TaskCalendar from '~/components/employee/dashboard/TaskCalendar.vue'
import TaskProgressChart from '~/components/employee/dashboard/TaskProgressChart.vue'
import TaskModal from '~/components/employee/dashboard/TaskModal.vue'
import TaskStatusCard from '~/components/employee/dashboard/TaskStatusCard.vue'
const showTaskModal = ref(false)

const handleTaskSave = (taskData: any) => {
  console.log('Task saved:', taskData)
  // Implement save logic here
}
</script>