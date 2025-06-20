<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Test Results</h1>
        <p class="text-gray-600">{{ test.title }}</p>
      </div>
      <NuxtLink
        :to="`/admin/cbt/${test.id}`"
        class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <ArrowLeftIcon class="-ml-1 mr-2 h-5 w-5" />
        Back to Test
      </NuxtLink>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <UsersIcon class="h-6 w-6" />
          </div>
          <div class="ml-5">
            <p class="text-sm font-medium text-gray-500 truncate">Total Attempts</p>
            <p class="text-2xl font-semibold text-gray-900">{{ statistics.total_attempts }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <CheckCircleIcon class="h-6 w-6" />
          </div>
          <div class="ml-5">
            <p class="text-sm font-medium text-gray-500 truncate">Passed</p>
            <p class="text-2xl font-semibold text-gray-900">{{ statistics.passed }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-red-100 text-red-600">
            <XCircleIcon class="h-6 w-6" />
          </div>
          <div class="ml-5">
            <p class="text-sm font-medium text-gray-500 truncate">Failed</p>
            <p class="text-2xl font-semibold text-gray-900">{{ statistics.failed }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <ChartBarIcon class="h-6 w-6" />
          </div>
          <div class="ml-5">
            <p class="text-sm font-medium text-gray-500 truncate">Avg. Score</p>
            <p class="text-2xl font-semibold text-gray-900">{{ statistics.average_score }}%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidate
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Completed
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="result in results" :key="result.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      {{ getInitials(result.candidate.full_name) }}
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ result.candidate.full_name }}</div>
                    <div class="text-sm text-gray-500">{{ result.candidate.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ result.score }} / {{ result.total_points }} ({{ Math.round((result.score / result.total_points) * 100) }}%)
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="{
                    'bg-green-100 text-green-800': result.status === 'passed',
                    'bg-red-100 text-red-800': result.status === 'failed'
                  }"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ result.status === 'passed' ? 'Passed' : 'Failed' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(result.completed_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <NuxtLink
                  :to="`/admin/cbt/results/${result.id}`"
                  class="text-blue-600 hover:text-blue-900 mr-4"
                >
                  View Details
                </NuxtLink>
                <button
                  @click="downloadResult(result.id)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  Download PDF
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <SpinnerIcon class="animate-spin h-12 w-12 text-blue-500" />
    </div>

    <!-- Empty State -->
    <div v-if="!loading && results.length === 0" class="bg-white rounded-lg shadow p-8 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900">No results yet</h3>
      <p class="mt-1 text-gray-500">This test hasn't been taken by any candidates yet.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ArrowLeftIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline'
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue'

interface Candidate {
  id: number
  full_name: string
  email: string
}

interface Result {
  id: number
  candidate: Candidate
  score: number
  total_points: number
  status: 'passed' | 'failed'
  completed_at: string
}

interface Test {
  id: number
  title: string
}

interface Statistics {
  total_attempts: number
  passed: number
  failed: number
  average_score: number
}

const route = useRoute()
const test = ref<Test>({ id: Number(route.params.id), title: '' })
const results = ref<Result[]>([])
const statistics = ref<Statistics>({
  total_attempts: 0,
  passed: 0,
  failed: 0,
  average_score: 0
})
const loading = ref(true)

onMounted(async () => {
  await fetchTestDetails()
  await fetchResults()
  await fetchStatistics()
})

async function fetchTestDetails() {
  try {
    const { data } = await useFetch<Test>(`/api/admin/tests/${test.value.id}`)
    if (data.value) {
      test.value.title = data.value.title
    }
  } catch (error) {
    console.error('Error fetching test details:', error)
    useToast().error('Failed to load test details')
  }
}

async function fetchResults() {
  try {
    loading.value = true
    const { data } = await useFetch(`/api/admin/tests/${test.value.id}/results`)
    results.value = Array.isArray(data.value) ? data.value : []
  } catch (error) {
    console.error('Error fetching results:', error)
    useToast().error('Failed to load results')
  } finally {
    loading.value = false
  }
}

async function fetchStatistics() {
  try {
    const { data } = await useFetch<{ total_attempts?: number; passed?: number; failed?: number; average_score?: number }>(
      `/api/admin/tests/${test.value.id}/results/statistics`
    )
    const stats = data.value || {};
    statistics.value = {
      total_attempts: stats.total_attempts ?? 0,
      passed: stats.passed ?? 0,
      failed: stats.failed ?? 0,
      average_score: stats.average_score ?? 0
    }
  } catch (error) {
    console.error('Error fetching statistics:', error)
  }
}

function formatDate(dateStr: string) {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

async function downloadResult(resultId: number) {
  try {
    const { data } = await useFetch(`/api/admin/results/${resultId}/download`, {
      method: 'GET',
      responseType: 'blob'
    })
    
    if (data.value) {
      // Ensure data.value is a Blob
      const blob = data.value instanceof Blob
        ? data.value
        : new Blob([data.value as ArrayBuffer], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `test_result_${resultId}.pdf`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }
  } catch (error) {
    console.error('Error downloading result:', error)
    useToast().error('Failed to download result')
  }
}

function useToast() {
  return {
    success: (msg: string) => { console.log('Success:', msg) },
    error: (msg: string) => { console.error('Error:', msg) }
  }
}

definePageMeta({
  layout: 'admin',
  title: 'CBT Results'
})
</script>