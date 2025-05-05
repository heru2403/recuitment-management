<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Role Management</h1>
      <button 
        @click="showAddRoleModal = true"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Role
      </button>
    </div>

    <!-- Roles Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Users
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="role in roles" :key="role.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ role.name }}</div>
                    <div class="text-sm text-gray-500">{{ role.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ role.description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ role.userCount }} users
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="(permission, index) in role.permissions.slice(0, 3)" 
                    :key="index"
                    class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                  >
                    {{ permission }}
                  </span>
                  <span 
                    v-if="role.permissions.length > 3"
                    class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                  >
                    +{{ role.permissions.length - 3 }} more
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editRole(role)" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                <button 
                  @click="confirmDeleteRole(role)" 
                  class="text-red-600 hover:text-red-900"
                  :disabled="role.protected"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Role Modal -->
    <Modal :isOpen="showAddRoleModal" title="Add New Role" @close="showAddRoleModal = false">
      <RoleForm 
        :permissions="availablePermissions"
        @submit="handleAddRole"
      />
    </Modal>

    <!-- Edit Role Modal -->
    <Modal :isOpen="showEditRoleModal" title="Edit Role" @close="showEditRoleModal = false">
      <RoleForm 
        :role="selectedRole"
        :permissions="availablePermissions"
        @submit="handleUpdateRole"
      />
    </Modal>

    <!-- Delete Confirmation Modal -->
    <ConfirmationDialog 
      v-model="showDeleteDialog"
      title="Delete Role"
      message="Are you sure you want to delete this role? Users with this role will be assigned the default role."
      @confirm="handleDeleteRole"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog.vue'

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  protected: boolean;
}

// Sample data - replace with actual API calls
const roles = ref<Role[]>([
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full access to all system features',
    userCount: 5,
    permissions: ['users.create', 'users.edit', 'users.delete', 'roles.manage', 'settings.manage'],
    protected: true
  },
  {
    id: 'editor',
    name: 'Editor',
    description: 'Can create and edit content',
    userCount: 12,
    permissions: ['content.create', 'content.edit', 'media.upload'],
    protected: false
  },
  // Add more roles...
])

const availablePermissions = ref([
  'users.create',
  'users.edit',
  'users.delete',
  'roles.manage',
  'settings.manage',
  'content.create',
  'content.edit',
  'content.delete',
  'media.upload',
  'media.manage'
])

// Modals
const showAddRoleModal = ref(false)
const showEditRoleModal = ref(false)
const showDeleteDialog = ref(false)
const selectedRole = ref<Role | null>(null)

// Methods
const editRole = (role: Role) => {
  selectedRole.value = {
    id: role.id,
    name: role.name,
    description: role.description,
    userCount: role.userCount,
    permissions: [...role.permissions],
    protected: role.protected
  }
  showEditRoleModal.value = true
}

const confirmDeleteRole = (role: Role) => {
  selectedRole.value = role
  showDeleteDialog.value = true
}

const handleAddRole = (roleData: Omit<Role, 'userCount' | 'protected'>) => {
  // In a real app, you would call an API here
  const newRole: Role = {
    ...roleData,
    userCount: 0,
    protected: false
  }
  roles.value.push(newRole)
  showAddRoleModal.value = false
}

const handleUpdateRole = (roleData: Omit<Role, 'userCount' | 'protected'>) => {
  if (!selectedRole.value) return
  
  const index = roles.value.findIndex(r => r.id === selectedRole.value!.id)
  if (index !== -1) {
    roles.value[index] = { 
      ...roles.value[index], 
      ...roleData 
    }
  }
  showEditRoleModal.value = false
}

const handleDeleteRole = () => {
  if (!selectedRole.value) return
  
  roles.value = roles.value.filter(r => r.id !== selectedRole.value!.id)
  showDeleteDialog.value = false
}

// Methods (keep your existing methods)

definePageMeta({
  layout: 'admin',
  title: 'Manajemen Role'
})
</script>