<template>
    <div class="min-h-screen bg-gradient-to-b from-[#174e65] to-[#5fa7ff] flex items-center justify-center p-4">
      <LoginPortal 
        @login-success="handleLoginSuccess"
        @login-failed="handleLoginError"
      />
    </div>
  </template>
  
  <script setup>
  import LoginPortal from '@/components/LoginPortal.vue'
  
  const router = useRouter()
  const route = useRoute()
  
  // Handle position parameter if coming from job application
  const position = ref(null)
  
  onMounted(() => {
    if (route.query.position) {
      position.value = route.query.position
      // You can use this to pre-fill the position in the form
    }
  })
  
  const handleLoginSuccess = (userData) => {
    // Redirect based on user role
    switch(userData.role) {
      case 'admin':
        router.push('/admin/dashboard')
        break
      case 'hrd':
        router.push('/dashboard')
        break
      default:
        if (position.value) {
          router.push(`/apply?position=${position.value}`)
        } else {
          router.push('/dashboard')
        }
    }
  }
  
  const handleLoginError = (error) => {
    // Show error message
    console.error('Login failed:', error)
    // You can use a toast notification here
  }
  </script>