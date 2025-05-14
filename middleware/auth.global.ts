export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const authRoutes = ['/candidate/dashboard'];
    
    if (authRoutes.some(route => to.path.startsWith(route))) {
      const authData = localStorage.getItem('candidateAuth') || sessionStorage.getItem('candidateAuth');
      if (!authData) {
        return navigateTo('/candidate/login');
      }
    }
  }
});