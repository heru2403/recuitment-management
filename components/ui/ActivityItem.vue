<template>
    <div class="flex items-start space-x-4 py-4">
      <div class="flex-shrink-0">
        <div
          class="flex items-center justify-center h-10 w-10 rounded-full"
          :class="iconContainerClasses"
        >
          <component
            :is="iconComponent"
            class="h-5 w-5"
            :class="iconClasses"
          />
        </div>
      </div>
      <div class="min-w-0 flex-1">
        <div>
          <p class="text-sm font-medium text-gray-900">
            {{ activity.user }}
          </p>
          <p class="text-sm text-gray-500">
            {{ activity.action }}
          </p>
        </div>
        <div class="mt-1 text-sm text-gray-500">
          <p>
            <time :datetime="activity.time">{{ formatTime(activity.time) }}</time>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
// Ganti import:
import {
  UserPlusIcon as UserAddIcon,
  PencilSquareIcon as PencilAltIcon,
  TrashIcon,
  LockOpenIcon,
  CircleStackIcon as DatabaseIcon,
  Cog6ToothIcon as CogIcon
} from '@heroicons/vue/24/outline'
  
  const props = defineProps({
    activity: {
      type: Object,
      required: true,
      validator: (value: any) => {
        return ['user', 'action', 'time'].every(prop => prop in value)
      }
    },
    icon: {
      type: String,
      default: null // Auto-detect based on action if null
    }
  })
  
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleString()
  }
  
  const detectedIcon = computed(() => {
    const action = props.activity.action.toLowerCase()
    if (action.includes('add') || action.includes('create')) return 'user-add'
    if (action.includes('edit') || action.includes('update')) return 'pencil'
    if (action.includes('delete') || action.includes('remove')) return 'trash'
    if (action.includes('login') || action.includes('auth')) return 'lock-open'
    if (action.includes('backup') || action.includes('database')) return 'database'
    return 'cog'
  })
  
  const iconComponent = computed(() => {
    switch (props.icon || detectedIcon.value) {
      case 'user-add':
        return UserAddIcon
      case 'pencil':
        return PencilAltIcon
      case 'trash':
        return TrashIcon
      case 'lock-open':
        return LockOpenIcon
      case 'database':
        return DatabaseIcon
      default:
        return CogIcon
    }
  })
  
  const iconContainerClasses = computed(() => {
    return 'bg-gray-100'
  })
  
  const iconClasses = computed(() => {
    return 'text-gray-600'
  })
  </script>