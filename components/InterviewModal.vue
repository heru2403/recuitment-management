<template>
  <div 
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="onClose"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="p-4 border-b flex justify-between items-center">
        <h3 class="text-lg font-bold">{{ title }}</h3>
        <button @click="onClose" class="text-gray-500 hover:text-gray-700">
          <FontAwesomeIcon icon="times" />
        </button>
      </div>
      <div class="p-4" v-html="content"></div>
      <div class="p-4 border-t flex justify-end">
        <button 
          @click="onClose"
          class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InterviewModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const onClose = () => {
      emit('close')
    }

    return { onClose }
  }
})
</script>