<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Manajemen User</h1>
      <button 
        @click="showAddUserModal = true"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Tambah User
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cari</label>
          <input 
            v-model="searchQuery"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Cari user..."
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select 
            v-model="roleFilter"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Semua Role</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select 
            v-model="statusFilter"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div class="flex items-end">
          <button 
            @click="resetFilters"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Terakhir Aktif
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in filteredUsers" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" :src="user.avatar" :alt="user.name">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.role }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                  :class="roleBadgeClass(user.role)">
                  {{ getRoleName(user.role) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                  :class="statusBadgeClass(user.status)">
                  {{ getStatusName(user.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.lastActive) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                <button @click="confirmDeleteUser(user)" class="text-red-600 hover:text-red-900">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add User Modal -->
    <Modal :isOpen="showAddUserModal" title="Tambah User Baru" @close="showAddUserModal = false">
      <UserForm 
        :roles="roles"
        @submit="handleAddUser"
      />
    </Modal>

    <!-- Edit User Modal -->
    <Modal :isOpen="showEditUserModal" title="Edit User" @close="showEditUserModal = false">
      <UserForm 
        :user="selectedUser"
        :roles="roles"
        @submit="handleUpdateUser"
      />
    </Modal>

    <!-- Delete Confirmation Modal -->
    <ConfirmationDialog 
      v-model="showDeleteDialog"
      title="Hapus User"
      message="Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak dapat dibatalkan."
      @confirm="handleDeleteUser"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUsers } from '@/composables/useUsers'
import Modal from '@/components/ui/Modal.vue'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog.vue'
import UserForm from '@/components/admin/UserForm.vue'

const { users, roles, pendingUsers, addUser, updateUser, deleteUser } = useUsers()

// Filters
const searchQuery = ref('')
const roleFilter = ref('')
const statusFilter = ref('')

// Modals
const showAddUserModal = ref(false)
const showEditUserModal = ref(false)
const showDeleteDialog = ref(false)
const selectedUser = ref<any>(null)

// Computed
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRole = !roleFilter.value || user.role === roleFilter.value
    const matchesStatus = !statusFilter.value || user.status === statusFilter.value
    
    return matchesSearch && matchesRole && matchesStatus
  })
})

// Methods
const resetFilters = () => {
  searchQuery.value = ''
  roleFilter.value = ''
  statusFilter.value = ''
}

const getRoleName = (roleId: string) => {
  const role = roles.value.find(r => r.id === roleId)
  return role ? role.name : roleId
}

const getStatusName = (status: string) => {
  const statusMap: Record<string, string> = {
    active: 'Aktif',
    inactive: 'Nonaktif',
    pending: 'Pending'
  }
  return statusMap[status] || status
}

const roleBadgeClass = (role: string) => {
  return {
    'bg-purple-100 text-purple-800': role === 'admin',
    'bg-blue-100 text-blue-800': role === 'editor',
    'bg-green-100 text-green-800': role === 'viewer'
  }
}

const statusBadgeClass = (status: string) => {
  return {
    'bg-green-100 text-green-800': status === 'active',
    'bg-yellow-100 text-yellow-800': status === 'pending',
    'bg-red-100 text-red-800': status === 'inactive'
  }
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

const editUser = (user: any) => {
  selectedUser.value = { ...user }
  showEditUserModal.value = true
}

const confirmDeleteUser = (user: any) => {
  selectedUser.value = user
  showDeleteDialog.value = true
}

const handleAddUser = (userData: any) => {
  addUser(userData)
  showAddUserModal.value = false
}

const handleUpdateUser = (userData: any) => {
  updateUser(selectedUser.value.id, userData)
  showEditUserModal.value = false
}

const handleDeleteUser = () => {
  deleteUser(selectedUser.value.id)
  showDeleteDialog.value = false
}

// Methods (keep your existing methods)

definePageMeta({
  layout: 'admin',
  title: 'Manajemen User'
})
</script>