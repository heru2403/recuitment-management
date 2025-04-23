<template>
    <div class="logout-container">
      <p>Anda akan keluar dari sistem...</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '~/stores/auth' // Jika menggunakan Pinia
  
  export default defineComponent({
    name: 'LogoutView',
    setup() {
      const router = useRouter()
      const authStore = useAuthStore()
  
      onMounted(() => {
        // Proses logout
        authStore.logout()
        
        // Redirect ke halaman login setelah 2 detik
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      })
  
      return {}
    }
  })
  </script>