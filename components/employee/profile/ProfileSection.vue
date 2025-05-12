<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
      <button v-if="editable" class="text-sm text-blue-600 hover:text-blue-800 flex items-center">
        <PencilSquareIcon class="w-4 h-4 mr-1" />
        Edit
      </button>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'

export default defineComponent({
  name: 'ProfileSection',
  props: {
    title: String,
    editable: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PencilSquareIcon
  }
})
</script>