<template>
    <div class="bg-white rounded-lg shadow p-5 border-l-4" :class="borderColor">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-medium text-gray-500">{{ title }}</h3>
          <div class="mt-2">
            <span class="text-2xl font-bold" :class="textColor">{{ used }}</span>
            <span class="text-gray-400 mx-1">/</span>
            <span class="text-gray-500">{{ total }} days</span>
          </div>
        </div>
        <div class="p-2 rounded-lg" :class="iconBgColor">
          <component :is="iconComponent" class="w-6 h-6" :class="iconColor" />
        </div>
      </div>
      <div class="mt-4">
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="h-2 rounded-full" :class="progressColor" :style="`width: ${percentage}%`"></div>
        </div>
        <div class="flex justify-between mt-1 text-xs text-gray-500">
          <span>Used: {{ used }} days</span>
          <span>Remaining: {{ remaining }} days</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { 
    CalendarIcon, 
    FaceSmileIcon, 
    ExclamationTriangleIcon 
  } from '@heroicons/vue/24/outline'
  
  const props = defineProps({
    title: String,
    used: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    percentage: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: 'green',
      validator: (value: string) => ['green', 'blue', 'yellow', 'red'].includes(value)
    }
  })
  
  const remaining = computed(() => props.total - props.used)
  
  const iconComponent = computed(() => {
    switch(props.color) {
      case 'green': return CalendarIcon
      case 'blue': return FaceSmileIcon
      case 'yellow': return ExclamationTriangleIcon
      case 'red': return ExclamationTriangleIcon
      default: return CalendarIcon
    }
  })
  
  const borderColor = computed(() => {
    return {
      'green': 'border-green-500',
      'blue': 'border-blue-500',
      'yellow': 'border-yellow-500',
      'red': 'border-red-500'
    }[props.color]
  })
  
  const textColor = computed(() => {
    return {
      'green': 'text-green-600',
      'blue': 'text-blue-600',
      'yellow': 'text-yellow-600',
      'red': 'text-red-600'
    }[props.color]
  })
  
  const iconBgColor = computed(() => {
    return {
      'green': 'bg-green-100',
      'blue': 'bg-blue-100',
      'yellow': 'bg-yellow-100',
      'red': 'bg-red-100'
    }[props.color]
  })
  
  const iconColor = computed(() => {
    return {
      'green': 'text-green-600',
      'blue': 'text-blue-600',
      'yellow': 'text-yellow-600',
      'red': 'text-red-600'
    }[props.color]
  })
  
  const progressColor = computed(() => {
    return {
      'green': 'bg-green-500',
      'blue': 'bg-blue-500',
      'yellow': 'bg-yellow-500',
      'red': 'bg-red-500'
    }[props.color]
  })
  </script>