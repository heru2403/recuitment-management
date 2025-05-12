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
                  New Leave Request
                  <button @click="closeModal" class="p-1 rounded-md hover:bg-gray-100">
                    <XMarkIcon class="w-5 h-5 text-gray-500" />
                  </button>
                </DialogTitle>
  
                <div class="mt-4 space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                    <select
                      v-model="leave.type"
                      class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="annual">Annual Leave</option>
                      <option value="sick">Sick Leave</option>
                      <option value="emergency">Emergency Leave</option>
                      <option value="maternity">Maternity Leave</option>
                    </select>
                  </div>
  
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        v-model="leave.startDate"
                        type="date"
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        v-model="leave.endDate"
                        type="date"
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Total Days</label>
                    <input
                      v-model="leave.days"
                      type="number"
                      class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      readonly
                    />
                  </div>
  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                    <textarea
                      v-model="leave.reason"
                      rows="3"
                      class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="Brief reason for your leave request..."
                    />
                  </div>
  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Attachment (if any)</label>
                    <input
                      type="file"
                      class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
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
                    @click="submitLeave"
                  >
                    Submit Request
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
    isOpen: Boolean
  })
  
  const emit = defineEmits(['close', 'submit'])
  
  const leave = ref({
    type: 'annual',
    startDate: '',
    endDate: '',
    days: 0,
    reason: ''
  })
  
  const closeModal = () => {
    emit('close')
  }
  
  const submitLeave = () => {
    emit('submit', leave.value)
    closeModal()
  }
  
  watch([() => leave.value.startDate, () => leave.value.endDate], ([start, end]) => {
    if (start && end) {
      const startDate = new Date(start)
      const endDate = new Date(end)
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      leave.value.days = diffDays
    }
  })
  </script>