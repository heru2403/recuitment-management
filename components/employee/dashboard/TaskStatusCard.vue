<template>
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">{{ status }}</p>
          <p class="text-2xl font-bold mt-1" :class="textColor">{{ count }}</p>
        </div>
        <div class="p-3 rounded-full" :class="iconBgColor">
          <component :is="iconComponent" class="w-6 h-6" :class="iconColor" />
        </div>
      </div>
      <div class="mt-3 flex items-center text-sm">
        <ArrowTrendingUpIcon v-if="trend === 'up'" class="w-4 h-4 text-green-500" />
        <ArrowTrendingDownIcon v-else class="w-4 h-4 text-red-500" />
        <span class="ml-1" :class="trend === 'up' ? 'text-green-600' : 'text-red-600'">
          {{ percentage }} from last month
        </span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import {
    ClockIcon,
    ArrowPathIcon,
    EyeIcon,
    CheckIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon
  } from '@heroicons/vue/24/outline'
  
  const props = defineProps({
    status: String,
    count: Number,
    color: {
      type: String,
      default: 'gray'
    },
    icon: {
      type: String,
      default: 'clock'
    },
    trend: {
      type: String,
      validator: (val: string) => ['up', 'down'].includes(val)
    },
    percentage: String
  })
  
  const iconComponent = computed(() => {
    const icons: Record<string, any> = {
      clock: ClockIcon,
      'arrow-path': ArrowPathIcon,
      eye: EyeIcon,
      check: CheckIcon
    }
    return icons[props.icon] || ClockIcon
  })
  
  const textColor = computed(() => {
    return {
      gray: 'text-gray-600',
      blue: 'text-blue-600',
      yellow: 'text-yellow-600',
      green: 'text-green-600',
      red: 'text-red-600'
    }[props.color]
  })
  
  const iconBgColor = computed(() => {
    return {
      gray: 'bg-gray-100',
      blue: 'bg-blue-100',
      yellow: 'bg-yellow-100',
      green: 'bg-green-100',
      red: 'bg-red-100'
    }[props.color]
  })
  
  const iconColor = computed(() => {
    return {
      gray: 'text-gray-600',
      blue: 'text-blue-600',
      yellow: 'text-yellow-600',
      green: 'text-green-600',
      red: 'text-red-600'
    }[props.color]
  })
  </script>