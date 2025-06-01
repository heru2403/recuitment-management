<template>
  <div 
    class="group relative border rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-all duration-200"
    :class="{'cursor-pointer': clickable, 'ring-2 ring-blue-500': selected}"
    @click="handleClick"
  >
    <div class="aspect-square bg-gray-100 overflow-hidden relative">
      <!-- Image Preview -->
      <img 
        v-if="media.type.startsWith('image')"
        :src="media.thumbnail"
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
    </div>
    
    <!-- Media Info -->
    <div class="p-3 border-t">
      <p class="font-medium text-sm truncate">{{ media.name }}</p>
      <div class="flex justify-between items-center mt-1">
        <span class="text-xs text-gray-500">{{ media.size }}</span>
        <span class="text-xs text-gray-500">{{ formatDate(media.uploadedAt) }}</span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div 
      class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <button 
        @click.stop="$emit('download', media)"
        class="p-1 bg-white rounded-full shadow hover:bg-gray-100"
        title="Download"
      >
        <ArrowDownTrayIcon class="w-4 h-4 text-gray-700" />
      </button>
      <button 
        @click.stop="$emit('preview', media)"
        class="p-1 bg-white rounded-full shadow hover:bg-blue-100"
        title="Preview"
      >
        <EyeIcon class="w-4 h-4 text-blue-600" />
      </button>
      <button 
        @click.stop="$emit('delete', media.id)"
        class="p-1 bg-white rounded-full shadow hover:bg-red-100"
        title="Delete"
      >
        <TrashIcon class="w-4 h-4 text-red-600" />
      </button>
    </div>

    <!-- Selection Indicator -->
    <CheckCircleIcon 
      v-if="selected"
      class="absolute top-2 right-2 h-6 w-6 text-blue-500"
    />
  </div>
</template>

<script setup lang="ts">
import { 
  PlayIcon,
  DocumentIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  media: {
    type: Object as () => {
      id: string
      name: string
      type: string
      size: string
      url: string
      thumbnail: string
      uploadedAt: string
    },
    required: true
  },
  clickable: {
    type: Boolean,
    default: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click', 'download', 'delete', 'preview'])

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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const handleClick = () => {
  if (props.clickable) {
    emit('click', props.media)
  }
}

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/300/cccccc/ffffff?text=Image+Error'
}
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1/1;
}
</style>