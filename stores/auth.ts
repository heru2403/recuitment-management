import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    logout() {
      // Hapus token dari localStorage
      localStorage.removeItem('token')
      
      // Reset state
      this.user = null
      this.token = null
      
      // Lakukan cleanup lainnya
    }
  }
})