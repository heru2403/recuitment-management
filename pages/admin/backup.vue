<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Database Backup</h1>
      <p class="text-gray-500 mt-1">Manage your system backups</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- Backup Now Card -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium">Create Backup</h2>
        </div>
        <div class="p-6">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Backup Type</label>
            <select 
              v-model="backupType"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="full">Full Backup (Database + Files)</option>
              <option value="database">Database Only</option>
              <option value="files">Files Only</option>
            </select>
          </div>
          <button 
            @click="createBackup"
            :disabled="isBackingUp"
            class="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <svg v-if="isBackingUp" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isBackingUp ? 'Creating Backup...' : 'Create Backup Now' }}
          </button>
        </div>
      </div>

      <!-- Backup Stats Card -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium">Backup Status</h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium text-gray-700">Storage Used</span>
                <span class="text-sm font-medium text-gray-700">{{ storageUsed }} of {{ storageLimit }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-indigo-600 h-2.5 rounded-full" :style="{ width: storagePercentage + '%' }"></div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 p-3 rounded">
                <div class="text-sm text-gray-500">Total Backups</div>
                <div class="text-2xl font-semibold">{{ backups.length }}</div>
              </div>
              <div class="bg-gray-50 p-3 rounded">
                <div class="text-sm text-gray-500">Last Backup</div>
                <div class="text-2xl font-semibold">{{ lastBackupDate || 'Never' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Auto Backup Card -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium">Auto Backup</h2>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <div class="text-sm font-medium text-gray-900">Enabled</div>
              <div class="text-sm text-gray-500">Automatically create backups on schedule</div>
            </div>
            <Switch 
              v-model="autoBackupEnabled"
              :class="autoBackupEnabled ? 'bg-indigo-600' : 'bg-gray-200'"
              class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span 
                aria-hidden="true"
                :class="autoBackupEnabled ? 'translate-x-5' : 'translate-x-0'"
                class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              />
            </Switch>
          </div>

          <div v-if="autoBackupEnabled" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
              <select 
                v-model="autoBackupFrequency"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Next Backup</label>
              <div class="px-3 py-2 bg-gray-50 rounded-md text-sm">
                {{ nextBackupDate }}
              </div>
            </div>
          </div>

          <button 
            @click="saveAutoBackupSettings"
            class="mt-4 w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>

    <!-- Backup List -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-lg font-medium">Available Backups</h2>
        <div class="relative">
          <button 
            @click="showBackupDropdown = !showBackupDropdown"
            class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            Sort by: {{ sortOptions.find(o => o.value === sortBy)?.label || 'Unknown' }}
            <svg class="ml-1 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <div 
            v-show="showBackupDropdown"
            class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          >
            <div class="py-1">
              <button 
                v-for="option in sortOptions"
                :key="option.value"
                @click="sortBackups(option.value)"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="backup in sortedBackups" :key="backup.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ backup.name }}</div>
                    <div class="text-sm text-gray-500">{{ backup.storage }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                  :class="backupTypeClass(backup.type)">
                  {{ backup.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ backup.size }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(backup.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="downloadBackup(backup)" class="text-indigo-600 hover:text-indigo-900 mr-3">Download</button>
                <button @click="restoreBackup(backup)" class="text-green-600 hover:text-green-900 mr-3">Restore</button>
                <button @click="deleteBackup(backup)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
        <div class="flex-1 flex justify-between sm:hidden">
          <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">1</span> to <span class="font-medium">{{ backups.length }}</span> of <span class="font-medium">{{ backups.length }}</span> results
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Restore Confirmation Modal -->
    <ConfirmationDialog 
      v-model="showRestoreDialog"
      title="Restore Backup"
      :message="selectedBackup ? `Are you sure you want to restore backup ${selectedBackup.name}? This will overwrite your current data.` : 'No backup selected'"
      confirmText="Restore"
      confirmColor="green"
      @confirm="confirmRestore"
      @cancel="showRestoreDialog = false"
    />

    <!-- Delete Confirmation Modal -->
    <ConfirmationDialog 
      v-model="showDeleteDialog"
      title="Delete Backup"
      :message="selectedBackup ? `Are you sure you want to delete backup ${selectedBackup.name}? This action cannot be undone.` : 'No backup selected'"
      confirmText="Delete"
      confirmColor="red"
      @confirm="confirmDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Switch } from '@headlessui/vue'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog.vue'

interface Backup {
  id: number
  name: string
  type: string
  size: string
  date: string
  storage: string
}

const backupType = ref('full')
const isBackingUp = ref(false)
const autoBackupEnabled = ref(true)
const autoBackupFrequency = ref('daily')
const showBackupDropdown = ref(false)
const sortBy = ref('date_desc')
const showRestoreDialog = ref(false)
const showDeleteDialog = ref(false)
const selectedBackup = ref<Backup | null>(null)

const sortOptions = ref([
  { value: 'name_asc', label: 'Name (A-Z)' },
  { value: 'name_desc', label: 'Name (Z-A)' },
  { value: 'date_asc', label: 'Date (Oldest)' },
  { value: 'date_desc', label: 'Date (Newest)' },
  { value: 'size_asc', label: 'Size (Smallest)' },
  { value: 'size_desc', label: 'Size (Largest)' }
])

// Sample data - replace with actual API calls
const backups = ref<Backup[]>([
  {
    id: 1,
    name: 'backup_20230515_full.zip',
    type: 'full',
    size: '2.4 GB',
    date: '2023-05-15T08:30:00Z',
    storage: 'local'
  },
  {
    id: 2,
    name: 'backup_20230514_db.sql',
    type: 'database',
    size: '1.2 GB',
    date: '2023-05-14T08:30:00Z',
    storage: 's3'
  }
])

const storageLimit = '10 GB'
const storageUsed = computed(() => {
  return '3.6 GB'
})

const storagePercentage = computed(() => {
  return 36
})

const lastBackupDate = computed(() => {
  if (backups.value.length === 0) return null
  const dates = backups.value.map(b => new Date(b.date))
  const latest = new Date(Math.max(...dates.map(date => date.getTime())))
  return latest.toLocaleDateString()
})

const nextBackupDate = computed(() => {
  const now = new Date()
  if (autoBackupFrequency.value === 'daily') {
    return new Date(now.setDate(now.getDate() + 1)).toLocaleDateString()
  } else if (autoBackupFrequency.value === 'weekly') {
    return new Date(now.setDate(now.getDate() + 7)).toLocaleDateString()
  } else {
    return new Date(now.setMonth(now.getMonth() + 1)).toLocaleDateString()
  }
})

const sortedBackups = computed(() => {
  const [field, order] = sortBy.value.split('_')
  return [...backups.value].sort((a, b) => {
    if (field === 'name') {
      return order === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    } else if (field === 'date') {
      return order === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (field === 'size') {
      const sizeA = parseFloat(a.size)
      const sizeB = parseFloat(b.size)
      return order === 'asc' ? sizeA - sizeB : sizeB - sizeA
    }
    return 0
  })
})

const backupTypeClass = (type: string) => {
  return {
    'bg-blue-100 text-blue-800': type === 'full',
    'bg-green-100 text-green-800': type === 'database',
    'bg-purple-100 text-purple-800': type === 'files'
  }
}

const formatDate = (dateString: string | number | Date) => {
  return new Date(dateString).toLocaleDateString()
}

const createBackup = () => {
  isBackingUp.value = true
  setTimeout(() => {
    const newBackup: Backup = {
      id: backups.value.length + 1,
      name: `backup_${new Date().toISOString().split('T')[0]}_${backupType.value}.${backupType.value === 'full' ? 'zip' : backupType.value === 'database' ? 'sql' : 'tar.gz'}`,
      type: backupType.value,
      size: `${(Math.random() * 2 + 1).toFixed(1)} GB`,
      date: new Date().toISOString(),
      storage: 'local'
    }
    backups.value.unshift(newBackup)
    isBackingUp.value = false
  }, 2000)
}

const saveAutoBackupSettings = () => {
  console.log('Auto backup settings saved')
}

const sortBackups = (sortValue: string) => {
  sortBy.value = sortValue
  showBackupDropdown.value = false
}

const downloadBackup = (backup: Backup) => {
  console.log('Downloading backup:', backup.name)
}

const restoreBackup = (backup: Backup) => {
  selectedBackup.value = backup
  showRestoreDialog.value = true
}

const deleteBackup = (backup: Backup) => {
  selectedBackup.value = backup
  showDeleteDialog.value = true
}

const confirmRestore = () => {
  if (!selectedBackup.value) {
    console.error('No backup selected for restoration.')
    showRestoreDialog.value = false
    return
  }
  
  console.log('Restoring backup:', selectedBackup.value.name)
  showRestoreDialog.value = false
}

const confirmDelete = () => {
  if (!selectedBackup.value) {
    console.error('No backup selected for deletion.')
    showDeleteDialog.value = false
    return
  }
  
  backups.value = backups.value.filter(b => b.id !== selectedBackup.value!.id)
  showDeleteDialog.value = false
}

// Methods (keep your existing methods)

definePageMeta({
  layout: 'admin',
  title: 'Manajemen Backup'
})
</script>