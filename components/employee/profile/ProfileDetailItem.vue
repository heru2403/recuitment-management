<template>
  <div class="py-2" :class="{ 'col-span-2': fullWidth }">
    <label class="block text-sm font-medium text-gray-500 mb-1">{{ label }}</label>
    <p class="text-sm text-gray-900">{{ value || '-' }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProfileDetailItem',
  props: {
    label: String,
    value: String,
    fullWidth: Boolean
  }
})
</script>