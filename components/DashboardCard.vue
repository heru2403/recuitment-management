<template>
    <div 
      class="p-6 rounded-lg shadow-sm border"
      :class="[
        colorClasses.background,
        colorClasses.text,
        isWarning ? 'border-yellow-200' : 'border-transparent'
      ]"
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium" :class="colorClasses.title">
            {{ title }}
          </p>
          <div class="flex items-baseline mt-1">
            <h2 class="text-3xl font-semibold">{{ value }}</h2>
            <span 
              v-if="change !== undefined"
              class="ml-2 text-sm"
              :class="change >= 0 ? 'text-green-600' : 'text-red-600'"
            >
              <i 
                :class="change >= 0 ? 'fas fa-caret-up' : 'fas fa-caret-down'" 
                class="mr-0.5"
              ></i>
              {{ Math.abs(change) }}%
            </span>
          </div>
        </div>
        <div 
          class="p-3 rounded-full"
          :class="colorClasses.iconBg"
        >
          <i :class="iconClasses" class="text-lg"></i>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    icon: {
      type: String as () => 'users' | 'user-check' | 'clock' | 'file' | 'database',
      required: true
    },
    color: {
      type: String,
      default: 'blue',
      validator: (value: string) => ['blue', 'green', 'yellow', 'red', 'purple'].includes(value)
    },
    change: {
      type: Number,
      default: undefined
    },
    isWarning: {
      type: Boolean,
      default: false
    }
  })
  
  const colorClasses = computed(() => {
    const colors = {
      blue: {
        background: 'bg-blue-50',
        text: 'text-blue-800',
        title: 'text-blue-600',
        iconBg: 'bg-blue-100'
      },
      green: {
        background: 'bg-green-50',
        text: 'text-green-800',
        title: 'text-green-600',
        iconBg: 'bg-green-100'
      },
      yellow: {
        background: 'bg-yellow-50',
        text: 'text-yellow-800',
        title: 'text-yellow-600',
        iconBg: 'bg-yellow-100'
      },
      red: {
        background: 'bg-red-50',
        text: 'text-red-800',
        title: 'text-red-600',
        iconBg: 'bg-red-100'
      },
      purple: {
        background: 'bg-purple-50',
        text: 'text-purple-800',
        title: 'text-purple-600',
        iconBg: 'bg-purple-100'
      }
    }
    return colors[props.color as keyof typeof colors] || colors.blue
  })
  
  const iconClasses = computed(() => {
    const icons = {
      users: 'fas fa-users',
      'user-check': 'fas fa-user-check',
      clock: 'fas fa-clock',
      file: 'fas fa-file-alt',
      database: 'fas fa-database'
    }
    return icons[props.icon as keyof typeof icons] || 'fas fa-info-circle'
  })
  </script>