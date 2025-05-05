<template>
    <div 
      class="group relative border rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-all duration-200"
      :class="{'cursor-pointer': clickable}"
      @click="handleClick"
    >
      <!-- Media Thumbnail Container -->
      <div class="aspect-square bg-gray-100 overflow-hidden relative">
        <!-- Image Preview -->
        <img 
          v-if="media.type.startsWith('image')"
          :src="media.thumbnail || placeholderImage"
          :alt="media.name"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          @error="handleImageError"
        />
        
        <!-- Video Preview -->
        <div 
          v-else-if="media.type.startsWith('video')" 
          class="w-full h-full flex items-center justify-center bg-gray-200"
        >
          <PlayIcon class="w-10 h-10 text-gray-500" />
          <span class="sr-only">Video thumbnail</span>
        </div>
        
        <!-- Document Preview -->
        <div 
          v-else 
          class="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4"
        >
          <DocumentIcon class="w-10 h-10 text-gray-500 mb-2" />
          <span class="text-xs text-gray-600 text-center line-clamp-2">{{ media.name }}</span>
        </div>
  
        <!-- Type Badge -->
        <span 
          class="absolute top-2 left-2 text-xs px-2 py-1 rounded"
          :class="typeBadgeClass"
        >
          {{ fileExtension }}
        </span>
  
        <!-- Loading Indicator -->
        <div 
          v-if="loading" 
          class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
        >
          <Spinner class="w-6 h-6 text-white" />
        </div>
      </div>
      
      <!-- Media Info -->
      <div class="p-3">
        <p class="font-medium text-sm truncate">{{ media.name }}</p>
        <div class="flex justify-between items-center mt-1">
          <span class="text-xs text-gray-500">{{ media.size }}</span>
          <span class="text-xs text-gray-500">{{ formattedDate }}</span>
        </div>
      </div>
  
      <!-- Action Buttons -->
      <div 
        v-if="showActions"
        class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <button 
          v-if="showDownload"
          @click.stop="$emit('download', media)"
          class="p-1 bg-white rounded-full shadow hover:bg-gray-100"
          title="Download"
        >
          <ArrowDownTrayIcon class="w-4 h-4 text-gray-700" />
        </button>
        <button 
          v-if="showDelete"
          @click.stop="$emit('delete', media.id)"
          class="p-1 bg-white rounded-full shadow hover:bg-red-100"
          title="Delete"
        >
          <TrashIcon class="w-4 h-4 text-red-600" />
        </button>
        <button 
          v-if="showPreview"
          @click.stop="$emit('preview', media)"
          class="p-1 bg-white rounded-full shadow hover:bg-blue-100"
          title="Preview"
        >
          <EyeIcon class="w-4 h-4 text-blue-600" />
        </button>
      </div>
  
      <!-- Selection Indicator -->
      <div 
        v-if="selected"
        class="absolute inset-0 border-2 border-blue-500 pointer-events-none"
      ></div>
      <CheckCircleIcon 
        v-if="selected"
        class="absolute top-2 right-2 h-6 w-6 text-blue-500"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { 
    PlayIcon,
    DocumentIcon,
    ArrowDownTrayIcon,
    TrashIcon,
    EyeIcon,
    CheckCircleIcon
  } from '@heroicons/vue/24/outline'
  import Spinner from '../ui/Spinner.vue'
  
  const props = defineProps({
    media: {
      type: Object as () => MediaItem,
      required: true
    },
    clickable: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: false
    },
    showActions: {
      type: Boolean,
      default: true
    },
    showDownload: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    showPreview: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    placeholderImage: {
      type: String,
      default: '/images/placeholder.jpg'
    }
  })
  
  const emit = defineEmits(['click', 'download', 'delete', 'preview'])
  
  interface MediaItem {
    id: string
    name: string
    url: string
    thumbnail: string
    size: string
    type: string
    uploadedAt: string
  }
  
  const fileExtension = computed(() => {
    return props.media.name.split('.').pop()?.toUpperCase() || 
      props.media.type.split('/').pop()?.toUpperCase() || 
      'FILE'
  })
  
  const typeBadgeClass = computed(() => {
    return {
      'bg-blue-100 text-blue-800': props.media.type.startsWith('image'),
      'bg-red-100 text-red-800': props.media.type.startsWith('video'),
      'bg-purple-100 text-purple-800': props.media.type.startsWith('application'),
      'bg-gray-100 text-gray-800': true // default
    }
  })
  
  const formattedDate = computed(() => {
    return new Date(props.media.uploadedAt).toLocaleDateString()
  })
  
  const handleClick = () => {
    if (props.clickable) {
      emit('click', props.media)
    }
  }
  
  const handleImageError = (e: Event) => {
    const img = e.target as HTMLImageElement
    img.src = props.placeholderImage
  }
  </script>
  
  <style scoped>
  .aspect-square {
    aspect-ratio: 1/1;
  }
  </style>