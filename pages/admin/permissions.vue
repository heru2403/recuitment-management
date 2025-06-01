<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Manajemen Izin Akses</h1>
      
      <button
        @click="openAddModal"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
      >
        <PlusIcon class="w-5 h-5 mr-1" />
        Tambah Izin
      </button>
    </div>

    <!-- Filter Section -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cari Izin</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari berdasarkan nama izin..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @input="applyFilters"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            v-model="selectedRole"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="applyFilters"
          >
            <option value="">Semua Role</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>
        </div>
        
        <div class="flex items-end">
          <button
            @click="resetFilters"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Permission Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Izin
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deskripsi
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role yang Memiliki
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="permission in paginatedPermissions" :key="permission.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ permission.name }}</div>
                <div class="text-sm text-gray-500">{{ permission.code }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ permission.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="role in permission.roles"
                    :key="role.id"
                    class="px-2 py-1 text-xs rounded-full"
                    :class="roleColor(role.name)"
                  >
                    {{ role.name }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex space-x-2">
                  <button
                    @click="editPermission(permission)"
                    class="text-yellow-600 hover:text-yellow-900"
                    title="Edit"
                  >
                    <PencilIcon class="w-5 h-5" />
                  </button>
                  
                  <button
                    @click="confirmDelete(permission)"
                    class="text-red-600 hover:text-red-900"
                    title="Hapus"
                  >
                    <TrashIcon class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
            
            <tr v-if="filteredPermissions.length === 0">
              <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">
                Tidak ada data izin yang ditemukan
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Menampilkan <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
              sampai <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span>
              dari <span class="font-medium">{{ totalItems }}</span> hasil
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Previous</span>
                <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="currentPage = page"
                :class="[page === currentPage ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50']"
                class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                {{ page }}
              </button>
              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Next</span>
                <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Permission Modal -->
    <Modal :show="showAddModal || showEditModal" @close="closeModal">
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">
          {{ showAddModal ? 'Tambah Izin Baru' : 'Edit Izin' }}
        </h3>
      </template>
      
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nama Izin*</label>
            <input
              v-model="form.name"
              type="text"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              :class="{'border-red-500': errors.name}"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Kode Izin*</label>
            <input
              v-model="form.code"
              type="text"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              :class="{'border-red-500': errors.code}"
            />
            <p v-if="errors.code" class="mt-1 text-sm text-red-600">{{ errors.code }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Role yang Memiliki Izin Ini</label>
            <div class="space-y-2">
              <div v-for="role in roles" :key="role.id" class="flex items-center">
                <input
                  :id="`role-${role.id}`"
                  v-model="form.roles"
                  type="checkbox"
                  :value="role.id"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label :for="`role-${role.id}`" class="ml-3 block text-sm font-medium text-gray-700">
                  {{ role.name }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <template #footer>
        <button
          type="button"
          @click="closeModal"
          class="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Batal
        </button>
        <button
          type="button"
          @click="submitForm"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memproses...
          </span>
          <span v-else>{{ showAddModal ? 'Simpan' : 'Update' }}</span>
        </button>
      </template>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <ConfirmationModal
      :show="showDeleteModal"
      @close="showDeleteModal = false"
      @confirmed="deletePermission"
    >
      <template #title>
        Konfirmasi Penghapusan
      </template>
      
      <template #content>
        Apakah Anda yakin ingin menghapus izin <strong>{{ permissionToDelete?.name }}</strong>? 
        Aksi ini tidak dapat dibatalkan.
      </template>
      
      <template #button>
        <span v-if="isDeleting">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Menghapus...
        </span>
        <span v-else>Hapus</span>
      </template>
    </ConfirmationModal>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { PlusIcon, PencilIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import Modal from '../../components/Modal.vue'

interface Permission {
  id: string
  name: string
  code: string
  description: string
  roles: Array<{ id: string; name: string }>
}

interface Role {
  id: string
  name: string
}

interface FormData {
  id?: string
  name: string
  code: string
  description: string
  roles: string[]
}

// Data
const permissions = ref<Permission[]>([])
const roles = ref<Role[]>([])
const searchQuery = ref('')
const selectedRole = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

// Form
const form = ref<FormData>({
  name: '',
  code: '',
  description: '',
  roles: []
})

const errors = ref<Record<string, string>>({})

// Modal states
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const permissionToDelete = ref<Permission | null>(null)

// Loading states
const isSubmitting = ref(false)
const isDeleting = ref(false)

// Computed
const filteredPermissions = computed(() => {
  let result = permissions.value
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.code.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    )
  }
  
  // Filter by selected role
  if (selectedRole.value) {
    result = result.filter(p => 
      p.roles.some(r => r.id === selectedRole.value)
    )
  }
  
  return result
})

const paginatedPermissions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredPermissions.value.slice(start, end)
})

const totalItems = computed(() => filteredPermissions.value.length)

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = 1
  let end = totalPages.value
  
  if (totalPages.value > maxVisible) {
    const half = Math.floor(maxVisible / 2)
    start = Math.max(currentPage.value - half, 1)
    end = Math.min(start + maxVisible - 1, totalPages.value)
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(end - maxVisible + 1, 1)
    }
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const roleColor = (roleName: string) => {
  switch (roleName.toLowerCase()) {
    case 'admin':
      return 'bg-purple-100 text-purple-800'
    case 'editor':
      return 'bg-blue-100 text-blue-800'
    case 'viewer':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const applyFilters = () => {
  currentPage.value = 1
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedRole.value = ''
  currentPage.value = 1
}

const openAddModal = () => {
  resetForm()
  showAddModal.value = true
}

const fetchPermissions = async () => {
  try {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    permissions.value = [
      {
        id: '1',
        name: 'Lihat Pengguna',
        code: 'view_users',
        description: 'Izin untuk melihat daftar pengguna',
        roles: [
          { id: '1', name: 'Admin' },
          { id: '2', name: 'Editor' }
        ]
      },
      {
        id: '2',
        name: 'Tambah Pengguna',
        code: 'create_users',
        description: 'Izin untuk menambahkan pengguna baru',
        roles: [
          { id: '1', name: 'Admin' }
        ]
      },
      {
        id: '3',
        name: 'Edit Pengguna',
        code: 'edit_users',
        description: 'Izin untuk mengedit data pengguna',
        roles: [
          { id: '1', name: 'Admin' },
          { id: '2', name: 'Editor' }
        ]
      },
      {
        id: '4',
        name: 'Hapus Pengguna',
        code: 'delete_users',
        description: 'Izin untuk menghapus pengguna',
        roles: [
          { id: '1', name: 'Admin' }
        ]
      },
      {
        id: '5',
        name: 'Kelola Izin',
        code: 'manage_permissions',
        description: 'Izin untuk mengelola hak akses',
        roles: [
          { id: '1', name: 'Admin' }
        ]
      }
    ]
  } catch (error) {
    console.error('Gagal mengambil data izin:', error)
    showToast('Gagal memuat data izin', 'error')
  }
}

const fetchRoles = async () => {
  try {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 300))
    
    roles.value = [
      { id: '1', name: 'Admin' },
      { id: '2', name: 'Editor' },
      { id: '3', name: 'Viewer' }
    ]
  } catch (error) {
    console.error('Gagal mengambil data role:', error)
    showToast('Gagal memuat data role', 'error')
  }
}

const editPermission = (permission: Permission) => {
  form.value = {
    id: permission.id,
    name: permission.name,
    code: permission.code,
    description: permission.description,
    roles: permission.roles.map(r => r.id)
  }
  showEditModal.value = true
}

const confirmDelete = (permission: Permission) => {
  permissionToDelete.value = permission
  showDeleteModal.value = true
}

const deletePermission = async () => {
  if (!permissionToDelete.value) return
  
  isDeleting.value = true
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    permissions.value = permissions.value.filter(p => p.id !== permissionToDelete.value?.id)
    showToast('Izin berhasil dihapus', 'success')
    
    showDeleteModal.value = false
    permissionToDelete.value = null
    
    if (paginatedPermissions.value.length === 0 && currentPage.value > 1) {
      currentPage.value--
    }
  } catch (error) {
    console.error('Gagal menghapus izin:', error)
    showToast('Gagal menghapus izin', 'error')
  } finally {
    isDeleting.value = false
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  resetForm()
}

const resetForm = () => {
  form.value = {
    name: '',
    code: '',
    description: '',
    roles: []
  }
  errors.value = {}
}

const validateForm = () => {
  errors.value = {}
  let isValid = true
  
  if (!form.value.name.trim()) {
    errors.value.name = 'Nama izin wajib diisi'
    isValid = false
  }
  
  if (!form.value.code.trim()) {
    errors.value.code = 'Kode izin wajib diisi'
    isValid = false
  } else if (!/^[a-z_]+$/.test(form.value.code)) {
    errors.value.code = 'Kode izin hanya boleh mengandung huruf kecil dan underscore'
    isValid = false
  }
  
  return isValid
}

const submitForm = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (showAddModal.value) {
      const newPermission: Permission = {
        id: Date.now().toString(),
        name: form.value.name,
        code: form.value.code,
        description: form.value.description,
        roles: roles.value.filter(r => form.value.roles.includes(r.id)).map(r => ({ id: r.id, name: r.name }))
      }
      permissions.value.unshift(newPermission)
      showToast('Izin berhasil ditambahkan', 'success')
    } else {
      const index = permissions.value.findIndex(p => p.id === form.value.id)
      if (index !== -1) {
        permissions.value[index] = {
          ...permissions.value[index],
          name: form.value.name,
          code: form.value.code,
          description: form.value.description,
          roles: roles.value.filter(r => form.value.roles.includes(r.id)).map(r => ({ id: r.id, name: r.name }))
        }
        showToast('Izin berhasil diperbarui', 'success')
      }
    }
    
    closeModal()
  } catch (error) {
    console.error('Gagal menyimpan izin:', error)
    showToast('Gagal menyimpan izin', 'error')
  } finally {
    isSubmitting.value = false
  }
}

const showToast = (message: string, type: 'success' | 'error') => {
  // In a real app, use a toast library like vue-toastification
  console.log(`${type.toUpperCase()}: ${message}`)
  // Example: this.$toast[type](message)
}

// Watch for changes in filtered data and adjust current page if needed
watch(filteredPermissions, () => {
  if (paginatedPermissions.value.length === 0 && currentPage.value > 1) {
    currentPage.value = Math.max(1, totalPages.value)
  }
})

// Lifecycle
onMounted(() => {
  fetchPermissions()
  fetchRoles()
})

definePageMeta({
  layout: 'admin',
  title: 'Manajemen Izin Akses'
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.bg-white {
  background-color: #fff;
}

.text-gray-800 {
  color: #1e293b;
}

.text-gray-500 {
  color: #64748b;
}

.text-gray-700 {
  color: #334155;
}

.text-gray-900 {
  color: #0f172a;
}

.border-red-500 {
  border-color: #ef4444;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>