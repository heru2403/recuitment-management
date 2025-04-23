<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold mb-4">{{ formData.id ? 'Edit Karyawan' : 'Tambah Karyawan' }}</h3>
  
        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nama</label>
              <input v-model="formData.name" type="text" required class="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input v-model="formData.email" type="email" required class="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Departemen</label>
              <select v-model="formData.department" required class="w-full border rounded px-3 py-2">
                <option value="" disabled>Pilih Departemen</option>
                <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Posisi</label>
              <input v-model="formData.position" type="text" required class="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <select v-model="formData.status" required class="w-full border rounded px-3 py-2">
                <option value="Active">Active</option>
                <option value="Terminated">Terminated</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Foto (URL)</label>
              <input v-model="formData.photo" type="text" class="w-full border rounded px-3 py-2" />
            </div>
          </div>
  
          <div class="flex justify-end mt-6 space-x-2">
            <button @click="$emit('close')" type="button" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Batal</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch, type PropType } from 'vue'
  
  interface Employee {
    id?: number
    nik?: string
    name: string
    email: string
    department: string
    position: string
    status: string
    joinDate?: string
    photo?: string
  }
  
  export default defineComponent({
    name: 'EmployeeFormModal',
    props: {
      employee: {
        type: Object as PropType<Employee | null>,
        default: null
      }
    },
    emits: ['close', 'save'],
    setup(props, { emit }) {
      const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations']
      const formData = ref<Employee>({
        name: '',
        email: '',
        department: '',
        position: '',
        status: 'Active',
        photo: ''
      })
  
      watch(() => props.employee, (newVal) => {
        if (newVal) {
          formData.value = { ...newVal }
        } else {
          formData.value = {
            name: '',
            email: '',
            department: '',
            position: '',
            status: 'Active',
            photo: ''
          }
        }
      }, { immediate: true })
  
      const handleSubmit = () => {
        emit('save', formData.value)
      }
  
      return {
        formData,
        departments,
        handleSubmit
      }
    }
  })
  </script>
  
  <style scoped>
  /* Optional: Tambahkan animasi atau styling tambahan di sini */
  </style>
  