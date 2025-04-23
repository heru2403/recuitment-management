import { ref } from 'vue'

export const useDashboard = () => {
  const sidebarCollapsed = ref(false)
  
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  return {
    sidebarCollapsed,
    toggleSidebar
  }
}