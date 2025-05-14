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
        <h1 class="ml-4 text-xl font-semibold text-gray-800">Available Tests</h1>
      </header>

      <!-- Main content -->
      <main class="flex-1 overflow-y-auto p-6">
        <div class="max-w-7xl mx-auto">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800 hidden md:block">Available Tests</h2>
            <div class="flex-1 md:flex-none"></div>
          </div>

          <div class="flex flex-col md:flex-row gap-4 mb-6">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search tests..."
              class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            >
            <select 
              v-model="statusFilter"
              class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            >
              <option value="all">All Tests</option>
              <option value="active">Active Only</option>
            </select>
          </div>

          <!-- Dummy Test Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="test in dummyTests" 
              :key="test.id" 
              class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ test.title }}</h3>
                <p class="text-gray-600 mb-4">{{ test.description }}</p>
                <div class="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                  <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ test.duration }} mins
                  </span>
                  <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {{ test.question_count }} questions
                  </span>
                  <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ test.passing_score }}% passing
                  </span>
                </div>
              </div>
              <div class="bg-gray-50 px-6 py-4 flex justify-end">
                <button
                  @click="viewResults(test.id)"
                  class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Results
                </button>
              </div>
            </div>
          </div>

          <!-- Results Modal -->
          <div v-if="showResultsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                  <h3 class="text-xl font-bold">Test Results - {{ selectedTest?.title }}</h3>
                  <button @click="showResultsModal = false" class="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <!-- Results Summary -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="text-gray-500 text-sm font-medium">Total Candidates</h4>
                    <p class="text-2xl font-bold mt-1">3</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="text-gray-500 text-sm font-medium">Average Score</h4>
                    <p class="text-2xl font-bold mt-1">78%</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="text-gray-500 text-sm font-medium">Pass Rate</h4>
                    <p class="text-2xl font-bold mt-1">67%</p>
                  </div>
                </div>
                
                <!-- Results Table -->
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed At</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap">John Doe</td>
                        <td class="px-6 py-4 whitespace-nowrap">85/100</td>
                        <td class="px-6 py-4 whitespace-nowrap text-green-600 font-medium">Passed</td>
                        <td class="px-6 py-4 whitespace-nowrap">Jun 15, 2023</td>
                      </tr>
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                        <td class="px-6 py-4 whitespace-nowrap">72/100</td>
                        <td class="px-6 py-4 whitespace-nowrap text-green-600 font-medium">Passed</td>
                        <td class="px-6 py-4 whitespace-nowrap">Jun 16, 2023</td>
                      </tr>
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap">Robert Johnson</td>
                        <td class="px-6 py-4 whitespace-nowrap">45/100</td>
                        <td class="px-6 py-4 whitespace-nowrap text-red-600 font-medium">Failed</td>
                        <td class="px-6 py-4 whitespace-nowrap">Jun 16, 2023</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div v-if="loading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <p class="text-gray-600">Loading tests...</p>
          </div>

          <div v-if="!loading && dummyTests.length === 0" class="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-700 mb-1">No tests available</h3>
            <p class="text-gray-500">There are currently no tests to display.</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from '~/components/Sidebar.vue'
import TestResults from '~/components/TestResults.vue'


interface Test {
  id: number
  title: string
  description: string
  duration: number
  question_count: number
  passing_score: number
  is_active: boolean
}

export default defineComponent({
  components: {
    Sidebar
  },
  data() {
    return {
      dummyTests: [
        {
          id: 1,
          title: "Programming Fundamentals",
          description: "Test basic programming knowledge and logic",
          duration: 60,
          question_count: 30,
          passing_score: 70,
          is_active: true
        },
        {
          id: 2,
          title: "Web Development",
          description: "Test HTML, CSS and JavaScript knowledge",
          duration: 45,
          question_count: 25,
          passing_score: 65,
          is_active: true
        },
        {
          id: 3,
          title: "Database Knowledge",
          description: "Test SQL and database concepts",
          duration: 30,
          question_count: 20,
          passing_score: 60,
          is_active: true
        }
      ] as Test[],
      loading: false,
      searchQuery: '',
      statusFilter: 'active',
      sidebarCollapsed: false,
      showResultsModal: false,
      selectedTest: null as Test | null
    }
  },
  computed: {
    filteredTests(): Test[] {
      return this.dummyTests.filter(test => {
        const matchesSearch = test.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                              test.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesStatus = this.statusFilter === 'all' || test.is_active
        return matchesSearch && matchesStatus
      })
    }
  },
  methods: {
    viewResults(testId: number) {
      this.selectedTest = this.dummyTests.find(test => test.id === testId) || null
      this.showResultsModal = true
    },
    toggleSidebar(): void {
      this.sidebarCollapsed = !this.sidebarCollapsed
    }
  }
})
</script>