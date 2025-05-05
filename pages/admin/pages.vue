<template>
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Manajemen Halaman</h1>
        <button @click="showCreateModal = true" class="btn-primary">
          <PlusIcon class="icon" /> Tambah Halaman
        </button>
      </div>
  
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left">Judul</th>
              <th class="px-6 py-3 text-left">Slug</th>
              <th class="px-6 py-3 text-left">Status</th>
              <th class="px-6 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="page in pages" :key="page.id">
              <td class="px-6 py-4">{{ page.title }}</td>
              <td class="px-6 py-4">{{ page.slug }}</td>
              <td class="px-6 py-4">
                <span :class="statusClass(page.status)">
                  {{ page.status }}
                </span>
              </td>
              <td class="px-6 py-4 space-x-2">
                <button @click="editPage(page)" class="text-blue-600 hover:text-blue-900">
                  <PencilIcon class="w-5 h-5" />
                </button>
                <button @click="deletePage(page.id)" class="text-red-600 hover:text-red-900">
                  <TrashIcon class="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <Modal :show="showCreateModal" @close="showCreateModal = false">
        <PageForm @submit="handleSubmit" />
      </Modal>
    </div>
  </template>
  
  <script lang="ts" setup>
  definePageMeta({
    middleware: 'role',
    layout: 'admin'
  })
  
  interface Page {
    id: string
    title: string
    slug: string
    content: string
    status: 'draft' | 'published' | 'archived'
  }
  
  const pages = ref<Page[]>([])
  const showCreateModal = ref(false)
  
  const statusClass = (status: string) => {
    return {
      'px-2 py-1 rounded-full text-xs': true,
      'bg-yellow-100 text-yellow-800': status === 'draft',
      'bg-green-100 text-green-800': status === 'published',
      'bg-gray-100 text-gray-800': status === 'archived'
    }
  }

  const editPage = (page: Page) => {
    // Logic to handle editing a page
    console.log('Editing page:', page)
    showCreateModal.value = true
    // Populate form with page data if necessary
  }

  const handleSubmit = (formData: Page) => {
    // Logic to handle form submission
    console.log('Form submitted:', formData)
    pages.value.push({ ...formData, id: String(Date.now()) })
    showCreateModal.value = false
  }

  const deletePage = (id: string) => {
    // Logic to handle deleting a page
    console.log('Deleting page with id:', id)
    pages.value = pages.value.filter(page => page.id !== id)
  }
  
  const fetchPages = async () => {
    // Replace with API call
    pages.value = [
      { id: '1', title: 'Beranda', slug: 'home', content: '', status: 'published' },
      { id: '2', title: 'Tentang Kami', slug: 'about', content: '', status: 'published' }
    ]
  }
  
  onMounted(fetchPages)

  definePageMeta({
    layout: 'admin',
    title: 'Manajemen Halaman'
  })
  </script>