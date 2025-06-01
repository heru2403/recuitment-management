<template>
  <Modal :show="show" @close="onClose">
    <template #header>
      <slot name="title"></slot>
    </template>
    
    <template #body>
      <div class="text-sm text-gray-500">
        <slot name="content"></slot>
      </div>
    </template>
    
    <template #footer>
      <button
        type="button"
        @click="onClose"
        class="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Batal
      </button>
      <button
        type="button"
        @click="onConfirm"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <slot name="button"></slot>
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from './Modal.vue'

defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'confirmed'])

const onClose = () => {
  emit('close')
}

const onConfirm = () => {
  emit('confirmed')
}
</script>