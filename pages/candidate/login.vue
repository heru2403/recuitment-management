<template>
  <div class="min-h-screen bg-gradient-to-b from-[#174e65] to-[#5fa7ff] flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md">
      <!-- Header -->
      <div class="bg-[#174e65] p-6 text-center">
        <h1 class="text-3xl font-redressed text-white">Login Kandidat</h1>
        <p class="text-white/80 mt-2 font-redressed">Masuk untuk mengikuti tes online</p>
      </div>
      
      <!-- Login Form -->
      <div class="p-8">
        <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg font-redressed">
          {{ error }}
        </div>
        
        <form @submit.prevent="handleLogin">
          <div class="mb-6">
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
          
          <div class="mb-6">
            <label for="password" class="block text-gray-700 font-redressed mb-2">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center">
              <input
                id="remember"
                v-model="form.remember"
                type="checkbox"
                class="h-4 w-4 text-[#174e65] focus:ring-[#174e65] border-gray-300 rounded"
              />
              <label for="remember" class="ml-2 block text-gray-700 font-redressed">
                Ingat saya
              </label>
            </div>
            
            <NuxtLink to="/candidate/forgot-password" class="text-sm text-[#174e65] hover:underline font-redressed">
              Lupa password?
            </NuxtLink>
          </div>
          
          <button
            type="submit"
            class="w-full bg-[#174e65] text-white py-3 px-4 rounded-lg hover:bg-[#0d3648] transition-colors font-redressed text-lg shadow-md"
            :disabled="loading"
          >
            <span v-if="!loading">Masuk</span>
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
            Belum punya akun?
            <NuxtLink to="/candidate/register" class="text-[#174e65] hover:underline font-redressed">
              Daftar sekarang
            </NuxtLink>
          </p>
        </div>
        
        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500 font-redressed">
                Atau masuk dengan
              </span>
            </div>
          </div>
          
          <div class="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#174e65] font-redressed"
              @click="mockSocialLogin('google')"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              <span class="ml-2">Google</span>
            </button>
            
            <button
              type="button"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#174e65] font-redressed"
              @click="mockSocialLogin('linkedin')"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span class="ml-2">LinkedIn</span>
            </button>
          </div>
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
// Mock user data
const mockUsers = [
  {
    email: "kandidat@example.com",
    password: "password123",
    name: "John Doe",
    role: "candidate"
  },
  {
    email: "user@test.com",
    password: "test123",
    name: "Test User",
    role: "candidate"
  }
];

const form = ref({
  email: '',
  password: '',
  remember: false
});

const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = '';

    // Simulasi loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Cari user di mock data
    const user = mockUsers.find(u => 
      u.email === form.value.email && 
      u.password === form.value.password
    );

    if (!user) {
      throw new Error('Email atau password salah');
    }

    // Simpan ke localStorage jika remember me dicentang
    if (form.value.remember) {
      localStorage.setItem('candidateAuth', JSON.stringify(user));
    } else {
      sessionStorage.setItem('candidateAuth', JSON.stringify(user));
    }

    // Redirect ke dashboard
    return navigateTo('/candidate/dashboard');
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const mockSocialLogin = (provider) => {
  loading.value = true;
  
  // Simulasi login sosial
  setTimeout(() => {
    const socialUser = {
      email: `${provider}_user@example.com`,
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      role: "candidate",
      provider
    };
    
    localStorage.setItem('candidateAuth', JSON.stringify(socialUser));
    loading.value = false;
    navigateTo('/candidate/dashboard');
  }, 1500);
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Redressed&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.font-redressed {
  font-family: 'Redressed', cursive;
}
</style>