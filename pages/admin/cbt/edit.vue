<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Edit Test</h1>
      <NuxtLink
        to="/admin/cbt"
        class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <ArrowLeftIcon class="-ml-1 mr-2 h-5 w-5" />
        Back to Tests
      </NuxtLink>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <form @submit.prevent="updateTest">
        <div class="space-y-6 p-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Test Title *</label>
            <input
              id="title"
              v-model="test.title"
              type="text"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              v-model="test.description"
              rows="3"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="duration" class="block text-sm font-medium text-gray-700">Duration (minutes) *</label>
              <input
                id="duration"
                v-model.number="test.duration"
                type="number"
                min="1"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
            </div>

            <div>
              <label for="passing_score" class="block text-sm font-medium text-gray-700">Passing Score (%)</label>
              <input
                id="passing_score"
                v-model.number="test.passing_score"
                type="number"
                min="0"
                max="100"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
            </div>
          </div>

          <div class="space-y-4">
            <div class="relative flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="require_camera"
                  v-model="test.require_camera"
                  type="checkbox"
                  class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                >
              </div>
              <div class="ml-3 text-sm">
                <label for="require_camera" class="font-medium text-gray-700">Require camera monitoring during test</label>
                <p class="text-gray-500">Candidate's webcam will be activated during the test</p>
              </div>
            </div>

            <div class="relative flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="randomize_questions"
                  v-model="test.randomize_questions"
                  type="checkbox"
                  class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                >
              </div>
              <div class="ml-3 text-sm">
                <label for="randomize_questions" class="font-medium text-gray-700">Randomize question order</label>
                <p class="text-gray-500">Questions will appear in random order for each candidate</p>
              </div>
            </div>

            <div class="relative flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="is_active"
                  v-model="test.is_active"
                  type="checkbox"
                  class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                >
              </div>
              <div class="ml-3 text-sm">
                <label for="is_active" class="font-medium text-gray-700">Test is active</label>
                <p class="text-gray-500">Test will be available to candidates</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            type="button"
            @click="$router.push('/admin/cbt')"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SpinnerIcon v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4" />
            <SaveIcon v-else class="-ml-1 mr-2 h-4 w-4" />
            Update Test
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowLeftIcon, ScaleIcon } from '@heroicons/vue/24/outline'
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue'

const toast = useToast()

interface Test {
  id: number
  title: string
  description: string
  duration: number
  passing_score?: number
  require_camera: boolean
  randomize_questions: boolean
  is_active: boolean
}

const route = useRoute()
const test = ref<Test>({
  id: Number(route.params.id),
  title: '',
  description: '',
  duration: 60,
  passing_score: 60,
  require_camera: false,
  randomize_questions: true,
  is_active: false
})

const loading = ref(false)

onMounted(async () => {
  await fetchTest()
})

async function fetchTest() {
  try {
    loading.value = true
    const { data } = await useFetch(`/api/admin/tests/${test.value.id}`)
    if (data.value) {
      Object.assign(test.value, data.value)
    }
    toast.error('Failed to load test details')
    console.error('Error fetching test:', Error)
    useToast().error('Failed to load test details')
  } finally {
    loading.value = false
  }
}

async function updateTest() {
  try {
    loading.value = true
    await $fetch(`/api/admin/tests/${test.value.id}`, {
      method: 'PUT',
    })
    toast.success('Test updated successfully')
    toast.success('Test updated successfully')
    await navigateTo('/admin/cbt')
    toast.error('Failed to update test')
    console.error('Error updating test:', Error)
    useToast().error('Failed to update test')
  } finally {
    loading.value = false
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
  title: 'Cbt Edit',
  meta: {
    requiresAuth: true,
    requiresAdmin: true,
  },
})
</script>