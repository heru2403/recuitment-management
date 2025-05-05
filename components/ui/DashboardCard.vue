<template>
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <div class="flex items-center">
          <div
            class="flex-shrink-0 rounded-md p-3"
            :class="iconContainerClasses"
          >
            <component
              :is="iconComponent"
              class="h-6 w-6 text-white"
            />
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">
                {{ title }}
              </dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">
                  {{ value }}
                </div>
                <div
                  v-if="change"
                  class="ml-2 flex items-baseline text-sm font-semibold"
                  :class="changeColor"
                >
                  <component
                    :is="changeIcon"
                    class="self-center flex-shrink-0 h-5 w-5"
                    :class="changeIconColor"
                    aria-hidden="true"
                  />
                  <span class="sr-only">
                    {{ change > 0 ? 'Increased' : 'Decreased' }} by
                  </span>
                  {{ Math.abs(change) }}{{ changePercentage ? '%' : '' }}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import {
    ArrowUpIcon,
    ArrowDownIcon,
    UsersIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    ClockIcon,
    ServerIcon,
    FolderIcon
  } from '@heroicons/vue/24/outline'
  
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    icon: {
      type: String,
      default: 'users', // users, stats, money, time, server, database
      validator: (value: string) =>
        ['users', 'stats', 'money', 'time', 'server', 'database'].includes(value)
    },
    color: {
      type: String,
      default: 'indigo', // indigo, blue, green, yellow, red, purple
      validator: (value: string) =>
        ['indigo', 'blue', 'green', 'yellow', 'red', 'purple'].includes(value)
    },
    change: {
      type: Number,
      default: null
    },
    changePercentage: {
      type: Boolean,
      default: true
    }
  })
  
  const iconComponent = computed(() => {
    switch (props.icon) {
      case 'stats':
        return ChartBarIcon
      case 'money':
        return CurrencyDollarIcon
      case 'time':
        return ClockIcon
      case 'server':
        return ServerIcon
      case 'database':
        return FolderIcon
      default:
        return UsersIcon
    }
  })
  
  const iconContainerClasses = computed(() => {
    return {
      'bg-indigo-500': props.color === 'indigo',
      'bg-blue-500': props.color === 'blue',
      'bg-green-500': props.color === 'green',
      'bg-yellow-500': props.color === 'yellow',
      'bg-red-500': props.color === 'red',
      'bg-purple-500': props.color === 'purple'
    }
  })
  
  const changeIcon = computed(() => {
    return props.change >= 0 ? ArrowUpIcon : ArrowDownIcon
  })
  
  const changeColor = computed(() => {
    return props.change >= 0 ? 'text-green-600' : 'text-red-600'
  })
  
  const changeIconColor = computed(() => {
    return props.change >= 0 ? 'text-green-500' : 'text-red-500'
  })
  </script>