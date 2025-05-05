<template>
    <Modal
      :isOpen="modelValue"
      :title="title"
      :size="size"
      @update:isOpen="$emit('update:modelValue', $event)"
    >
      <div class="flex items-start">
        <div
          class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full"
          :class="iconContainerClasses"
        >
          <component
            :is="iconComponent"
            class="h-6 w-6"
            :class="iconClasses"
          />
        </div>
        <div class="ml-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ title }}
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              {{ message }}
            </p>
          </div>
        </div>
      </div>
  
      <template #footer>
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="onCancel"
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ cancelText }}
          </button>
          <button
            type="button"
            @click="onConfirm"
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm"
            :class="confirmButtonClasses"
          >
            {{ confirmText }}
          </button>
        </div>
      </template>
    </Modal>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import Modal from './Modal.vue'
// Ganti import:
import {
  ExclamationTriangleIcon as ExclamationIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/vue/24/outline'
 
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: 'Confirm Action'
    },
    message: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    variant: {
      type: String,
      default: 'danger', // danger, success, warning, info
      validator: (value: string) =>
        ['danger', 'success', 'warning', 'info'].includes(value)
    },
    size: {
      type: String,
      default: 'sm'
    }
  })
  
  const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])
  
  const iconComponent = computed(() => {
    switch (props.variant) {
      case 'success':
        return CheckCircleIcon
      case 'warning':
        return ExclamationIcon
      case 'info':
        return InformationCircleIcon
      default:
        return XCircleIcon
    }
  })
  
  const iconContainerClasses = computed(() => {
    return {
      'bg-red-100': props.variant === 'danger',
      'bg-green-100': props.variant === 'success',
      'bg-yellow-100': props.variant === 'warning',
      'bg-blue-100': props.variant === 'info'
    }
  })
  
  const iconClasses = computed(() => {
    return {
      'text-red-600': props.variant === 'danger',
      'text-green-600': props.variant === 'success',
      'text-yellow-600': props.variant === 'warning',
      'text-blue-600': props.variant === 'info'
    }
  })
  
  const confirmButtonClasses = computed(() => {
    return {
      'bg-red-600 hover:bg-red-700 focus:ring-red-500': props.variant === 'danger',
      'bg-green-600 hover:bg-green-700 focus:ring-green-500': props.variant === 'success',
      'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500': props.variant === 'warning',
      'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500': props.variant === 'info'
    }
  })
  
  const onConfirm = () => {
    emit('confirm')
    emit('update:modelValue', false)
  }
  
  const onCancel = () => {
    emit('cancel')
    emit('update:modelValue', false)
  }
  </script>