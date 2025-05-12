<template>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                >
                  {{ isEditMode ? 'Edit Task' : 'Create New Task' }}
                  <button @click="closeModal" class="p-1 rounded-md hover:bg-gray-100">
                    <XMarkIcon class="w-5 h-5 text-gray-500" />
                  </button>
                </DialogTitle>
  
                <div class="mt-4 space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                    <input
                      v-model="task.title"
                      type="text"
                      class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      v-model="task.description"
                      rows="3"
                      class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
  
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                      <input
                        v-model="task.dueDate"
                        type="date"
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        v-model="task.priority"
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                    <select
                      v-model="task.assignedTo"
                      class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="self">Myself</option>
                      <option value="team">Team</option>
                    </select>
                  </div>
                </div>
  
                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    @click="saveTask"
                  >
                    {{ isEditMode ? 'Update' : 'Create' }} Task
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup lang="ts">
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot
  } from '@headlessui/vue'
  import { XMarkIcon } from '@heroicons/vue/24/outline'
  
  const props = defineProps({
    isOpen: Boolean,
    isEditMode: {
      type: Boolean,
      default: false
    },
    taskData: {
      type: Object,
      default: () => ({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        assignedTo: 'self'
      })
    }
  })
  
  const emit = defineEmits(['close', 'save'])
  
  const task = ref({ ...props.taskData })
  
  const closeModal = () => {
    emit('close')
  }
  
  const saveTask = () => {
    emit('save', task.value)
    closeModal()
  }
  
  watch(() => props.taskData, (newVal) => {
    task.value = { ...newVal }
  }, { deep: true })
  </script>