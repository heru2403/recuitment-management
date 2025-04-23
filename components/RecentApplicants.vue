<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="p-4 border-b flex justify-between items-center">
      <h5 class="font-bold text-lg">Pelamar Terbaru</h5>
      <NuxtLink to="/recruitment" class="text-sm text-blue-600 hover:underline">
        Lihat Semua
      </NuxtLink>
    </div>
    <ul class="divide-y">
      <li v-for="applicant in applicants" :key="applicant.id" class="p-4 hover:bg-gray-50">
        <div class="flex items-center">
          <img 
            :src="applicant.avatar" 
            :alt="applicant.name" 
            class="w-10 h-10 rounded-full mr-3"
          >
          <div class="flex-1">
            <strong>{{ applicant.name }}</strong>
            <div class="text-sm text-gray-500">{{ applicant.position }}</div>
          </div>
          <span 
            class="text-xs px-2 py-1 rounded-full"
            :class="statusClasses(applicant.status)"
          >
            {{ applicant.status }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { Applicant } from '~/types/dashboard'

export default defineComponent({
  name: 'RecentApplicants',
  setup() {
    const applicants: Applicant[] = [
      {
        id: 1,
        name: 'Sarah Johnson',
        position: 'Frontend Developer',
        status: 'BARU',
        avatar: 'https://randomuser.me/api/portraits/women/43.jpg'
      },
      {
        id: 2,
        name: 'Michael Chen',
        position: 'Data Analyst',
        status: 'INTERVIEW',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      {
        id: 3,
        name: 'Lisa Wong',
        position: 'HR Specialist',
        status: 'BARU',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
      },
      {
        id: 4,
        name: 'David Wilson',
        position: 'Backend Engineer',
        status: 'INTERVIEW',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
      }
    ]

    const statusClasses = (status: string) => {
      return {
        'bg-green-100 text-green-800': status === 'BARU',
        'bg-yellow-100 text-yellow-800': status === 'INTERVIEW'
      }
    }

    return { applicants, statusClasses }
  }
})
</script>