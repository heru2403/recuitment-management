<template>
    <div class="bg-white rounded-lg shadow p-5">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-medium text-gray-500">{{ title }}</h3>
          <div class="mt-2">
            <span class="text-2xl font-bold text-gray-900">{{ amount }}</span>
            <span class="text-gray-500 ml-1">{{ currency }}</span>
          </div>
          <p v-if="date" class="text-sm text-gray-500 mt-1">{{ date }}</p>
        </div>
        <div class="p-2 rounded-lg" :class="iconBgColor">
          <component :is="iconComponent" class="w-6 h-6" :class="iconColor" />
        </div>
      </div>
      <div v-if="trend" class="mt-3 flex items-center text-sm">
        <ArrowTrendingUpIcon v-if="trend === 'up'" class="w-4 h-4 text-green-500" />
        <ArrowTrendingDownIcon v-else class="w-4 h-4 text-red-500" />
        <span class="ml-1" :class="trend === 'up' ? 'text-green-600' : 'text-red-600'">
          {{ percentage }}
        </span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import {
    CurrencyDollarIcon,
    BanknotesIcon,
    CalendarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon
  } from '@heroicons/vue/24/outline'
  
  const props = defineProps({
    title: String,
    amount: String,
    currency: {
      type: String,
      default: 'USD'
    },
    icon: {
      type: String,
      default: 'currency-dollar'
    },
    trend: {
      type: String,
      validator: (val: string) => ['up', 'down'].includes(val)
    },
    percentage: String,
    date: String
  })
  
  const iconComponent = computed(() => {
    const icons: Record<string, any> = {
      'currency-dollar': CurrencyDollarIcon,
      'banknotes': BanknotesIcon,
      'calendar': CalendarIcon
    }
    return icons[props.icon] || CurrencyDollarIcon
  })
  
  const iconBgColor = computed(() => {
    return {
      'currency-dollar': 'bg-green-100',
      'banknotes': 'bg-blue-100',
      'calendar': 'bg-purple-100'
    }[props.icon]
  })
  
  const iconColor = computed(() => {
    return {
      'currency-dollar': 'text-green-600',
      'banknotes': 'text-blue-600',
      'calendar': 'text-purple-600'
    }[props.icon]
  })
  </script>