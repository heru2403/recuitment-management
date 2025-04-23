<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="p-4 border-b">
      <h5 class="font-bold text-lg">Ulang Tahun Karyawan</h5>
    </div>
    <div class="p-4">
      <div 
        v-for="employee in birthdays" 
        :key="employee.id"
        class="flex items-center mb-4 last:mb-0"
      >
        <img 
          :src="employee.avatar" 
          :alt="employee.name"
          class="w-10 h-10 rounded-full mr-3"
        >
        <div>
          <strong>{{ employee.name }}</strong>
          <div class="text-sm text-gray-500">{{ employee.days }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Birthday } from '~/types/dashboard'

export default defineComponent({
  name: 'BirthdayList',
  setup() {
    const birthdays: Birthday[] = [
      { id: 1, name: 'Jessica Lee', days: 'Hari ini', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
      { id: 2, name: 'Robert Brown', days: 'Besok', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
      { id: 3, name: 'Amanda Smith', days: '2 hari lagi', avatar: 'https://randomuser.me/api/portraits/women/55.jpg' }
    ]

    return { birthdays }
  }
})
</script>