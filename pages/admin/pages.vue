<template>
  <div class="container mx-auto p-4">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Manajemen Halaman</h1>
        <p class="text-gray-600 mt-1">Kelola semua halaman website Anda di satu tempat</p>
      </div>
      <button 
        @click="openCreateModal" 
        class="btn-primary flex items-center gap-2"
      >
        <PlusIcon class="w-5 h-5" /> Tambah Halaman Baru
      </button>
    </div>

    <!-- Status Filter -->
    <div class="mb-6 flex flex-wrap gap-2">
      <button
        v-for="filter in statusFilters"
        :key="filter.value"
        @click="activeFilter = filter.value"
        :class="[
          'px-4 py-2 rounded-md text-sm font-medium transition-colors',
          activeFilter === filter.value
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        {{ filter.label }} ({{ getStatusCount(filter.value) }})
      </button>
    </div>

    <!-- Search and Bulk Actions -->
    <div class="mb-6 flex flex-col md:flex-row gap-4">
      <div class="relative flex-grow">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari halaman..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
        <MagnifyingGlassIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <div class="flex gap-2">
        <select
          v-model="bulkAction"
          class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Aksi Massal</option>
          <option value="publish">Publikasikan</option>
          <option value="archive">Arsipkan</option>
          <option value="delete">Hapus</option>
        </select>
        <button
          @click="applyBulkAction"
          :disabled="!bulkAction || selectedPages.length === 0"
          class="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Terapkan
        </button>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @change="toggleSelectAll"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                >
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Judul
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Terakhir Diubah
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="page in filteredPages" :key="page.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  v-model="selectedPages"
                  :value="page.id"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                >
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <span class="font-medium text-gray-900">{{ page.title }}</span>
                  <span v-if="page.isHomepage" class="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">Beranda</span>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-500">
                /{{ page.slug }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="statusClass(page.status)">
                  {{ statusLabels[page.status] }}
                </span>
              </td>
              <td class="px-6 py-4 text-gray-500">
                {{ formatDate(page.updatedAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end gap-3">
                  <button
                    v-if="!page.isHomepage"
                    @click="setAsHomepage(page)"
                    class="text-gray-600 hover:text-blue-600"
                    title="Jadikan Beranda"
                  >
                    <HomeIcon class="w-5 h-5" />
                  </button>
                  <button
                    @click="previewPage(page)"
                    class="text-gray-600 hover:text-indigo-900"
                    title="Pratinjau"
                  >
                    <EyeIcon class="w-5 h-5" />
                  </button>
                  <button
                    @click="editPage(page)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="Edit"
                  >
                    <PencilIcon class="w-5 h-5" />
                  </button>
                  <button
                    @click="duplicatePage(page)"
                    class="text-green-600 hover:text-green-900"
                    title="Duplikat"
                  >
                    <DocumentDuplicateIcon class="w-5 h-5" />
                  </button>
                  <button
                    @click="confirmDelete(page)"
                    class="text-red-600 hover:text-red-900"
                    title="Hapus"
                  >
                    <TrashIcon class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredPages.length === 0 && !isLoading">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                Tidak ada halaman yang ditemukan
              </td>
            </tr>
            <tr v-if="isLoading">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                <div class="flex justify-center">
                  <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="text-sm text-gray-700">
        Menampilkan <span class="font-medium">{{ pagination.startIndex + 1 }}</span> sampai 
        <span class="font-medium">{{ pagination.endIndex }}</span> dari 
        <span class="font-medium">{{ pagination.totalItems }}</span> halaman
      </div>
      <div class="flex gap-2">
        <button
          @click="prevPage"
          :disabled="pagination.currentPage === 1"
          class="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
        >
          Sebelumnya
        </button>
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-1 border rounded-md text-sm',
            pagination.currentPage === page ? 'bg-indigo-600 text-white border-indigo-600' : 'hover:bg-gray-100'
          ]"
        >
          {{ page }}
        </button>
        <button
          @click="nextPage"
          :disabled="pagination.currentPage === pagination.totalPages"
          class="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
        >
          Berikutnya
        </button>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <Modal 
      :show="showModal" 
      @close="closeModal"
      :title="modalTitle"
      size="lg"
    >
      <PageForm 
        v-if="showModal"
        :key="formKey"
        :initialData="currentPage ?? { 
          id: '', 
          title: '', 
          slug: '', 
          content: '', 
          status: 'draft', 
          isHomepage: false, 
          createdAt: '', 
          updatedAt: '' 
        }"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </Modal>

    <!-- Delete Confirmation Modal -->
    <ConfirmationModal
      :show="showDeleteModal"
      @close="showDeleteModal = false"
      @confirm="deletePage"
      title="Konfirmasi Penghapusan"
      confirmText="Hapus"
      cancelText="Batal"
      variant="danger"
    >
      <p>Anda yakin ingin menghapus halaman <strong>{{ pageToDelete?.title }}</strong>?</p>
      <p class="text-sm text-gray-600 mt-1">Aksi ini tidak dapat dibatalkan.</p>
    </ConfirmationModal>

    <!-- Set Homepage Confirmation Modal -->
    <ConfirmationModal
      :show="showHomepageModal"
      @close="showHomepageModal = false"
      @confirm="confirmSetHomepage"
      title="Atur Halaman Beranda"
      confirmText="Ya, Jadikan Beranda"
      cancelText="Batal"
    >
      <p>Anda yakin ingin menjadikan <strong>{{ pageToSetAsHomepage?.title }}</strong> sebagai halaman beranda?</p>
      <p class="text-sm text-gray-600 mt-1">Halaman beranda sebelumnya akan diubah menjadi halaman biasa.</p>
    </ConfirmationModal>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  DocumentDuplicateIcon
} from '@heroicons/vue/24/outline'
import Modal from '@/components/admin/Modal.vue'
import ConfirmationModal from '@/components/admin/ConfirmationModal.vue'
import PageForm from '~/components/admin/PageForm.vue'

interface Page {
  id: string
  title: string
  slug: string
  content: string
  status: 'draft' | 'published' | 'archived'
  isHomepage: boolean
  createdAt: string
  updatedAt: string
  seoTitle?: string
  seoDescription?: string
  featuredImage?: string
}

// State
const pages = ref<Page[]>([])
const showModal = ref(false)
const showDeleteModal = ref(false)
const showHomepageModal = ref(false)
const currentPage = ref<Page | null>(null)
const pageToDelete = ref<Page | null>(null)
const pageToSetAsHomepage = ref<Page | null>(null)
const formKey = ref(0)
const searchQuery = ref('')
const activeFilter = ref<string>('all')
const selectedPages = ref<string[]>([])
const selectAll = ref(false)
const bulkAction = ref('')
const isLoading = ref(false)

// Pagination
const pagination = ref({
  currentPage: 1,
  itemsPerPage: 5,
  totalItems: 0,
  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage)
  },
  get startIndex() {
    return (this.currentPage - 1) * this.itemsPerPage
  },
  get endIndex() {
    return Math.min(this.startIndex + this.itemsPerPage, this.totalItems)
  }
})

// Status labels
const statusLabels = {
  draft: 'Draf',
  published: 'Publik',
  archived: 'Arsip'
}

// Status filters
const statusFilters = [
  { value: 'all', label: 'Semua' },
  { value: 'published', label: 'Publik' },
  { value: 'draft', label: 'Draf' },
  { value: 'archived', label: 'Arsip' }
]

// Computed properties
const filteredPages = computed(() => {
  let result = pages.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(page => 
      page.title.toLowerCase().includes(query) || 
      page.slug.toLowerCase().includes(query)
    )
  }

  // Apply status filter
  if (activeFilter.value !== 'all') {
    result = result.filter(page => page.status === activeFilter.value)
  }

  // Update pagination total
  pagination.value.totalItems = result.length

  // Apply pagination
  return result.slice(
    pagination.value.startIndex,
    pagination.value.startIndex + pagination.value.itemsPerPage
  )
})

const visiblePages = computed(() => {
  const maxVisible = 5
  const pages = []
  let start = Math.max(1, pagination.value.currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(pagination.value.totalPages, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const modalTitle = computed(() => {
  return currentPage.value?.id ? 'Edit Halaman' : 'Buat Halaman Baru'
})

// Methods
const statusClass = (status: string) => {
  return {
    'px-3 py-1 rounded-full text-xs font-medium': true,
    'bg-yellow-100 text-yellow-800': status === 'draft',
    'bg-green-100 text-green-800': status === 'published',
    'bg-gray-100 text-gray-800': status === 'archived'
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const getStatusCount = (status: string) => {
  if (status === 'all') return pages.value.length
  return pages.value.filter(page => page.status === status).length
}

const openCreateModal = () => {
  if (showModal.value) {
    closeModal()
    setTimeout(() => {
      currentPage.value = {
        id: '',
        title: '',
        slug: '',
        content: '',
        status: 'draft',
        isHomepage: false,
        createdAt: '',
        updatedAt: ''
      }
      formKey.value++
      showModal.value = true
    }, 300)
  } else {
    currentPage.value = {
      id: '',
      title: '',
      slug: '',
      content: '',
      status: 'draft',
      isHomepage: false,
      createdAt: '',
      updatedAt: ''
    }
    formKey.value++
    showModal.value = true
  }
}

const editPage = (page: Page) => {
  if (showModal.value) {
    closeModal()
    setTimeout(() => {
      currentPage.value = { ...page }
      formKey.value++
      showModal.value = true
    }, 300)
  } else {
    currentPage.value = { ...page }
    formKey.value++
    showModal.value = true
  }
}

const duplicatePage = (page: Page) => {
  const newPage = {
    ...page,
    id: String(Date.now()),
    title: `${page.title} (Salinan)`,
    slug: `${page.slug}-copy`,
    isHomepage: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  pages.value.unshift(newPage)
}

const setAsHomepage = (page: Page) => {
  pageToSetAsHomepage.value = page
  showHomepageModal.value = true
}

const confirmSetHomepage = () => {
  if (!pageToSetAsHomepage.value) return
  
  // Reset all homepages first
  pages.value = pages.value.map(p => ({
    ...p,
    isHomepage: false
  }))
  
  // Set selected page as homepage
  const index = pages.value.findIndex(p => p.id === pageToSetAsHomepage.value?.id)
  if (index !== -1) {
    pages.value[index] = {
      ...pages.value[index],
      isHomepage: true,
      updatedAt: new Date().toISOString()
    }
  }
  
  showHomepageModal.value = false
  pageToSetAsHomepage.value = null
}

const previewPage = (page: Page) => {
  const slug = page.isHomepage ? '' : page.slug
  window.open(`/${slug}`, '_blank')
}

const confirmDelete = (page: Page) => {
  pageToDelete.value = { ...page }
  showDeleteModal.value = true
}

const deletePage = () => {
  if (pageToDelete.value) {
    pages.value = pages.value.filter(page => page.id !== pageToDelete.value?.id)
    selectedPages.value = selectedPages.value.filter(id => id !== pageToDelete.value?.id)
    showDeleteModal.value = false
    pageToDelete.value = null
  }
}

const closeModal = () => {
  showModal.value = false
  setTimeout(() => {
    currentPage.value = null
    formKey.value++
  }, 300)
}

const handleSubmit = (formData: Page) => {
  if (formData.id) {
    // Update existing page
    const index = pages.value.findIndex(p => p.id === formData.id)
    if (index !== -1) {
      pages.value[index] = {
        ...formData,
        updatedAt: new Date().toISOString()
      }
    }
  } else {
    // Add new page
    const newPage: Page = {
      ...formData,
      id: String(Date.now()),
      isHomepage: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    pages.value.unshift(newPage)
  }
  
  closeModal()
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedPages.value = filteredPages.value.map(page => page.id)
  } else {
    selectedPages.value = []
  }
}

const applyBulkAction = () => {
  if (!bulkAction.value || selectedPages.value.length === 0) return
  
  // Buat salinan baru dari array pages untuk memicu reaktivitas
  const updatedPages = [...pages.value]
  
  switch (bulkAction.value) {
    case 'publish':
      updatedPages.forEach(page => {
        if (selectedPages.value.includes(page.id)) {
          page.status = 'published'
          page.updatedAt = new Date().toISOString()
        }
      })
      pages.value = updatedPages
      break
      
    case 'archive':
      updatedPages.forEach(page => {
        if (selectedPages.value.includes(page.id)) {
          page.status = 'archived'
          page.updatedAt = new Date().toISOString()
        }
      })
      pages.value = updatedPages
      break
      
    case 'delete':
      // Filter untuk menghapus halaman yang dipilih
      pages.value = updatedPages.filter(page => !selectedPages.value.includes(page.id))
      break
  }
  
  // Reset seleksi
  selectedPages.value = []
  bulkAction.value = ''
  selectAll.value = false
}

// Pagination methods
const prevPage = () => {
  if (pagination.value.currentPage > 1) {
    pagination.value.currentPage--
  }
}

const nextPage = () => {
  if (pagination.value.currentPage < pagination.value.totalPages) {
    pagination.value.currentPage++
  }
}

const goToPage = (page: number) => {
  pagination.value.currentPage = page
}

// Initialize data
onMounted(() => {
  isLoading.value = true
  // Simulate API call
  setTimeout(() => {
    pages.value = [
      {
        id: '1',
        title: 'Beranda',
        slug: '',
        content: '<p>Selamat datang di website kami</p>',
        status: 'published',
        isHomepage: true,
        createdAt: '2023-05-15T10:30:00Z',
        updatedAt: '2023-06-20T14:45:00Z',
        seoTitle: 'Beranda - Website Kami',
        seoDescription: 'Selamat datang di website resmi kami'
      },
      {
        id: '2',
        title: 'Tentang Kami',
        slug: 'tentang-kami',
        content: '<p>Informasi tentang perusahaan kami</p>',
        status: 'published',
        isHomepage: false,
        createdAt: '2023-04-10T09:15:00Z',
        updatedAt: '2023-06-18T11:20:00Z'
      },
      {
        id: '3',
        title: 'Kontak',
        slug: 'kontak',
        content: '<p>Hubungi kami melalui form berikut</p>',
        status: 'published',
        isHomepage: false,
        createdAt: '2023-03-05T14:30:00Z',
        updatedAt: '2023-06-15T10:10:00Z'
      },
      {
        id: '4',
        title: 'Produk',
        slug: 'produk',
        content: '<p>Daftar produk kami</p>',
        status: 'draft',
        isHomepage: false,
        createdAt: '2023-06-01T08:20:00Z',
        updatedAt: '2023-06-22T16:30:00Z'
      },
      {
        id: '5',
        title: 'Blog',
        slug: 'blog',
        content: '<p>Artikel terbaru kami</p>',
        status: 'archived',
        isHomepage: false,
        createdAt: '2023-02-10T11:45:00Z',
        updatedAt: '2023-05-30T09:15:00Z'
      }
    ]
    isLoading.value = false
  }, 800)
})

// Watchers
watch(selectedPages, (newVal) => {
  selectAll.value = newVal.length === filteredPages.value.length && filteredPages.value.length > 0
})

watch([searchQuery, activeFilter], () => {
  pagination.value.currentPage = 1
})

definePageMeta({
  title: 'Halaman Admin - Manajemen Halaman',
  layout: 'admin'
})
</script>

<style scoped>
.btn-primary {
  @apply bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center;
}

.btn-secondary {
  @apply bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors;
}
</style>