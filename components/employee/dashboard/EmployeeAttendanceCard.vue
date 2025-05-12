<template>
  <div class="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition-transform">
    <div class="flex items-center justify-between mb-4">
      <h5 class="font-semibold text-lg flex items-center">
        <ClockIcon class="w-5 h-5 mr-2 text-purple-500" />
        Absensi Bulan Ini
      </h5>
      <CalendarDaysIcon class="w-5 h-5 text-gray-400" />
    </div>
    
    <div class="text-center mb-4">
      <div class="text-4xl font-bold text-gray-800">22</div>
      <div class="text-gray-500 text-sm">Hari kerja</div>
    </div>
    
    <div class="space-y-2">
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Hadir</span>
        <span class="font-medium">20 hari</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Terlambat</span>
        <span class="font-medium text-yellow-500">2 hari</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Tidak Hadir</span>
        <span class="font-medium text-red-500">0 hari</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClockIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline'
</script>