<template>
  <div class="container mx-auto p-4">
    <!-- Header and Action Buttons -->
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

    <!-- Filter and Search -->
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

    <!-- Main Content -->
    <div v-if="isLoading" class="flex justify-center p-8">
      <Spinner class="w-8 h-8 text-blue-500" />
    </div>

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

    <!-- Modals -->
    <Modal :isOpen="showUploadModal" @close="showUploadModal = false">
      <MediaUploader 
        @success="handleUploadSuccess"
        @error="handleUploadError"
      />
    </Modal>

    <Modal :isOpen="!!selectedMedia" @close="selectedMedia = null" size="xl">
      <MediaPreview 
        v-if="selectedMedia"
        :media="selectedMedia"
        @close="selectedMedia = null"
        @delete="deleteMedia(selectedMedia.id)"
      />
    </Modal>

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
import { ref, computed, onMounted } from 'vue'
import { 
  FolderIcon,
  CloudArrowUpIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'
import Modal from '@/components/ui/Modal.vue'
import Spinner from '@/components/ui/Spinner.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import MediaUploader from '@/components/Media/MediaUploader.vue'
import MediaPreview from '@/components/Media/MediaPreview.vue'
import MediaThumbnail from '@/components/Media/MediaThumbnail.vue'
import type { MediaItem } from '~/types/media'

// State
const mediaItems = ref<MediaItem[]>([])
const selectedMedia = ref<MediaItem | null>(null)
const filterType = ref('all')
const searchQuery = ref('')
const isLoading = ref(false)
const showUploadModal = ref(false)
const showBulkDeleteModal = ref(false)
const selectedItems = ref<string[]>([])

// Computed
const filteredMedia = computed(() => {
  let items = mediaItems.value

  // Filter by type
  if (filterType.value !== 'all') {
    items = items.filter(item => {
      if (filterType.value === 'image') return item.type.startsWith('image')
      if (filterType.value === 'video') return item.type.startsWith('video')
      if (filterType.value === 'document') return item.type.startsWith('application')
      return true
    })
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    items = items.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.type.toLowerCase().includes(query)
    )
  }

  return items
})

// Methods
const fetchMedia = async () => {
  isLoading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Sample data with various media types
    mediaItems.value = [
      {
        id: '1',
        name: 'company-logo.png',
        type: 'image/png',
        size: '1.2 MB',
        url: 'https://images.unsplash.com/photo-1567443024551-f3e3a7b9d41e?w=500',
        thumbnail: 'https://images.unsplash.com/photo-1567443024551-f3e3a7b9d41e?w=300',
        uploadedAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '2',
        name: 'presentation.pdf',
        type: 'application/pdf',
        size: '4.5 MB',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        thumbnail: 'https://via.placeholder.com/300/ff0000/ffffff?text=PDF',
        uploadedAt: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: '3',
        name: 'office-photo.jpg',
        type: 'image/jpeg',
        size: '3.8 MB',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500',
        thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300',
        uploadedAt: new Date(Date.now() - 259200000).toISOString()
      },
      {
        id: '4',
        name: 'product-catalog.pdf',
        type: 'application/pdf',
        size: '7.2 MB',
        url: 'https://www.africau.edu/images/default/sample.pdf',
        thumbnail: 'https://via.placeholder.com/300/00ff00/ffffff?text=Catalog',
        uploadedAt: new Date(Date.now() - 345600000).toISOString()
      },
      {
        id: '5',
        name: 'team-video.mp4',
        type: 'video/mp4',
        size: '15.8 MB',
        url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
        thumbnail: 'https://via.placeholder.com/300/ffff00/000000?text=Video',
        uploadedAt: new Date(Date.now() - 432000000).toISOString()
      },
      {
        id: '6',
        name: 'profile-picture.jpg',
        type: 'image/jpeg',
        size: '2.1 MB',
        url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500',
        thumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
        uploadedAt: new Date(Date.now() - 518400000).toISOString()
      },
      {
        id: '7',
        name: 'meeting-notes.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        size: '1.5 MB',
        url: 'https://samplelib.com/lib/preview/docx/sample-1.docx',
        thumbnail: 'https://via.placeholder.com/300/0000ff/ffffff?text=DOCX',
        uploadedAt: new Date(Date.now() - 604800000).toISOString()
      },
      {
        id: '8',
        name: 'spreadsheet.xlsx',
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: '2.8 MB',
        url: 'https://samplelib.com/lib/preview/xlsx/sample-1.xlsx',
        thumbnail: 'https://via.placeholder.com/300/00ffff/000000?text=XLSX',
        uploadedAt: new Date(Date.now() - 691200000).toISOString()
      },
      {
        id: '9',
        name: 'presentation.pptx',
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        size: '3.4 MB',
        url: 'https://samplelib.com/lib/preview/pptx/sample-1.pptx',
        thumbnail: 'https://via.placeholder.com/300/ff00ff/ffffff?text=PPTX',
        uploadedAt: new Date(Date.now() - 777600000).toISOString()
      },
      {
        id: '10',
        name: 'archive.zip',
        type: 'application/zip',
        size: '10.5 MB',
        url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip',
        thumbnail: 'https://via.placeholder.com/300/ff8800/ffffff?text=ZIP',
        uploadedAt: new Date(Date.now() - 864000000).toISOString()
      },
      {
        id: '11',
        name: 'audio.mp3',
        type: 'audio/mpeg',
        size: '5.2 MB',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        thumbnail: 'https://via.placeholder.com/300/ff00ff/ffffff?text=MP3',
        uploadedAt: new Date(Date.now() - 950400000).toISOString()
      },
      {
        id: '12',
        name: 'archive.rar',
        type: 'application/x-rar-compressed',
        size: '8.3 MB',
        url: 'https://www.rarlab.com/rar/test.rar',
        thumbnail: 'https://via.placeholder.com/300/ff8800/ffffff?text=RAR',
        uploadedAt: new Date(Date.now() - 1036800000).toISOString()
      }
    ]
  } catch (error) {
    console.error('Failed to fetch media:', error)
  } finally {
    isLoading.value = false
  }
}

const handleUploadSuccess = (newMedia: MediaItem) => {
  mediaItems.value.unshift(newMedia)
  showUploadModal.value = false
}

const handleUploadError = (error: string) => {
  console.error('Upload error:', error)
  alert(`Upload failed: ${error}`)
}

const selectMedia = (media: MediaItem) => {
  selectedMedia.value = media
}

const downloadMedia = async (media: MediaItem) => {
  const link = document.createElement('a')
  link.href = media.url
  link.download = media.name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const deleteMedia = async (id: string) => {
  try {
    mediaItems.value = mediaItems.value.filter(item => item.id !== id)
    if (selectedMedia.value?.id === id) {
      selectedMedia.value = null
    }
    selectedItems.value = selectedItems.value.filter(itemId => itemId !== id)
  } catch (error) {
    console.error('Delete failed:', error)
  }
}

// Selection methods
const isSelected = (id: string) => selectedItems.value.includes(id)

const toggleSelectMedia = (media: MediaItem) => {
  if (selectedItems.value.includes(media.id)) {
    selectedItems.value = selectedItems.value.filter(id => id !== media.id)
  } else {
    selectedItems.value.push(media.id)
  }
}

const bulkDownload = () => {
  selectedItems.value.forEach(id => {
    const media = mediaItems.value.find(item => item.id === id)
    if (media) downloadMedia(media)
  })
}

const confirmBulkDelete = () => {
  showBulkDeleteModal.value = true
}

const performBulkDelete = () => {
  selectedItems.value.forEach(id => deleteMedia(id))
  selectedItems.value = []
  showBulkDeleteModal.value = false
}

// Lifecycle
onMounted(() => {
  fetchMedia()
})

definePageMeta({
  layout: 'admin',
  title: 'Media Library'
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
</style>