<!-- src/components/StatsCard.vue -->
<template>
  <div class="bg-white rounded-lg shadow p-6 border-l-4" :class="borderColorClass">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-500">{{ title }}</p>
        <p class="mt-1 text-3xl font-semibold text-gray-900">{{ value }}</p>
        <p class="mt-2 text-sm" :class="textColorClass">{{ change }}</p>
      </div>
      <div class="p-3 rounded-full" :class="iconBgColorClass">
        <component :is="iconComponent" class="w-6 h-6" :class="iconColorClass" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import {
  UserGroupIcon,
  UserIcon,
  CalendarDaysIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'

export default defineComponent({
  name: 'StatsCard',
  props: {
    title: { type: String, required: true },
    value: { type: String, required: true },
    change: { type: String, required: true },
    icon: {
      type: String,
      required: true,
      validator: (value: string) => 
        ['user-friends', 'user-plus', 'calendar-check', 'exclamation-circle'].includes(value)
    },
    color: {
      type: String,
      required: true,
      validator: (value: string) => 
        ['primary', 'success', 'warning', 'danger'].includes(value)
    }
  },
  setup(props) {
    const iconComponent = computed(() => {
      switch(props.icon) {
        case 'user-friends': return UserGroupIcon
        case 'user-plus': return UserIcon
        case 'calendar-check': return CalendarDaysIcon
        case 'exclamation-circle': return ExclamationCircleIcon
        default: return UserGroupIcon
      }
    })

    const borderColorClass = computed(() => {
      return {
        primary: 'border-blue-500',
        success: 'border-green-500',
        warning: 'border-yellow-500',
        danger: 'border-red-500'
      }[props.color]
    })

    const textColorClass = computed(() => {
      return {
        primary: 'text-blue-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        danger: 'text-red-600'
      }[props.color]
    })

    const iconBgColorClass = computed(() => {
      return {
        primary: 'bg-blue-100',
        success: 'bg-green-100',
        warning: 'bg-yellow-100',
        danger: 'bg-red-100'
      }[props.color]
    })

    const iconColorClass = computed(() => {
      return {
        primary: 'text-blue-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        danger: 'text-red-600'
      }[props.color]
    })

    return {
      iconComponent,
      borderColorClass,
      textColorClass,
      iconBgColorClass,
      iconColorClass
    }
  }
})
</script>