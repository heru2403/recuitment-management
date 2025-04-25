<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div class="w-full max-w-2xl">
        <!-- Logo Section -->
        <div class="text-center mb-8">
          <div class="flex justify-center">
            <div class="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          <h1 class="mt-4 text-2xl font-bold text-gray-900">Registrasi Karyawan Baru</h1>
          <p class="mt-1 text-sm text-gray-600">Isi form berikut untuk membuat akun baru</p>
        </div>
  
        <!-- Card Container -->
        <div class="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <form @submit.prevent="handleSubmit" class="px-6 py-8">
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <!-- Personal Information -->
              <div class="sm:col-span-2">
                <h2 class="text-lg font-medium text-gray-900 mb-4">Informasi Pribadi</h2>
                <div class="border-t border-gray-200 pt-4 space-y-4">
                  <div>
                    <label for="full-name" class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-user text-gray-400"></i>
                      </div>
                      <input
                        id="full-name"
                        v-model="form.fullName"
                        type="text"
                        required
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Nama sesuai KTP"
                      />
                    </div>
                  </div>
  
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email Perusahaan</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-envelope text-gray-400"></i>
                      </div>
                      <input
                        id="email"
                        v-model="form.email"
                        type="email"
                        required
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="nama@perusahaan.com"
                      />
                    </div>
                  </div>
  
                  <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <label for="phone" class="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                      <div class="mt-1 relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i class="fas fa-phone text-gray-400"></i>
                        </div>
                        <input
                          id="phone"
                          v-model="form.phone"
                          type="tel"
                          required
                          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="0812-3456-7890"
                        />
                      </div>
                    </div>
  
                    <div>
                      <label for="birth-date" class="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                      <div class="mt-1 relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i class="fas fa-calendar text-gray-400"></i>
                        </div>
                        <input
                          id="birth-date"
                          v-model="form.birthDate"
                          type="date"
                          required
                          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Account Information -->
              <div class="sm:col-span-2">
                <h2 class="text-lg font-medium text-gray-900 mb-4">Informasi Akun</h2>
                <div class="border-t border-gray-200 pt-4 space-y-4">
                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-lock text-gray-400"></i>
                      </div>
                      <input
                        id="password"
                        v-model="form.password"
                        type="password"
                        required
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Minimal 8 karakter"
                      />
                    </div>
                    <p class="mt-1 text-xs text-gray-500">
                      Gunakan kombinasi huruf besar, kecil, angka, dan simbol
                    </p>
                  </div>
  
                  <div>
                    <label for="confirm-password" class="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-lock text-gray-400"></i>
                      </div>
                      <input
                        id="confirm-password"
                        v-model="form.confirmPassword"
                        type="password"
                        required
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Ketik ulang password"
                      />
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Employment Information -->
              <div class="sm:col-span-2">
                <h2 class="text-lg font-medium text-gray-900 mb-4">Informasi Pekerjaan</h2>
                <div class="border-t border-gray-200 pt-4 space-y-4">
                  <div>
                    <label for="employee-id" class="block text-sm font-medium text-gray-700">Nomor Induk Karyawan</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-id-card text-gray-400"></i>
                      </div>
                      <input
                        id="employee-id"
                        v-model="form.employeeId"
                        type="text"
                        required
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="NIK sesuai kontrak"
                      />
                    </div>
                  </div>
  
                  <div>
                    <label for="department" class="block text-sm font-medium text-gray-700">Departemen</label>
                    <select
                      id="department"
                      v-model="form.department"
                      required
                      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="" disabled selected>Pilih departemen</option>
                      <option value="hrd">HRD</option>
                      <option value="engineering">Engineering</option>
                      <option value="marketing">Marketing</option>
                      <option value="finance">Finance</option>
                      <option value="operations">Operations</option>
                    </select>
                  </div>
  
                  <div>
                    <label for="registration-code" class="block text-sm font-medium text-gray-700">Kode Registrasi</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-key text-gray-400"></i>
                      </div>
                      <input
                        id="registration-code"
                        v-model="form.registrationCode"
                        type="text"
                        required
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Dapatkan dari HRD"
                      />
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Terms and Conditions -->
              <div class="sm:col-span-2">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      v-model="form.agreeTerms"
                      type="checkbox"
                      required
                      class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div class="ml-3">
                    <label for="terms" class="block text-sm text-gray-700">
                      Saya menyetujui 
                      <a href="#" class="text-blue-600 hover:text-blue-500">Syarat & Ketentuan</a> dan 
                      <a href="#" class="text-blue-600 hover:text-blue-500">Kebijakan Privasi</a>
                    </label>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Submit Button -->
            <div class="mt-8">
              <button
                type="submit"
                :disabled="isLoading"
                :class="[
                  'w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
                  isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                ]"
              >
                <span v-if="!isLoading">Daftar Sekarang</span>
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
  
          <!-- Already have account -->
          <div class="bg-gray-50 px-6 py-4 rounded-b-xl border-t border-gray-200 text-center">
            <p class="text-xs text-gray-600">
              Sudah memiliki akun? 
              <NuxtLink
                to="/login"
                class="font-medium text-blue-600 hover:text-blue-500"
              >
                Masuk disini
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  
  const form = reactive({
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    employeeId: '',
    department: '',
    registrationCode: '',
    agreeTerms: false
  })
  
  const isLoading = ref(false)
  
  const handleSubmit = async () => {
    isLoading.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    isLoading.value = false
    navigateTo('/registration-success')
  }
  </script>
  
  <style>
  /* Import Font Awesome */
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
  </style>