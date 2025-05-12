<template>
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div class="flex items-center">
        <div class="p-3 rounded-lg mr-4" :class="iconBgColor">
          <component :is="icon" class="w-6 h-6" :class="iconColor" />
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">{{ title }}</p>
          <p class="text-2xl font-bold mt-1" :class="textColor">{{ value }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue'
  
  export default defineComponent({
    name: 'AttendanceStatCard',
    props: {
      title: String,
      value: [String, Number],
      icon: {
        type: Object,
        required: true
      },
      color: {
        type: String,
        default: 'blue'
      }
    },
    setup(props) {
      const textColor = computed(() => {
        return {
          blue: 'text-blue-600',
          green: 'text-green-600',
          yellow: 'text-yellow-600',
          red: 'text-red-600'
        }[props.color]
      })
  
      const iconBgColor = computed(() => {
        return {
          blue: 'bg-blue-100',
          green: 'bg-green-100',
          yellow: 'bg-yellow-100',
          red: 'bg-red-100'
        }[props.color]
      })
  
      const iconColor = computed(() => {
        return {
          blue: 'text-blue-600',
          green: 'text-green-600',
          yellow: 'text-yellow-600',
          red: 'text-red-600'
        }[props.color]
      })
  
      return {
        textColor,
        iconBgColor,
        iconColor
      }
    }
  })
  </script>