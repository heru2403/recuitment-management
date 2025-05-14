<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Component -->
    <Sidebar :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />

    <!-- Main Content Area -->
    <div 
      class="flex-1 flex flex-col overflow-hidden"
      :class="{ 'ml-16': sidebarCollapsed, 'ml-64': !sidebarCollapsed }"
    >
      <!-- Mobile Header -->
      <header class="md:hidden bg-white shadow-sm p-4 flex items-center">
        <button 
          @click="toggleSidebar"
          class="p-2 rounded-md text-gray-700 hover:bg-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 class="ml-4 text-xl font-semibold text-gray-800">Test Results</h1>
      </header>

      <!-- Main content -->
      <main class="flex-1 overflow-y-auto p-6">
        <div class="max-w-7xl mx-auto">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Test Results - {{ test.title }}</h2>
            <NuxtLink 
              to="/cbt" 
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Tests
            </NuxtLink>
          </div>

          <!-- Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-gray-500 text-sm font-medium mb-1">Total Candidates</h3>
              <p class="text-2xl font-bold">{{ summary.total_candidates }}</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-gray-500 text-sm font-medium mb-1">Average Score</h3>
              <p class="text-2xl font-bold">{{ summary.average_score }}%</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-gray-500 text-sm font-medium mb-1">Pass Rate</h3>
              <p class="text-2xl font-bold">{{ summary.pass_rate }}%</p>
            </div>
          </div>

          <!-- Filters -->
          <div class="flex flex-col md:flex-row gap-4 mb-6">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search candidates..."
              class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            >
            <select 
              v-model="statusFilter"
              class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            >
              <option value="all">All</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <!-- Results Table -->
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Completed</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="result in filteredResults" :key="result.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ result.candidate?.full_name || 'N/A' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ result.candidate?.email || 'N/A' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ result.score }} / {{ result.total_points }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm" :class="result.status === 'passed' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'">
                      {{ result.status === 'passed' ? 'Passed' : 'Failed' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(result.completed_at) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Loading and Empty States -->
          <div v-if="loading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <p class="text-gray-600">Loading results...</p>
          </div>

          <div v-if="!loading && results.length === 0" class="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-700 mb-1">No results found</h3>
            <p class="text-gray-500">There are currently no results for this test.</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from '~/components/Sidebar.vue'

interface TestResult {
  id: number
  candidate: {
    full_name: string
    email: string
  }
  score: number
  total_points: number
  status: 'passed' | 'failed'
  completed_at: string
}

interface TestSummary {
  total_candidates: number
  average_score: number
  pass_rate: number
}

export default defineComponent({
  components: {
    Sidebar
  },
  data() {
    return {
      test: {
        id: 0,
        title: ''
      },
      results: [] as TestResult[],
      summary: {
        total_candidates: 0,
        average_score: 0,
        pass_rate: 0
      } as TestSummary,
      loading: true,
      searchQuery: '',
      statusFilter: 'all',
      sidebarCollapsed: false
    }
  },
  async mounted() {
    await this.fetchTestResults()
  },
  computed: {
    filteredResults(): TestResult[] {
      let filtered = this.results
      
      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(result => 
          result.candidate?.full_name?.toLowerCase().includes(query) || 
          result.candidate?.email?.toLowerCase().includes(query)
        )
      }
      
      // Apply status filter
      if (this.statusFilter !== 'all') {
        filtered = filtered.filter(result => result.status === this.statusFilter)
      }
      
      return filtered
    }
  },
  methods: {
    async fetchTestResults(): Promise<void> {
      try {
        const testId = this.$route.params.id
        
        // Fetch test details
        const testResponse = await this.$axios.get(`/api/tests/${testId}`)
        this.test = testResponse.data
        
        // Fetch test results
        const resultsResponse = await this.$axios.get(`/api/tests/${testId}/results`)
        this.results = resultsResponse.data
        
        // Fetch summary data
        const summaryResponse = await this.$axios.get(`/api/tests/${testId}/summary`)
        this.summary = summaryResponse.data
        
      } catch (error) {
        console.error('Error fetching test results:', error)
        // You might want to add error handling here
      } finally {
        this.loading = false
      }
    },
    formatDate(dateString: string): string {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    toggleSidebar(): void {
      this.sidebarCollapsed = !this.sidebarCollapsed
    }
  }
})
</script>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>