<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">System Settings</h1>
      <p class="text-gray-500 mt-1">Configure your application settings</p>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px">
          <button 
            v-for="tab in tabs"
            :key="tab.id"
            @click="currentTab = tab.id"
            :class="[currentTab === tab.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm']"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <div class="p-6">
        <!-- General Settings -->
        <div v-if="currentTab === 'general'">
          <div class="space-y-6">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Application Name</label>
                <input 
                  v-model="settings.general.appName"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select 
                  v-model="settings.general.timezone"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option v-for="tz in timezones" :key="tz" :value="tz">{{ tz }}</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Logo</label>
              <div class="flex items-center">
                <img :src="settings.general.logoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${settings.general.appName.replace(' ', '')}`" class="h-16 w-16 object-contain border border-gray-300 rounded">
                <button 
                  @click="showLogoUpload = true"
                  class="ml-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Maintenance Mode</label>
              <div class="flex items-center">
                <Switch 
                  v-model="settings.general.maintenanceMode"
                  :class="settings.general.maintenanceMode ? 'bg-indigo-600' : 'bg-gray-200'"
                  class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span 
                    aria-hidden="true"
                    :class="settings.general.maintenanceMode ? 'translate-x-5' : 'translate-x-0'"
                    class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  />
                </Switch>
                <span class="ml-3 text-sm text-gray-500">
                  {{ settings.general.maintenanceMode ? 'Enabled' : 'Disabled' }}
                </span>
              </div>
              <p class="mt-1 text-xs text-gray-500">When enabled, only administrators can access the system</p>
            </div>
          </div>
        </div>

        <!-- Email Settings -->
        <div v-else-if="currentTab === 'email'">
          <div class="space-y-6">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
                <input 
                  v-model="settings.email.smtpHost"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
                <input 
                  v-model="settings.email.smtpPort"
                  type="number" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SMTP Username</label>
                <input 
                  v-model="settings.email.smtpUsername"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SMTP Password</label>
                <input 
                  v-model="settings.email.smtpPassword"
                  type="password" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Encryption</label>
              <select 
                v-model="settings.email.encryption"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="none">None</option>
                <option value="tls">TLS</option>
                <option value="ssl">SSL</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">From Address</label>
              <input 
                v-model="settings.email.fromAddress"
                type="email" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">From Name</label>
              <input 
                v-model="settings.email.fromName"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
            </div>
          </div>
        </div>

        <!-- Authentication Settings -->
        <div v-else-if="currentTab === 'auth'">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">User Registration</label>
              <div class="flex items-center">
                <Switch 
                  v-model="settings.auth.allowRegistration"
                  :class="settings.auth.allowRegistration ? 'bg-indigo-600' : 'bg-gray-200'"
                  class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span 
                    aria-hidden="true"
                    :class="settings.auth.allowRegistration ? 'translate-x-5' : 'translate-x-0'"
                    class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  />
                </Switch>
                <span class="ml-3 text-sm text-gray-500">
                  {{ settings.auth.allowRegistration ? 'Allowed' : 'Not Allowed' }}
                </span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Verification</label>
              <div class="flex items-center">
                <Switch 
                  v-model="settings.auth.emailVerification"
                  :class="settings.auth.emailVerification ? 'bg-indigo-600' : 'bg-gray-200'"
                  class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span 
                    aria-hidden="true"
                    :class="settings.auth.emailVerification ? 'translate-x-5' : 'translate-x-0'"
                    class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  />
                </Switch>
                <span class="ml-3 text-sm text-gray-500">
                  {{ settings.auth.emailVerification ? 'Required' : 'Not Required' }}
                </span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Password Reset</label>
              <div class="flex items-center">
                <Switch 
                  v-model="settings.auth.passwordReset"
                  :class="settings.auth.passwordReset ? 'bg-indigo-600' : 'bg-gray-200'"
                  class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span 
                    aria-hidden="true"
                    :class="settings.auth.passwordReset ? 'translate-x-5' : 'translate-x-0'"
                    class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  />
                </Switch>
                <span class="ml-3 text-sm text-gray-500">
                  {{ settings.auth.passwordReset ? 'Allowed' : 'Not Allowed' }}
                </span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Default User Role</label>
              <select 
                v-model="settings.auth.defaultRole"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Backup Settings -->
        <div v-else-if="currentTab === 'backup'">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Auto Backup</label>
              <div class="flex items-center">
                <Switch 
                  v-model="settings.backup.autoBackup"
                  :class="settings.backup.autoBackup ? 'bg-indigo-600' : 'bg-gray-200'"
                  class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span 
                    aria-hidden="true"
                    :class="settings.backup.autoBackup ? 'translate-x-5' : 'translate-x-0'"
                    class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  />
                </Switch>
                <span class="ml-3 text-sm text-gray-500">
                  {{ settings.backup.autoBackup ? 'Enabled' : 'Disabled' }}
                </span>
              </div>
            </div>

            <div v-if="settings.backup.autoBackup">
              <label class="block text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
              <select 
                v-model="settings.backup.frequency"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Backup Retention</label>
              <input 
                v-model="settings.backup.retentionDays"
                type="number" 
                min="1"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
              <p class="mt-1 text-xs text-gray-500">Number of days to keep backups before deletion</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Backup Storage</label>
              <select 
                v-model="settings.backup.storage"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="local">Local Storage</option>
                <option value="s3">Amazon S3</option>
                <option value="google">Google Drive</option>
              </select>
            </div>

            <div v-if="settings.backup.storage === 's3'">
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">S3 Bucket Name</label>
                  <input 
                    v-model="settings.backup.s3Bucket"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">S3 Region</label>
                  <input 
                    v-model="settings.backup.s3Region"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 px-6 py-3 flex justify-end border-t border-gray-200">
        <button 
          @click="saveSettings"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Settings
        </button>
      </div>
    </div>

    <!-- Logo Upload Modal -->
    <Modal :isOpen="showLogoUpload" title="Upload Logo" @close="showLogoUpload = false">
      <div class="p-6">
        <div class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div class="space-y-1 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="flex text-sm text-gray-600">
              <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleLogoUpload">
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs text-gray-500">
              PNG, JPG, GIF up to 2MB
            </p>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@headlessui/vue'
import Modal from '@/components/ui/Modal.vue'

const tabs = ref([
  { id: 'general', name: 'General' },
  { id: 'email', name: 'Email' },
  { id: 'auth', name: 'Authentication' },
  { id: 'backup', name: 'Backup' }
])

const currentTab = ref('general')

const roles = ref([
  { id: 'admin', name: 'Administrator' },
  { id: 'editor', name: 'Editor' },
  { id: 'user', name: 'User' }
])

const timezones = ref([
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Shanghai'
])

const settings = ref({
  general: {
    appName: 'AdminPro',
    timezone: 'UTC',
    logoUrl: '',
    maintenanceMode: false
  },
  email: {
    smtpHost: '',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    encryption: 'tls',
    fromAddress: 'noreply@example.com',
    fromName: 'AdminPro System'
  },
  auth: {
    allowRegistration: true,
    emailVerification: true,
    passwordReset: true,
    defaultRole: 'user'
  },
  backup: {
    autoBackup: false,
    frequency: 'daily',
    retentionDays: 30,
    storage: 'local',
    s3Bucket: '',
    s3Region: ''
  }
})

const showLogoUpload = ref(false)

const saveSettings = async () => {
  // In a real app, you would call an API here
  console.log('Settings saved:', settings.value)
}

const handleLogoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    // In a real app, you would upload the file to your server
    const reader = new FileReader()
    reader.onload = (e) => {
      settings.value.general.logoUrl = (e.target as FileReader).result as string
      showLogoUpload.value = false
    }
    reader.readAsDataURL(file)
  }
}

// Methods (keep your existing methods)

definePageMeta({
  layout: 'admin',
  title: 'Manajemen Settings'
})
</script>