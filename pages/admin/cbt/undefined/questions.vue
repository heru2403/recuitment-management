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

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <label for="search" class="sr-only">Search candidates</label>
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            placeholder="Search candidates..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
        </div>
        <div class="w-full md:w-48">
          <label for="status" class="sr-only">Filter by status</label>
          <select
            id="status"
            v-model="statusFilter"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Results</option>
            <option value="passed">Passed Only</option>
            <option value="failed">Failed Only</option>
          </select>
        </div>
        <div class="w-full md:w-48">
          <label for="sort" class="sr-only">Sort by</label>
          <select
            id="sort"
            v-model="sortBy"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="score">Score</option>
            <option value="date">Date</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div class="w-full md:w-48">
          <label for="direction" class="sr-only">Sort direction</label>
          <select
            id="direction"
            v-model="sortDirection"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
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
                Email
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
            <tr v-for="result in filteredResults" :key="result.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      {{ getInitials(result.candidate.full_name) }}
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ result.candidate.full_name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ result.candidate.email }}</div>
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
                  View
                </NuxtLink>
                <button
                  @click="downloadResult(result.id)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  Download
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && results.length === 0" class="bg-white rounded-lg shadow p-8 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900">No results yet</h3>
      <p class="mt-1 text-gray-500">This test hasn't been taken by any candidates yet.</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Pagination -->
    <div v-if="results.length > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6">
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing <span class="font-medium">{{ pagination.from }}</span> to <span class="font-medium">{{ pagination.to }}</span> of <span class="font-medium">{{ pagination.total }}</span> results
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              @click="prevPage"
              :disabled="pagination.current_page === 1"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Previous</span>
              <ChevronLeftIcon class="h-5 w-5" />
            </button>
            <button
              v-for="page in pagination.last_page"
              :key="page"
              @click="goToPage(page)"
              :class="{
                'z-10 bg-blue-50 border-blue-500 text-blue-600': page === pagination.current_page,
                'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': page !== pagination.current_page
              }"
              class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {{ page }}
            </button>
            <button
              @click="nextPage"
              :disabled="pagination.current_page === pagination.last_page"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Next</span>
              <ChevronRightIcon class="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ArrowLeftIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

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

interface Pagination {
  current_page: number
  last_page: number
  from: number
  to: number
  total: number
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

// Filters
const searchQuery = ref('')
const statusFilter = ref('all')
const sortBy = ref<'score' | 'date' | 'name'>('score')
const sortDirection = ref<'asc' | 'desc'>('desc')

// Pagination
const pagination = ref<Pagination>({
  current_page: 1,
  last_page: 1,
  from: 1,
  to: 1,
  total: 0
})

const filteredResults = computed(() => {
  let filtered = results.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(result =>
      result.candidate.full_name.toLowerCase().includes(query) ||
      result.candidate.email.toLowerCase().includes(query)
    )
  }

  // Apply status filter
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(result => result.status === statusFilter.value)
  }

  // Apply sorting
  filtered = [...filtered].sort((a, b) => {
    let comparison = 0
    if (sortBy.value === 'score') {
      comparison = (a.score / a.total_points) - (b.score / b.total_points)
    } else if (sortBy.value === 'date') {
      comparison = new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime()
    } else if (sortBy.value === 'name') {
      comparison = a.candidate.full_name.localeCompare(b.candidate.full_name)
    }
    return sortDirection.value === 'desc' ? -comparison : comparison
  })

  return filtered
})

onMounted(async () => {
  await fetchTestDetails()
  await fetchResults()
  await fetchStatistics()
})

async function fetchTestDetails() {
  try {
    const { data } = await useFetch(`/api/admin/tests/${test.value.id}`)
    const testData = data.value as { title?: string } | null
    if (testData && typeof testData.title === 'string') {
      test.value.title = testData.title
    }
  } catch (error) {
    console.error('Error fetching test details:', error)
    useToast().error('Failed to load test details')
  }
}

async function fetchResults() {
  try {
    loading.value = true
    const { data } = await useFetch(`/api/admin/tests/${test.value.id}/results`, {
      params: {
        page: pagination.value.current_page
      }
    })

    // Type assertion to inform TypeScript about the expected structure
    const response = data.value as {
      data: Result[],
      current_page: number,
      last_page: number,
      from: number,
      to: number,
      total: number
    } | null

    if (response) {
      results.value = response.data
      pagination.value = {
        current_page: response.current_page,
        last_page: response.last_page,
        from: response.from,
        to: response.to,
        total: response.total
      }
    }
  } catch (error) {
    console.error('Error fetching results:', error)
    useToast().error('Failed to load results')
  } finally {
    loading.value = false
  }
}

async function fetchStatistics() {
  try {
    const { data } = await useFetch(`/api/admin/tests/${test.value.id}/results/statistics`)
    const stats = data.value as Partial<Statistics> | null
    if (stats && typeof stats === 'object') {
      statistics.value = {
        total_attempts: typeof stats.total_attempts === 'number' ? stats.total_attempts : 0,
        passed: typeof stats.passed === 'number' ? stats.passed : 0,
        failed: typeof stats.failed === 'number' ? stats.failed : 0,
        average_score: typeof stats.average_score === 'number' ? stats.average_score : 0
      }
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
        : new Blob([typeof data.value === 'string' ? data.value : JSON.stringify(data.value)])
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

function prevPage() {
  if (pagination.value.current_page > 1) {
    pagination.value.current_page--
    fetchResults()
  }
}

function nextPage() {
  if (pagination.value.current_page < pagination.value.last_page) {
    pagination.value.current_page++
    fetchResults()
  }
}

function goToPage(page: number) {
  pagination.value.current_page = page
  fetchResults()
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