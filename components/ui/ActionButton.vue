// components/ui/ActiomButton.vue
<template>
  <button
    type="button"
    @click="$emit('click')"
    class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    <component
      :is="iconComponent"
      class="mx-auto h-10 w-10"
      :class="iconClasses"
    />a
    <span class="mt-2 block text-sm font-medium text-gray-900">
      {{ label }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// Ganti import:
import {
  UserPlusIcon as UserAddIcon,
  Cog6ToothIcon as CogIcon,
  CircleStackIcon as DatabaseIcon,
  ArrowPathIcon as RefreshIcon,
  ShieldCheckIcon,
  DocumentChartBarIcon as DocumentReportIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'cog', // cog, user-add, database, refresh, shield, report
    validator: (value: string) =>
      ['cog', 'user-add', 'database', 'refresh', 'shield', 'report'].includes(
        value
      )
  },
  color: {
    type: String,
    default: 'indigo', // indigo, blue, green, red, yellow, purple
    validator: (value: string) =>
      ['indigo', 'blue', 'green', 'red', 'yellow', 'purple'].includes(value)
  }
})

const emit = defineEmits(['click'])

const iconComponent = computed(() => {
  switch (props.icon) {
    case 'user-add':
      return UserAddIcon
    case 'database':
      return DatabaseIcon
    case 'refresh':
      return RefreshIcon
    case 'shield':
      return ShieldCheckIcon
    case 'report':
      return DocumentReportIcon
    default:
      return CogIcon
  }
})

const iconClasses = computed(() => {
  return {
    'text-indigo-600': props.color === 'indigo',
    'text-blue-600': props.color === 'blue',
    'text-green-600': props.color === 'green',
    'text-red-600': props.color === 'red',
    'text-yellow-600': props.color === 'yellow',
    'text-purple-600': props.color === 'purple'
  }
})
</script>