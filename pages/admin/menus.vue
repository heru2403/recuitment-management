<template>
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Manajemen Menu</h1>
        <button @click="showCreateModal = true" class="btn-primary">
          <PlusIcon class="icon" /> Buat Menu Baru
        </button>
      </div>
  
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="menu in menus" :key="menu.id" class="bg-white rounded-lg shadow p-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold">{{ menu.name }}</h3>
            <div class="space-x-2">
              <button @click="editMenu(menu)" class="text-blue-600 hover:text-blue-900">
                <PencilIcon class="w-5 h-5" />
              </button>
              <button @click="deleteMenu(menu.id)" class="text-red-600 hover:text-red-900">
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <draggable v-model="menu.items" group="menu-items" @end="updateMenuOrder(menu)">
            <div v-for="item in menu.items" :key="item.id" class="border rounded p-2 mb-2 cursor-move">
              {{ item.title }} ({{ item.type }})
            </div>
          </draggable>
        </div>
      </div>
  
      <Modal :show="showCreateModal" @close="showCreateModal = false">
        <MenuForm @submit="handleMenuSubmit" />
      </Modal>
    </div>
  </template>
  
  <script lang="ts" setup>
  definePageMeta({
    middleware: 'role',
    layout: 'admin'
  })
  
  interface MenuItem {
    id: string
    title: string
    type: 'link' | 'page' | 'category'
    url: string
    order: number
  }
  
  interface Menu {
    id: string
    name: string
    location: string
    items: MenuItem[]
  }
  
  const menus = ref<Menu[]>([])
  const showCreateModal = ref(false)
  
  const fetchMenus = async () => {
    // Replace with API call
    menus.value = [
      {
        id: '1',
        name: 'Menu Utama',
        location: 'header',
        items: [
          { id: '1', title: 'Beranda', type: 'link', url: '/', order: 1 },
          { id: '2', title: 'Produk', type: 'link', url: '/products', order: 2 }
        ]
      }
    ]
  }

  const editMenu = (menu: Menu) => {
    // Logic to handle menu editing
    console.log('Editing menu:', menu)
  }

  const deleteMenu = (menuId: string) => {
    // Logic to handle menu deletion
    menus.value = menus.value.filter(menu => menu.id !== menuId)
    console.log('Deleted menu with ID:', menuId)
  }

  const updateMenuOrder = (menu: Menu) => {
    // Logic to handle menu item reordering
    menu.items.sort((a, b) => a.order - b.order)
    console.log('Updated menu order for:', menu)
  }

  const handleMenuSubmit = (newMenu: Menu) => {
    // Logic to handle menu submission
    menus.value.push(newMenu)
    showCreateModal.value = false
    console.log('New menu submitted:', newMenu)
  }
  
  onMounted(fetchMenus)

  definePageMeta({
  layout: 'admin',
  title: 'Manajemen Menu',
  })
  </script>