<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Media Library</h1>
      <div class="flex gap-3">
        <button 
          @click="fetchMedia"
          class="btn-secondary flex items-center gap-2"
          :disabled="isLoading"
        >
          <ArrowPathIcon class="w-5 h-5" :class="{'animate-spin': isLoading}" />
          Refresh
        </button>
        <button 
          @click="showUploadModal = true" 
          class="btn-primary flex items-center gap-2"
        >
          <CloudArrowUpIcon class="w-5 h-5" />
          Upload Media
        </button>
      </div>
    </div>

    <!-- Filter and Bulk Actions -->
    <div class="mb-6 bg-white p-4 rounded-lg shadow">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 flex flex-col md:flex-row gap-4">
          <select 
            v-model="filterType" 
            class="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="document">Documents</option>
          </select>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search media..."
            class="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
        </div>
        <div v-if="selectedItems.length > 0" class="flex items-center gap-2">
          <span class="text-sm text-gray-600">{{ selectedItems.length }} selected</span>
          <button 
            @click="bulkDownload"
            class="btn-secondary flex items-center gap-1 px-3 py-1.5 text-sm"
          >
            <ArrowDownTrayIcon class="w-4 h-4" />
            Download
          </button>
          <button 
            @click="confirmBulkDelete"
            class="btn-danger flex items-center gap-1 px-3 py-1.5 text-sm"
          >
            <TrashIcon class="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center p-8">
      <Spinner class="w-8 h-8 text-blue-500" />
    </div>

    <!-- Media Grid -->
    <div v-else-if="filteredMedia.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <MediaThumbnail 
        v-for="media in filteredMedia" 
        :key="media.id"
        :media="media"
        :selected="isSelected(media.id)"
        @click="toggleSelectMedia(media)"
        @download="downloadMedia(media)"
        @delete="deleteMedia(media.id)"
        @preview="selectMedia(media)"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-lg shadow p-8 text-center">
      <div class="mx-auto max-w-md">
        <FolderIcon class="w-12 h-12 mx-auto text-gray-400" />
        <h3 class="mt-2 text-lg font-medium text-gray-900">No media files found</h3>
        <p class="mt-1 text-sm text-gray-500">Upload your first media file to get started</p>
        <button 
          @click="showUploadModal = true"
          class="mt-4 btn-primary"
        >
          <CloudArrowUpIcon class="w-5 h-5 mr-2" />
          Upload Media
        </button>
      </div>
    </div>

    <!-- Upload Modal -->
    <Modal :show="showUploadModal" @close="showUploadModal = false">
      <MediaUploader 
        @success="handleUploadSuccess"
        @error="handleUploadError"
      />
    </Modal>

    <!-- Selected Media Preview Modal -->
    <Modal :show="!!selectedMedia" @close="selectedMedia = null" size="xl">
      <MediaPreview 
        v-if="selectedMedia"
        :media="selectedMedia"
        @close="selectedMedia = null"
        @delete="deleteMedia(selectedMedia.id)"
      />
    </Modal>

    <!-- Bulk Delete Confirmation -->
    <ConfirmationModal
      :show="showBulkDeleteModal"
      @close="showBulkDeleteModal = false"
      @confirmed="performBulkDelete"
    >
      <template #title>Confirm Bulk Delete</template>
      <template #content>
        Are you sure you want to delete {{ selectedItems.length }} selected items?
        This action cannot be undone.
      </template>
    </ConfirmationModal>
  </div>
</template>

<script lang="ts" setup>
import { 
  FolderIcon,
  CloudArrowUpIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'
import useMedia from '~/composables/useMedia'

const {
  mediaItems,
  selectedMedia,
  filterType,
  searchQuery,
  isLoading,
  filteredMedia,
  fetchMedia,
  addMedia,
  deleteMedia
} = useMedia()

const showUploadModal = ref(false)
const showBulkDeleteModal = ref(false)
const selectedItems = ref<string[]>([])

// New methods for selection
const isSelected = (id: string) => selectedItems.value.includes(id)

const toggleSelectMedia = (media: any) => {
  if (selectedItems.value.includes(media.id)) {
    selectedItems.value = selectedItems.value.filter(id => id !== media.id)
  } else {
    selectedItems.value.push(media.id)
  }
}

const bulkDownload = () => {
  // Implement bulk download logic
  alert(`Downloading ${selectedItems.value.length} files`)
}

const confirmBulkDelete = () => {
  showBulkDeleteModal.value = true
}

const performBulkDelete = () => {
  selectedItems.value.forEach(id => deleteMedia(id))
  selectedItems.value = []
  showBulkDeleteModal.value = false
}

// Existing methods remain the same
const typeBadgeClass = (type: string) => {
  return {
    'bg-blue-100 text-blue-800': type.startsWith('image'),
    'bg-purple-100 text-purple-800': type.startsWith('application'),
    'bg-gray-100 text-gray-800': true
  }
}

const handleImageError = (media: any) => {
  media.thumbnail = '/images/placeholder.jpg'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const handleUploadSuccess = (newMedia: any) => {
  addMedia(newMedia)
  showUploadModal.value = false
}

const handleUploadError = (error: string) => {
  alert(`Upload failed: ${error}`)
}

const selectMedia = (media: any) => {
  selectedMedia.value = media
}

const downloadMedia = async (media: any) => {
  const link = document.createElement('a')
  link.href = media.url
  link.download = media.name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  fetchMedia()
})

definePageMeta({
  layout: 'admin',
  title: 'Media Library',
  meta: [
    { name: 'description', content: 'Manage your media files' },
    { name: 'keywords', content: 'media, library, upload, manage' }
  ]
})
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center;
}
.btn-secondary {
  @apply bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center;
}
.btn-danger {
  @apply bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center;
}
.aspect-square {
  aspect-ratio: 1/1;
}
</style>