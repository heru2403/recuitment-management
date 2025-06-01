<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Manage Tests</h1>
      <NuxtLink 
        to="/admin/cbt/create" 
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition-colors"
      >
        Create New Test
      </NuxtLink>
    </div>

    <!-- Search and Filter -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <label for="search" class="sr-only">Search tests</label>
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            placeholder="Search tests by title or description..."
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
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredTests.length === 0" class="bg-white rounded-lg shadow p-8 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900">No tests found</h3>
      <p class="mt-1 text-gray-500">Create your first test to get started.</p>
      <div class="mt-6">
        <NuxtLink
          to="/admin/cbt/create"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
          New Test
        </NuxtLink>
      </div>
    </div>

    <!-- Test List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="test in filteredTests"
        :key="test.id"
        class="bg-white rounded-lg shadow overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
      >
        <div class="p-6">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-semibold text-gray-900">{{ test.title }}</h3>
            <span
              :class="{
                'bg-green-100 text-green-800': test.is_active,
                'bg-red-100 text-red-800': !test.is_active
              }"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            >
              {{ test.is_active ? 'Active' : 'Inactive' }}
            </span>
          </div>
          <p class="mt-2 text-gray-600 line-clamp-2">{{ test.description }}</p>
          
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
              Duration: {{ test.duration }} mins
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
              Questions: {{ test.question_count }}
            </span>
            <span v-if="test.passing_score" class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
              Passing: {{ test.passing_score }}%
            </span>
          </div>
        </div>
        
        <div class="bg-gray-50 px-6 py-4 flex flex-wrap justify-between gap-2">
          <div class="flex space-x-2">
            <NuxtLink
              :to="`/admin/cbt/${test.id}/edit`"
              class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PencilIcon class="-ml-1 mr-1 h-4 w-4" />
              Edit
            </NuxtLink>
            <NuxtLink
              :to="`/admin/cbt/${test.id}/questions`"
              class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <QuestionMarkCircleIcon class="-ml-1 mr-1 h-4 w-4" />
              Questions
            </NuxtLink>
          </div>
          <button
            @click="toggleTestStatus(test.id, test.is_active)"
            :class="{
              'bg-green-600 hover:bg-green-700': !test.is_active,
              'bg-red-600 hover:bg-red-700': test.is_active
            }"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {{ test.is_active ? 'Deactivate' : 'Activate' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PlusIcon, PencilIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'

interface Test {
  id: number
  title: string
  description: string
  duration: number
  question_count: number
  passing_score?: number
  is_active: boolean
}

const searchQuery = ref('')
const statusFilter = ref('all')
const loading = ref(true)
const tests = ref<Test[]>([])

const filteredTests = computed(() => {
  return tests.value.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                         test.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || 
                         (statusFilter.value === 'active' && test.is_active) || 
                         (statusFilter.value === 'inactive' && !test.is_active)
    return matchesSearch && matchesStatus
  })
})

onMounted(async () => {
  await fetchTests()
})

async function fetchTests() {
  try {
    loading.value = true
    const { data } = await useFetch<Test[]>('/api/admin/tests')
    tests.value = data.value || []
  } catch (error) {
    console.error('Error fetching tests:', error)
    useToast().error('Failed to load tests')
  } finally {
    loading.value = false
  }
}

async function toggleTestStatus(testId: number, currentStatus: boolean) {
  try {
    await $fetch(`/api/admin/tests/${testId}/status`, {
      method: 'PUT',
      body: { is_active: !currentStatus }
    })
    await fetchTests()
    useToast().success(`Test ${!currentStatus ? 'activated' : 'deactivated'} successfully`)
  } catch (error) {
    console.error('Error toggling test status:', error)
    useToast().error('Failed to update test status')
  }
}

// Replace this mock with your actual toast composable or library import
function useToast() {
  return {
    success: (msg: string) => { console.log('Success:', msg) },
    error: (msg: string) => { console.error('Error:', msg) }
  }
}

definePageMeta({
  layout: 'admin',
  title: 'CBT - Manage Tests',
  meta: {
    description: 'Manage your tests, view details, and edit them as needed.'
  }
})
</script>