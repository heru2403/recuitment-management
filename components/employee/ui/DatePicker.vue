<template>
  <div class="relative">
    <input type="date" v-model="inputValue"
           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
           @change="handleChange">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'DatePicker',
  props: {
    modelValue: {
      type: [Date, String],
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref(formatDate(props.modelValue))

    watch(() => props.modelValue, (newVal) => {
      inputValue.value = formatDate(newVal)
    })

    const handleChange = () => {
      emit('update:modelValue', new Date(inputValue.value))
    }

    function formatDate(date: Date | string) {
      if (!date) return ''
      const d = new Date(date)
      const year = d.getFullYear()
      const month = `${d.getMonth() + 1}`.padStart(2, '0')
      const day = `${d.getDate()}`.padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    return {
      inputValue,
      handleChange
    }
  }
})
</script>