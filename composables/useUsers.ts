// composables/useUsers.ts
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: string
  status: string
  lastActive: string
}

export const useUsers = () => {
  const users = ref<User[]>([
    {
      id: 1,
      name: 'Admin Utama',
      email: 'admin@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: 'admin',
      status: 'active',
      lastActive: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Editor Konten',
      email: 'editor@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      role: 'editor',
      status: 'active',
      lastActive: new Date(Date.now() - 86400000).toISOString() // 1 hari yang lalu
    },
    {
      id: 3,
      name: 'User Baru',
      email: 'new@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      role: 'viewer',
      status: 'pending',
      lastActive: new Date(Date.now() - 172800000).toISOString() // 2 hari yang lalu
    }
  ])

  const roles = ref([
    { id: 'admin', name: 'Administrator' },
    { id: 'editor', name: 'Editor' },
    { id: 'viewer', name: 'Viewer' }
  ])

  const pendingUsers = computed(() => {
    return users.value.filter(user => user.status === 'pending').length
  })

  const addUser = (userData: Omit<User, 'id' | 'avatar' | 'lastActive'>) => {
    const newUser: User = {
      id: users.value.length + 1,
      ...userData,
      avatar: `https://randomuser.me/api/portraits/${userData.role === 'admin' ? 'men' : 'women'}/${users.value.length + 1}.jpg`,
      lastActive: new Date().toISOString()
    }
    users.value.unshift(newUser)
  }

  const updateUser = (id: number, userData: Partial<User>) => {
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...userData }
    }
  }

  const deleteUser = (id: number) => {
    users.value = users.value.filter(u => u.id !== id)
  }

  return {
    users,
    roles,
    pendingUsers,
    addUser,
    updateUser,
    deleteUser
  }
}