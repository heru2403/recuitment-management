<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Role Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Permissions</label>
        <div class="mt-2 space-y-2">
          <div v-for="permission in permissions" :key="permission" class="flex items-start">
            <div class="flex items-center h-5">
              <input
                :id="`permission-${permission}`"
                v-model="form.permissions"
                :value="permission"
                type="checkbox"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label :for="`permission-${permission}`" class="font-medium text-gray-700">{{ permission }}</label>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          @click="$emit('cancel')"
          class="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {{ role ? 'Update' : 'Create' }} Role
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  role: {
    type: Object as () => {
      id: string
      name: string
      description: string
      permissions: string[]
    },
    default: null
  },
  permissions: {
    type: Array as () => string[],
    required: true
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  name: '',
  description: '',
  permissions: [] as string[]
})

// Initialize form if editing an existing role
watch(() => props.role, (role) => {
  if (role) {
    form.value = {
      name: role.name,
      description: role.description,
      permissions: [...role.permissions]
    }
  } else {
    form.value = {
      name: '',
      description: '',
      permissions: []
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', {
    name: form.value.name,
    description: form.value.description,
    permissions: form.value.permissions
  })
}
</script>