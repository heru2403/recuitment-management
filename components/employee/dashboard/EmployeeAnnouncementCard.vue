<template>
  <div class="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition-transform">
    <div class="flex items-center justify-between mb-4">
      <h5 class="font-semibold text-lg flex items-center">
        <MegaphoneIcon class="w-5 h-5 mr-2 text-orange-500" />
        Pengumuman
      </h5>
      <BellAlertIcon class="w-5 h-5 text-gray-400" />
    </div>
    
    <div class="space-y-3">
      <div class="bg-blue-50 p-3 rounded-lg border border-blue-100">
        <div class="font-medium text-blue-800 flex items-start">
          <ExclamationTriangleIcon class="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
          <span>Libur Nasional</span>
        </div>
        <p class="text-sm text-blue-700 mt-1 ml-6">Tanggal 17 Agustus - Hari Kemerdekaan</p>
      </div>
      
      <div class="bg-amber-50 p-3 rounded-lg border border-amber-100">
        <div class="font-medium text-amber-800 flex items-start">
          <ExclamationTriangleIcon class="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
          <span>Perubahan Jam Kerja</span>
        </div>
        <p class="text-sm text-amber-700 mt-1 ml-6">Mulai minggu depan jam kerja 08:00-16:00</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  MegaphoneIcon, 
  BellAlertIcon,
  ExclamationTriangleIcon 
} from '@heroicons/vue/24/outline'
</script>