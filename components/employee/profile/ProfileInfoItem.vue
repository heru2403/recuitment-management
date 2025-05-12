<template>
    <div class="flex items-start">
      <div class="flex-shrink-0 pt-1">
        <component :is="icon" class="w-5 h-5 text-gray-400" />
      </div>
      <div class="ml-3">
        <p class="text-sm text-gray-500">{{ label }}</p>
        <p class="text-sm font-medium text-gray-900">{{ value }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'ProfileInfoItem',
    props: {
      label: String,
      value: String,
      icon: {
        type: Object,
        required: true
      }
    }
  })
  </script>