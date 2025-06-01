<template>
  <div class="min-h-screen bg-gradient-to-b from-[#174e65] to-[#5fa7ff] flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md">
      <!-- Header -->
      <div class="bg-[#174e65] p-6 text-center">
        <h1 class="text-3xl font-redressed text-white">Daftar Kandidat</h1>
        <p class="text-white/80 mt-2 font-redressed">Buat akun untuk mengikuti tes online</p>
      </div>
      
      <!-- Register Form -->
      <div class="p-8">
        <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg font-redressed">
          {{ error }}
        </div>
        
        <form @submit.prevent="handleRegister">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label for="firstName" class="block text-gray-700 font-redressed mb-2">Nama Depan</label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed"
                placeholder="John"
                required
              />
            </div>
            
            <div>
              <label for="lastName" class="block text-gray-700 font-redressed mb-2">Nama Belakang</label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-redressed mb-2">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed"
              placeholder="email@example.com"
              required
            />
          </div>
          
          <div class="mb-4">
            <label for="phone" class="block text-gray-700 font-redressed mb-2">Nomor Telepon</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed"
              placeholder="081234567890"
              required
            />
          </div>
          
          <div class="mb-4">
            <label for="password" class="block text-gray-700 font-redressed mb-2">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed"
              placeholder="••••••••"
              required
            />
            <p class="text-xs text-gray-500 mt-1 font-redressed">Minimal 8 karakter</p>
          </div>
          
          <div class="mb-6">
            <label for="confirmPassword" class="block text-gray-700 font-redressed mb-2">Konfirmasi Password</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div class="flex items-center mb-6">
            <input
              id="terms"
              v-model="form.agreeTerms"
              type="checkbox"
              class="h-4 w-4 text-[#174e65] focus:ring-[#174e65] border-gray-300 rounded"
              required
            />
            <label for="terms" class="ml-2 block text-gray-700 text-sm font-redressed">
              Saya menyetujui <a href="#" class="text-[#174e65] hover:underline">Syarat dan Ketentuan</a>
            </label>
          </div>
          
          <button
            type="submit"
            class="w-full bg-[#174e65] text-white py-3 px-4 rounded-lg hover:bg-[#0d3648] transition-colors font-redressed text-lg shadow-md"
            :disabled="loading"
          >
            <span v-if="!loading">Daftar</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </span>
          </button>
        </form>
        
        <div class="mt-6 text-center">
          <p class="text-gray-600 font-redressed">
            Sudah punya akun?
            <NuxtLink to="/candidate/login" class="text-[#174e65] hover:underline font-redressed">
              Masuk sekarang
            </NuxtLink>
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="bg-gray-50 px-6 py-4 text-center">
        <p class="text-gray-600 text-sm font-redressed">
          © 2023 Gluon IT. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
});

const loading = ref(false);
const error = ref('');

const handleRegister = async () => {
  try {
    loading.value = true;
    error.value = '';

    // Validasi
    if (form.value.password !== form.value.confirmPassword) {
      throw new Error('Password dan konfirmasi password tidak sama');
    }

    // Simulasi registrasi
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Buat user baru
    const newUser = {
      name: `${form.value.firstName} ${form.value.lastName}`,
      email: form.value.email,
      phone: form.value.phone,
      role: 'candidate'
    };

    // Simpan ke localStorage (simulasi)
    localStorage.setItem('candidateAuth', JSON.stringify(newUser));
    
    // Redirect ke dashboard
    navigateTo('/candidate/dashboard');
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>