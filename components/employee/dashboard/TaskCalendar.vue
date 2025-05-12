<template>
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900">Task Calendar</h3>
        <div class="flex space-x-2">
          <button class="p-1 rounded-md hover:bg-gray-100">
            <ChevronLeftIcon class="w-5 h-5 text-gray-600" />
          </button>
          <span class="text-sm font-medium">June 2023</span>
          <button class="p-1 rounded-md hover:bg-gray-100">
            <ChevronRightIcon class="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      <div class="grid grid-cols-7 gap-1 mb-2">
        <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" 
             :key="day"
             class="text-center text-xs font-medium text-gray-500 py-1">
          {{ day }}
        </div>
      </div>
      <div class="grid grid-cols-7 gap-1">
        <div v-for="day in calendarDays" 
             :key="day.date"
             class="h-12 border rounded-md flex flex-col overflow-hidden"
             :class="{
               'bg-gray-50': !day.isCurrentMonth,
               'border-green-200': day.hasTask
             }">
          <div class="text-right pr-1 pt-1">
            <span class="text-xs" 
                  :class="{
                    'text-gray-400': !day.isCurrentMonth,
                    'bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center': day.isToday
                  }">
              {{ day.day }}
            </span>
          </div>
          <div v-if="day.hasTask" class="flex-1 flex items-center justify-center">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
  
  // Contoh data kalender (bisa diganti dengan logika pembuatan kalender sesungguhnya)
  const calendarDays = [
    { day: 28, date: '2023-05-28', isCurrentMonth: false, isToday: false, hasTask: false },
    // ... hari lainnya
    { day: 15, date: '2023-06-15', isCurrentMonth: true, isToday: true, hasTask: true },
    // ... hari lainnya
    { day: 1, date: '2023-07-01', isCurrentMonth: false, isToday: false, hasTask: false }
  ]
  </script>