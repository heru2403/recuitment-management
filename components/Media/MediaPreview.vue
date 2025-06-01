<template>
  <div class="p-4">
    <div v-if="media.type.startsWith('image')" class="flex justify-center">
      <img :src="media.url" :alt="media.name" class="max-h-[70vh] max-w-full rounded-lg">
    </div>
    
    <div v-else-if="media.type.startsWith('video')" class="flex flex-col items-center">
      <video controls class="max-h-[70vh] max-w-full rounded-lg">
        <source :src="media.url" :type="media.type">
        Your browser does not support the video tag.
      </video>
      <div class="mt-4 w-full">
        <h2 class="text-xl font-semibold">{{ media.name }}</h2>
        <p class="text-sm text-gray-500 mt-1">{{ media.size }} • {{ formatDate(media.uploadedAt) }}</p>
      </div>
    </div>
    
    <div v-else class="flex flex-col items-center justify-center p-8">
      <DocumentIcon class="h-20 w-20 text-gray-400 mb-4" />
      <p class="text-lg font-medium">{{ media.name }}</p>
      <p class="text-sm text-gray-500 mt-2">{{ media.size }} • {{ formatDate(media.uploadedAt) }}</p>
      
      <div class="mt-6 flex gap-3">
        <button @click="download" class="btn-primary">
          <ArrowDownTrayIcon class="h-5 w-5 mr-2" />
          Download
        </button>
        <button @click="$emit('delete')" class="btn-danger">
          <TrashIcon class="h-5 w-5 mr-2" />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DocumentIcon, ArrowDownTrayIcon, TrashIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  media: {
    id: string
    name: string
    url: string
    type: string
    size: string
    uploadedAt: string
  }
}>()

const emit = defineEmits(['close', 'delete'])

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const download = () => {
  const link = document.createElement('a')
  link.href = props.media.url
  link.download = props.media.name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center;
}
.btn-danger {
  @apply bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center;
}
</style>