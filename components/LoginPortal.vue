<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div class="w-full max-w-md">
        <!-- Logo Section -->
        <div class="text-center mb-8">
          <div class="flex justify-center">
            <div class="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
          </div>
          <h1 class="mt-4 text-2xl font-bold text-gray-900">Enterprise Portal</h1>
          <p class="mt-1 text-sm text-gray-600">Masuk ke akun Anda</p>
        </div>
  
        <!-- Card Container -->
        <div class="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <!-- Role Selector -->
          <div class="px-6 pt-6">
            <div class="flex rounded-lg bg-gray-50 p-1">
              <button
                v-for="role in roles"
                :key="role.value"
                @click="selectRole(role.value)"
                :class="[
                  'flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  selectedRole === role.value
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                ]"
              >
                <div class="flex flex-col items-center">
                  <i :class="[role.icon, 'text-lg mb-1']"></i>
                  <span>{{ role.label }}</span>
                </div>
              </button>
            </div>
          </div>
  
          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="px-6 py-6 space-y-5">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="anda@perusahaan.com"
                />
              </div>
            </div>
  
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
  
            <!-- Additional fields for new employees -->
            <div v-if="showRegistrationCode" class="transition-all duration-300">
              <label for="registrationCode" class="block text-sm font-medium text-gray-700 mb-1">Kode Registrasi</label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-key text-gray-400"></i>
                </div>
                <input
                  id="registrationCode"
                  v-model="form.registrationCode"
                  type="text"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Kode dari HRD"
                />
              </div>
            </div>
  
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                  Ingat saya
                </label>
              </div>
  
              <div class="text-sm">
                <NuxtLink
                  to="/forgot-password"
                  class="font-medium text-blue-600 hover:text-blue-500"
                >
                  Lupa password?
                </NuxtLink>
              </div>
            </div>
  
            <div>
              <button
                type="submit"
                :disabled="isLoading"
                :class="[
                  'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
                  isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                ]"
              >
                <span v-if="!isLoading">Masuk</span>
                <span v-else class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </span>
              </button>
            </div>
          </form>
  
          <!-- Social Login Divider -->
          <div class="relative px-6">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-2 bg-white text-sm text-gray-500">
                atau lanjutkan dengan
              </span>
            </div>
          </div>
  
          <!-- Social Login Buttons -->
          <div class="px-6 pb-6 mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              @click="loginWithGoogle"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <i class="fab fa-google text-blue-600"></i>
              <span class="ml-2">Google</span>
            </button>
  
            <button
              type="button"
              @click="loginWithMicrosoft"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <i class="fab fa-microsoft text-blue-600"></i>
              <span class="ml-2">Microsoft</span>
            </button>
          </div>
  
          <!-- Footer Links -->
          <div class="bg-gray-50 px-6 py-4 rounded-b-xl border-t border-gray-200">
            <p class="text-xs text-gray-500 text-center">
              Belum memiliki akun? 
              <NuxtLink
                to="/register"
                class="font-medium text-blue-600 hover:text-blue-500"
              >
                Daftar sekarang
              </NuxtLink>
            </p>
          </div>
        </div>
  
        <!-- Copyright Notice -->
        <div class="mt-8 text-center text-xs text-gray-500">
          &copy; {{ new Date().getFullYear() }} Nama Perusahaan. All rights reserved.
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, reactive } from 'vue'
  
  interface RoleOption {
    value: string
    label: string
    icon: string
  }
  
  interface LoginForm {
    email: string
    password: string
    registrationCode?: string
    rememberMe: boolean
  }
  
  export default defineComponent({
    name: 'ProfessionalLoginPortal',
    setup() {
      const roles: RoleOption[] = [
        { value: 'karyawan', label: 'Karyawan', icon: 'fas fa-user' },
        { value: 'hrd', label: 'HRD', icon: 'fas fa-user-tie' },
        { value: 'admin', label: 'Admin', icon: 'fas fa-user-shield' }
      ]
  
      const selectedRole = ref<string>('karyawan')
      const showRegistrationCode = ref<boolean>(false)
      const isLoading = ref<boolean>(false)
  
      const form = reactive<LoginForm>({
        email: '',
        password: '',
        registrationCode: '',
        rememberMe: false
      })
  
      const selectRole = (role: string) => {
        selectedRole.value = role
        showRegistrationCode.value = role === 'karyawan' && form.email.includes('new')
      }
  
      const handleLogin = async () => {
        isLoading.value = true
        console.log('Login attempt with:', {
          role: selectedRole.value,
          ...form
        })
  
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
  
        isLoading.value = false
        
        // Simulate redirect based on role
        switch (selectedRole.value) {
          case 'admin':
            navigateTo('/admin/dashboard')
            break
          case 'hrd':
            navigateTo('/dashboard-hrd')
            break
          case 'karyawan':
            if (form.email.includes('new') || form.registrationCode) {
              navigateTo('/new-employee-welcome')
            } else {
              navigateTo('/employee/employee-dashboard')
            }
            break
          default:
            alert('Role tidak dikenali')
        }
      }
  
      const loginWithGoogle = () => {
        console.log('Login with Google')
        // Implement Google auth logic
      }
  
      const loginWithMicrosoft = () => {
        console.log('Login with Microsoft')
        // Implement Microsoft auth logic
      }
  
      return {
        roles,
        selectedRole,
        showRegistrationCode,
        isLoading,
        form,
        selectRole,
        handleLogin,
        loginWithGoogle,
        loginWithMicrosoft
      }
    }
  })
  </script>
  
  <style>
  /* Import Font Awesome */
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
  </style>