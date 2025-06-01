<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-4">
      <!-- Title -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Judul Halaman *</label>
        <input
          type="text"
          id="title"
          v-model="form.title"
          @input="generateSlug"
          class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          required
          placeholder="Masukkan judul halaman"
        >
      </div>

      <!-- Slug -->
      <div>
        <label for="slug" class="block text-sm font-medium text-gray-700">Slug URL *</label>
        <div class="mt-1 flex rounded-md shadow-sm">
          <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">/</span>
          <input
            type="text"
            id="slug"
            v-model="form.slug"
            class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            required
            placeholder="slug-halaman"
          >
        </div>
      </div>

      <!-- Content -->
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700">Konten *</label>
        <textarea
          id="content"
          v-model="form.content"
          rows="8"
          class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          required
          placeholder="Masukkan konten halaman"
        ></textarea>
      </div>

      <!-- Status -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Status *</label>
        <div class="mt-1 space-y-2">
          <div class="flex items-center">
            <input
              id="published"
              v-model="form.status"
              type="radio"
              value="published"
              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
            >
            <label for="published" class="ml-2 block text-sm text-gray-700">Publikasikan</label>
          </div>
          <div class="flex items-center">
            <input
              id="draft"
              v-model="form.status"
              type="radio"
              value="draft"
              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
            >
            <label for="draft" class="ml-2 block text-sm text-gray-700">Simpan sebagai Draf</label>
          </div>
          <div class="flex items-center">
            <input
              id="archived"
              v-model="form.status"
              type="radio"
              value="archived"
              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
            >
            <label for="archived" class="ml-2 block text-sm text-gray-700">Arsipkan</label>
          </div>
        </div>
      </div>

      <!-- SEO Section -->
      <div class="border-t border-gray-200 pt-4">
        <h3 class="text-sm font-medium text-gray-700 mb-3">Pengaturan SEO</h3>
        
        <div class="space-y-4">
          <div>
            <label for="seoTitle" class="block text-sm font-medium text-gray-700">Judul SEO</label>
            <input
              type="text"
              id="seoTitle"
              v-model="form.seoTitle"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Judul untuk SEO (60 karakter)"
              maxlength="60"
            >
          </div>

          <div>
            <label for="seoDescription" class="block text-sm font-medium text-gray-700">Deskripsi SEO</label>
            <textarea
              id="seoDescription"
              v-model="form.seoDescription"
              rows="3"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Deskripsi untuk SEO (160 karakter)"
              maxlength="160"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Featured Image -->
      <div class="border-t border-gray-200 pt-4">
        <label class="block text-sm font-medium text-gray-700">Gambar Unggulan</label>
        <div class="mt-1 flex items-center">
          <div v-if="!form.featuredImage" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span class="mt-2 text-sm text-gray-500">Upload gambar</span>
          </div>
          <img v-else :src="form.featuredImage" alt="Featured Image" class="h-32 w-auto object-cover rounded-lg">
        </div>
        <div class="mt-2 flex gap-2">
          <button
            type="button"
            class="rounded-md border border-gray-300 bg-white py-1 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Pilih Gambar
          </button>
          <button
            v-if="form.featuredImage"
            type="button"
            @click="form.featuredImage = ''"
            class="rounded-md border border-gray-300 bg-white py-1 px-3 text-sm font-medium text-red-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Hapus
          </button>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          @click="$emit('cancel')"
          class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Batal
        </button>
        <button
          type="submit"
          class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {{ form.id ? 'Perbarui Halaman' : 'Simpan Halaman' }}
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

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

const props = defineProps({
  initialData: {
    type: Object as () => Page,
    required: true
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref<Page>({ ...props.initialData })

// Generate slug only for new pages (when id is empty)
const generateSlug = () => {
  if (!props.initialData.id) {
    form.value.slug = form.value.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove non-word chars
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, '') // Trim hyphens from start/end
  }
}

const handleSubmit = () => {
  emit('submit', form.value)
}

// Watch for initialData changes
watch(() => props.initialData, (newVal) => {
  form.value = { ...newVal }
}, { immediate: true, deep: true })
</script>