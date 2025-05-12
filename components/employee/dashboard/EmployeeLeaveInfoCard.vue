<template>
  <div class="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition-transform mt-4">
    <div class="flex items-center justify-between mb-4">
      <h5 class="font-semibold text-lg flex items-center">
        <CalendarIcon class="w-5 h-5 mr-2 text-blue-500" />
        Info Cuti
      </h5>
      <InformationCircleIcon class="w-5 h-5 text-gray-400" />
    </div>
    
    <div class="space-y-4">
      <div>
        <div class="flex justify-between text-sm mb-1">
          <span>Cuti Tahunan</span>
          <span>8/12 hari</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-1.5">
          <div class="bg-green-500 h-1.5 rounded-full" style="width: 66%"></div>
        </div>
      </div>
      
      <div>
        <div class="flex justify-between text-sm mb-1">
          <span>Cuti Sakit</span>
          <span>2/5 hari</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-1.5">
          <div class="bg-blue-500 h-1.5 rounded-full" style="width: 40%"></div>
        </div>
      </div>
      
      <div>
        <div class="flex justify-between text-sm mb-1">
          <span>Cuti Melahirkan</span>
          <span>0/90 hari</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-1.5">
          <div class="bg-yellow-500 h-1.5 rounded-full" style="width: 0%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>