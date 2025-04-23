<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="p-4 border-b">
      <h5 class="font-bold text-lg">Aksi Cepat</h5>
    </div>
    <div class="p-4 grid grid-cols-2 gap-3">
      <div 
        v-for="action in quickActions" 
        :key="action.text"
        class="flex flex-col p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
        @click="handleAction(action.action)"
      >
        <div class="flex items-center mb-1">
          <FontAwesomeIcon 
            :icon="action.icon" 
            class="text-[15px] mr-2"
            :class="action.iconColor"
          />
          <span class="text-[14px] font-medium text-gray-800">
            {{ action.text }}
          </span>
        </div>
        <span class="text-[12px] text-gray-500">
          {{ action.subtext }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { QuickAction } from '~/types/dashboard'

export default defineComponent({
  name: 'QuickActions',
  setup() {
    const quickActions: QuickAction[] = [
      {
        text: 'Tambah Pelamar',
        subtext: 'Approve Cuti',
        icon: 'user-plus',
        iconColor: 'text-blue-500',
        action: 'add-applicant',
        completed: undefined,
        type: 'primary'
      },
      {
        text: 'Kirim Notifikasi',
        subtext: 'Generate Laporan',
        icon: 'envelope',
        iconColor: 'text-green-500',
        action: 'send-notification',
        completed: undefined,
        type: 'primary'
      },
      {
        text: 'Approve Cuti',
        subtext: 'Lihat Daftar Cuti',
        icon: 'calendar-check',
        iconColor: 'text-amber-500',
        action: 'approve-leave',
        completed: undefined,
        type: 'primary'
      },
      {
        text: 'Generate Laporan',
        subtext: 'Buat Laporan Bulanan',
        icon: 'file-export',
        iconColor: 'text-indigo-500', // Ganti ke warna indigo yang tersedia
        action: 'generate-report',
        completed: undefined,
        type: 'primary'
      }
    ]

    const handleAction = (action: string) => {
      console.log('Action triggered:', action)
    }

    return { quickActions, handleAction }
  }
})
</script>