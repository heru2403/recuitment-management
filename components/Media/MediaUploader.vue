<template>
  <div class="p-4">
    <div 
      @dragover.prevent="dragOver = true"
      @dragleave="dragOver = false"
      @drop.prevent="handleDrop"
      :class="{'border-blue-500 bg-blue-50': dragOver}"
      class="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors"
    >
      <input 
        type="file"
        ref="fileInput"
        multiple
        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp4,.mov"
        @change="handleFileSelect"
        class="hidden"
      >
      
      <CloudArrowUpIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900">
        <span class="text-blue-600 cursor-pointer" @click="openFilePicker">Click to upload</span>
        or drag and drop
      </h3>
      <p class="mt-1 text-xs text-gray-500">
        Images, PDFs, Documents, Spreadsheets, Videos up to 10MB
      </p>
      
      <div v-if="selectedFiles.length > 0" class="mt-4 space-y-2">
        <div v-for="(file, index) in selectedFiles" :key="index" class="flex items-center p-2 bg-gray-50 rounded">
          <DocumentTextIcon class="h-5 w-5 text-gray-400 mr-2" />
          <span class="text-sm truncate flex-1">{{ file.name }}</span>
          <span class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</span>
          <button @click="removeFile(index)" class="ml-2 text-red-500">
            <XMarkIcon class="h-4 w-4" />
          </button>
        </div>
        
        <button 
          @click="uploadFiles"
          :disabled="isUploading || selectedFiles.length === 0"
          class="mt-4 btn-primary w-full"
        >
          <ArrowUpTrayIcon v-if="!isUploading" class="h-5 w-5 mr-2" />
          <Spinner v-else class="h-5 w-5 mr-2" />
          {{ isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} File(s)` }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { 
  CloudArrowUpIcon, 
  DocumentTextIcon, 
  XMarkIcon, 
  ArrowUpTrayIcon 
} from '@heroicons/vue/24/outline'
import Spinner from '@/components/ui/Spinner.vue'

const emit = defineEmits(['success', 'error'])

// State
const dragOver = ref(false)
const selectedFiles = ref<File[]>([])
const isUploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'video/mp4',
  'video/quicktime'
]

// Methods
const openFilePicker = () => {
  fileInput.value?.click()
}

const handleFileSelect = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files) processFiles(Array.from(files))
}

const handleDrop = (e: DragEvent) => {
  dragOver.value = false
  if (e.dataTransfer?.files) processFiles(Array.from(e.dataTransfer.files))
}

const processFiles = (files: File[]) => {
  const validFiles = files.filter(file => {
    // Validate file type
    if (!ACCEPTED_TYPES.includes(file.type)) {
      emit('error', `File type ${file.type.split('/')[1]} is not supported`)
      return false
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      emit('error', `File ${file.name} exceeds maximum size of 10MB`)
      return false
    }
    
    return true
  })
  
  selectedFiles.value = [...selectedFiles.value, ...validFiles]
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

const uploadFiles = async () => {
  if (selectedFiles.value.length === 0) return
  
  isUploading.value = true
  
  try {
    // Simulate upload (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Create mock uploaded files
    const uploadedFiles = selectedFiles.value.map(file => ({
      id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: file.name,
      type: file.type,
      size: formatFileSize(file.size),
      url: URL.createObjectURL(file),
      thumbnail: file.type.startsWith('image') 
        ? URL.createObjectURL(file) 
        : getFileTypeThumbnail(file.type),
      uploadedAt: new Date().toISOString()
    }))
    
    // Emit each uploaded file
    uploadedFiles.forEach(file => emit('success', file))
    
    selectedFiles.value = []
  } catch (error) {
    console.error('Upload error:', error)
    emit('error', error instanceof Error ? error.message : 'Upload failed')
  } finally {
    isUploading.value = false
  }
}

const getFileTypeThumbnail = (type: string) => {
  if (type.startsWith('application/pdf')) return 'https://via.placeholder.com/300/ff0000/ffffff?text=PDF'
  if (type.includes('word')) return 'https://via.placeholder.com/300/2b579a/ffffff?text=DOC'
  if (type.includes('excel')) return 'https://via.placeholder.com/300/217346/ffffff?text=XLS'
  if (type.includes('powerpoint')) return 'https://via.placeholder.com/300/d24726/ffffff?text=PPT'
  if (type.startsWith('video')) return 'https://via.placeholder.com/300/000000/ffffff?text=VIDEO'
  return 'https://via.placeholder.com/300/cccccc/ffffff?text=FILE'
}
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200;
}
</style>