<template>
  <div class="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition-transform">
    <div class="flex justify-between items-center mb-4">
      <h5 class="font-semibold text-lg flex items-center">
        <CheckCircleIcon class="w-5 h-5 mr-2 text-green-500" />
        Tugas Saya
      </h5>
      <PlusCircleIcon class="w-5 h-5 text-gray-400 hover:text-green-500 cursor-pointer" />
    </div>
    <ul class="space-y-3">
      <li class="flex items-center py-2 border-b border-gray-100">
        <Checkbox checked class="mr-3" />
        <div class="flex-1">
          <div class="font-medium">Membuat halaman login baru</div>
          <div class="text-sm text-gray-500">Proyek: Website Perusahaan</div>
        </div>
        <div class="text-sm text-gray-400">Besok</div>
      </li>
      <!-- More tasks... -->
    </ul>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
</script>