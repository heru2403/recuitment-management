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
          accept="image/*,.pdf"
          @change="handleFileSelect"
          class="hidden"
        >
        
        <CloudArrowUpIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          <span class="text-blue-600 cursor-pointer" @click="openFilePicker">Click to upload</span>
          or drag and drop
        </h3>
        <p class="mt-1 text-xs text-gray-500">
          PNG, JPG, PDF up to 10MB
        </p>
        
        <div v-if="selectedFiles.length > 0" class="mt-4 space-y-2">
          <div v-for="file in selectedFiles" :key="file.name" class="flex items-center p-2 bg-gray-50 rounded">
            <DocumentTextIcon class="h-5 w-5 text-gray-400 mr-2" />
            <span class="text-sm truncate flex-1">{{ file.name }}</span>
            <span class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</span>
            <button @click="removeFile(file)" class="ml-2 text-red-500">
              <XMarkIcon class="h-4 w-4" />
            </button>
          </div>
          
          <button 
            @click="uploadFiles"
            :disabled="isUploading"
            class="mt-4 btn-primary w-full"
          >
            <ArrowUpTrayIcon v-if="!isUploading" class="h-5 w-5 mr-2" />
            <Spinner v-else class="h-5 w-5 mr-2" />
            {{ isUploading ? 'Uploading...' : 'Upload Files' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { CloudArrowUpIcon, DocumentTextIcon, XMarkIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
  import Spinner from '../ui/Spinner.vue'
  
  const emit = defineEmits(['success', 'error'])
  
  const dragOver = ref(false)
  const selectedFiles = ref<File[]>([])
  const isUploading = ref(false)
  const fileInput = ref<HTMLInputElement | null>(null)
  
  const openFilePicker = () => {
    fileInput.value?.click()
  }
  
  const handleFileSelect = (e: Event) => {
    const files = (e.target as HTMLInputElement).files
    if (files) {
      selectedFiles.value = Array.from(files).filter(file => {
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf']
        const isValid = validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024
        if (!isValid) {
          emit('error', `File ${file.name} is invalid (type or size)`)
        }
        return isValid
      })
    }
  }
  
  const handleDrop = (e: DragEvent) => {
    dragOver.value = false
    if (e.dataTransfer?.files) {
      handleFileSelect({ target: { files: e.dataTransfer.files } } as unknown as Event)
    }
  }
  
  const removeFile = (file: File) => {
    selectedFiles.value = selectedFiles.value.filter(f => f !== file)
  }
  
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  const uploadFiles = async () => {
    if (selectedFiles.value.length === 0) return
    
    isUploading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const uploadedMedia = selectedFiles.value.map(file => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        type: file.type,
        size: formatFileSize(file.size),
        url: URL.createObjectURL(file),
        thumbnail: file.type.startsWith('image') 
          ? URL.createObjectURL(file) 
          : '/images/file-icon.png',
        uploadedAt: new Date().toISOString()
      }))
      
      emit('success', uploadedMedia[0])
      selectedFiles.value = []
    } catch (error) {
      emit('error', 'Failed to upload files')
    } finally {
      isUploading.value = false
    }
  }
  </script>