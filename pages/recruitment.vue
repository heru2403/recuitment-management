<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar :collapsed="collapsed" @toggle="collapsed = !collapsed" />

    <!-- Main Content -->
    <div :class="[collapsed ? 'ml-16' : 'ml-64', 'flex-1 overflow-auto transition-all duration-300']">
      <Header />
      
      <div class="p-6">
        <!-- Header Section -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-white mb-2 md:mb-0">Rekrutmen Karyawan</h2>
          <button 
            @click="openAddModal"
            class="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 flex items-center shadow hover:shadow-md transition-all"
          >
            <font-awesome-icon icon="plus" class="mr-2" />
            Tambah Kandidat
          </button>
        </div>

        <!-- Table Section -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posisi</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lamar</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr 
                  v-for="candidate in candidates" 
                  :key="candidate.id"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full object-cover" :src="candidate.photo || 'https://via.placeholder.com/40'" alt="">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ candidate.name }}</div>
                        <div class="text-sm text-gray-500">{{ candidate.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 font-medium">{{ candidate.position }}</div>
                    <div class="text-sm text-gray-500">{{ candidate.department }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="statusClass(candidate.status)" class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ candidate.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(candidate.applicationDate) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button 
                        @click="viewCandidate(candidate)" 
                        class="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors"
                        title="Detail"
                      >
                        <font-awesome-icon icon="eye" />
                      </button>
                      <button 
                        @click="editCandidate(candidate)" 
                        class="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50 transition-colors"
                        title="Edit"
                      >
                        <font-awesome-icon icon="pen" />
                      </button>
                      <button 
                        @click="confirmDelete(candidate)" 
                        class="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                        title="Hapus"
                      >
                        <font-awesome-icon icon="trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Empty State -->
        <div 
          v-if="candidates.length === 0" 
          class="bg-white rounded-lg shadow-md p-8 text-center mt-4"
        >
          <div class="mx-auto w-24 h-24 text-gray-400 mb-4">
            <font-awesome-icon icon="user-friends" size="3x" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-1">Belum ada kandidat</h3>
          <p class="text-gray-500 mb-4">Mulai dengan menambahkan kandidat baru</p>
          <button 
            @click="openAddModal"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center mx-auto shadow hover:shadow-md transition-all"
          >
            <font-awesome-icon icon="plus" class="mr-2" />
            Tambah Kandidat
          </button>
        </div>
      </div>

      <!-- Add/Edit Candidate Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
            <h3 class="text-lg font-medium text-gray-900">
              {{ isEditing ? 'Edit Kandidat' : 'Tambah Kandidat Baru' }}
            </h3>
            <button 
              @click="closeModal" 
              class="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <font-awesome-icon icon="times" />
            </button>
          </div>
          <div class="p-6">
            <form @submit.prevent="handleSubmit">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Kolom 1 -->
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                    <input 
                      v-model="formData.name" 
                      type="text" 
                      class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input 
                      v-model="formData.email" 
                      type="email" 
                      class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Posisi *</label>
                    <select 
                      v-model="formData.position" 
                      class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                      <option value="">Pilih Posisi</option>
                      <option value="Frontend Developer">Frontend Developer</option>
                      <option value="Backend Developer">Backend Developer</option>
                      <option value="UX Designer">UX Designer</option>
                      <option value="HR Specialist">HR Specialist</option>
                      <option value="Marketing Specialist">Marketing Specialist</option>
                      <option value="Finance Analyst">Finance Analyst</option>
                    </select>
                  </div>
                </div>

                <!-- Kolom 2 -->
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Departemen *</label>
                    <select 
                      v-model="formData.department" 
                      class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                      <option value="">Pilih Departemen</option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select 
                      v-model="formData.status" 
                      class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offered">Offered</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Lamar *</label>
                    <input 
                      v-model="formData.applicationDate" 
                      type="date" 
                      class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                  </div>
                </div>

                <!-- Full Width Fields -->
                <div class="md:col-span-2 space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Foto Profil (URL)</label>
                    <input 
                      v-model="formData.photo" 
                      type="text" 
                      class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="https://example.com/photo.jpg"
                    >
                    <p class="mt-1 text-xs text-gray-500">Masukkan URL gambar atau biarkan kosong untuk menggunakan foto default</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Resume/CV</label>
                    <div class="flex items-center">
                      <label class="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors p-4">
                        <div class="flex flex-col items-center justify-center">
                          <font-awesome-icon icon="cloud-upload-alt" class="text-gray-400 text-2xl mb-2" />
                          <p class="text-sm text-gray-500">
                            <span class="font-semibold">Klik untuk upload</span> atau drag and drop
                          </p>
                          <p class="text-xs text-gray-500">PDF, DOCX (Max. 5MB)</p>
                        </div>
                        <input type="file" @change="handleFileUpload" class="hidden" accept=".pdf,.doc,.docx">
                      </label>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                    <textarea 
                      v-model="formData.notes" 
                      class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      rows="3"
                      placeholder="Tambahkan catatan tentang kandidat..."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="mt-6 flex justify-end space-x-3">
                <button 
                  @click="closeModal" 
                  type="button" 
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <font-awesome-icon icon="save" class="mr-2" />
                  {{ isEditing ? 'Update' : 'Simpan' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Detail Candidate Modal -->
      <div v-if="showDetailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
            <h3 class="text-lg font-medium text-gray-900">Detail Kandidat</h3>
            <button 
              @click="showDetailModal = false" 
              class="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <font-awesome-icon icon="times" />
            </button>
          </div>
          <div class="p-6">
            <div class="flex flex-col md:flex-row items-start mb-6 space-y-4 md:space-y-0 md:space-x-6">
              <img 
                :src="currentCandidate.photo || 'https://via.placeholder.com/150'" 
                class="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                alt=""
              >
              <div class="flex-1">
                <h4 class="text-xl font-bold text-gray-900">{{ currentCandidate.name }}</h4>
                <p class="text-gray-600 mb-2">{{ currentCandidate.email }}</p>
                <span 
                  :class="statusClass(currentCandidate.status)" 
                  class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ currentCandidate.status }}
                </span>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h5 class="font-medium text-gray-700 mb-2">Informasi Pekerjaan</h5>
                <div class="space-y-2">
                  <div>
                    <span class="text-sm text-gray-500">Posisi</span>
                    <p class="font-medium">{{ currentCandidate.position }}</p>
                  </div>
                  <div>
                    <span class="text-sm text-gray-500">Departemen</span>
                    <p class="font-medium">{{ currentCandidate.department }}</p>
                  </div>
                  <div>
                    <span class="text-sm text-gray-500">Tanggal Lamar</span>
                    <p class="font-medium">{{ formatDate(currentCandidate.applicationDate) }}</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <h5 class="font-medium text-gray-700 mb-2">Status Proses</h5>
                <div class="space-y-2">
                  <div>
                    <span class="text-sm text-gray-500">Status Terkini</span>
                    <p class="font-medium">{{ currentCandidate.status }}</p>
                  </div>
                  <div>
                    <span class="text-sm text-gray-500">Terakhir Diupdate</span>
                    <p class="font-medium">{{ formatDate(currentCandidate.applicationDate) }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg mb-6">
              <h5 class="font-medium text-gray-700 mb-2">Catatan</h5>
              <p class="whitespace-pre-line text-gray-800">
                {{ currentCandidate.notes || 'Tidak ada catatan' }}
              </p>
            </div>
            
            <div class="flex justify-end space-x-3">
              <button 
                @click="showDetailModal = false" 
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Tutup
              </button>
              <button 
                @click="editCandidate(currentCandidate)" 
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <font-awesome-icon icon="pen" class="mr-2" />
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div class="p-4 border-b">
            <h3 class="text-lg font-medium text-gray-900">Konfirmasi Penghapusan</h3>
          </div>
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="bg-red-100 p-3 rounded-full mr-3">
                <font-awesome-icon icon="exclamation-triangle" class="text-red-600 text-xl" />
              </div>
              <p class="text-gray-700">
                Apakah Anda yakin ingin menghapus kandidat <strong>{{ currentCandidate.name }}</strong>?
                <br>
                <span class="text-sm text-gray-500">Data yang dihapus tidak dapat dikembalikan.</span>
              </p>
            </div>
            <div class="flex justify-end space-x-3">
              <button 
                @click="showDeleteModal = false" 
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button 
                @click="deleteCandidate" 
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                <font-awesome-icon icon="trash" class="mr-2" />
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'

interface Candidate {
  id: number
  name: string
  email: string
  position: string
  department: string
  status: string
  applicationDate: string
  photo?: string
  notes?: string
}

export default defineComponent({
  name: 'RecruitmentPage',
  components: {
    FontAwesomeIcon,
    Sidebar,
    Header
  },
  setup() {
    const collapsed = ref(false)
    const showModal = ref(false)
    const showDetailModal = ref(false)
    const showDeleteModal = ref(false)
    const isEditing = ref(false)
    const currentCandidate = ref<Candidate>({} as Candidate)
    
    const formData = ref<Omit<Candidate, 'id'>>({
      name: '',
      email: '',
      position: '',
      department: '',
      status: 'Applied',
      applicationDate: new Date().toISOString().split('T')[0],
      notes: ''
    })

    const candidates = ref<Candidate[]>([
      {
        id: 1,
        name: 'Ahmad Fauzi',
        email: 'ahmad.fauzi@example.com',
        position: 'Frontend Developer',
        department: 'IT',
        status: 'Interview',
        applicationDate: '2023-05-15',
        photo: 'https://randomuser.me/api/portraits/men/32.jpg',
        notes: 'Pengalaman 3 tahun dengan Vue.js\n- Proyek terakhir: Aplikasi E-commerce\n- Gaji yang diharapkan: Rp 12.000.000'
      },
      {
        id: 2,
        name: 'Budi Santoso',
        email: 'budi.santoso@example.com',
        position: 'Backend Developer',
        department: 'IT',
        status: 'Applied',
        applicationDate: '2023-05-18',
        photo: 'https://randomuser.me/api/portraits/men/44.jpg',
        notes: 'Menguasai Node.js dan Python\n- Pengalaman dengan microservices\n- Tertarik dengan posisi fullstack'
      },
      {
        id: 3,
        name: 'Citra Dewi',
        email: 'citra.dewi@example.com',
        position: 'UX Designer',
        department: 'IT',
        status: 'Offered',
        applicationDate: '2023-05-10',
        photo: 'https://randomuser.me/api/portraits/women/65.jpg',
        notes: 'Portofolio sangat menarik\n- Juara hackathon UX 2022\n- Gaji yang diminta sesuai budget'
      },
      {
        id: 4,
        name: 'Dian Sastro',
        email: 'dian.sastro@example.com',
        position: 'HR Specialist',
        department: 'HR',
        status: 'Hired',
        applicationDate: '2023-04-28',
        photo: 'https://randomuser.me/api/portraits/women/33.jpg',
        notes: 'Sudah menerima tawaran dan akan bergabung bulan depan\n- Akan mulai tanggal 15 Juni 2023'
      },
      {
        id: 5,
        name: 'Eko Prasetyo',
        email: 'eko.prasetyo@example.com',
        position: 'Marketing Specialist',
        department: 'Marketing',
        status: 'Rejected',
        applicationDate: '2023-05-20',
        photo: 'https://randomuser.me/api/portraits/men/22.jpg',
        notes: 'Tidak memenuhi kualifikasi pengalaman\n- Hanya memiliki 1 tahun pengalaman\n- Akan dipertimbangkan untuk posisi junior'
      },
      {
        id: 6,
        name: 'Fitriani',
        email: 'fitriani@example.com',
        position: 'Finance Analyst',
        department: 'Finance',
        status: 'Interview',
        applicationDate: '2023-05-22',
        photo: 'https://randomuser.me/api/portraits/women/45.jpg',
        notes: 'Jadwal interview besok jam 10.00\n- Dengan tim Finance dan HR\n- Siapkan pertanyaan teknis akuntansi'
      },
      {
        id: 7,
        name: 'Gunawan',
        email: 'gunawan@example.com',
        position: 'Backend Developer',
        department: 'IT',
        status: 'Applied',
        applicationDate: '2023-05-23',
        photo: 'https://randomuser.me/api/portraits/men/55.jpg',
        notes: 'Fresh graduate dari Universitas Indonesia\n- IPK 3.8\n- Proyek akhir tentang sistem recommendation'
      },
      {
        id: 8,
        name: 'Hana Lestari',
        email: 'hana.lestari@example.com',
        position: 'Frontend Developer',
        department: 'IT',
        status: 'Interview',
        applicationDate: '2023-05-17',
        photo: 'https://randomuser.me/api/portraits/women/28.jpg',
        notes: 'Menguasai React dan Vue.js\n- 2 tahun pengalaman di startup\n- Tertarik dengan pekerjaan remote'
      }
    ])

    const statusClass = (status: string) => {
      const classes: Record<string, string> = {
        'Applied': 'bg-blue-100 text-blue-800',
        'Interview': 'bg-yellow-100 text-yellow-800',
        'Offered': 'bg-purple-100 text-purple-800',
        'Hired': 'bg-green-100 text-green-800',
        'Rejected': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }

    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      }
      return new Date(dateString).toLocaleDateString('id-ID', options)
    }

    const openAddModal = () => {
      isEditing.value = false
      resetForm()
      showModal.value = true
    }

    const viewCandidate = (candidate: Candidate) => {
      currentCandidate.value = { ...candidate }
      showDetailModal.value = true
    }

    const editCandidate = (candidate: Candidate) => {
      isEditing.value = true
      currentCandidate.value = { ...candidate }
      formData.value = {
        name: candidate.name,
        email: candidate.email,
        position: candidate.position,
        department: candidate.department,
        status: candidate.status,
        applicationDate: candidate.applicationDate,
        photo: candidate.photo,
        notes: candidate.notes
      }
      showModal.value = true
    }

    const confirmDelete = (candidate: Candidate) => {
      currentCandidate.value = { ...candidate }
      showDeleteModal.value = true
    }

    const deleteCandidate = () => {
      candidates.value = candidates.value.filter(c => c.id !== currentCandidate.value.id)
      showDeleteModal.value = false
    }

    const handleSubmit = () => {
      if (isEditing.value) {
        // Update existing candidate
        const index = candidates.value.findIndex(c => c.id === currentCandidate.value.id)
        if (index !== -1) {
          candidates.value[index] = {
            id: currentCandidate.value.id,
            ...formData.value
          }
        }
      } else {
        // Add new candidate
        const newId = candidates.value.length > 0 
          ? Math.max(...candidates.value.map(c => c.id)) + 1 
          : 1

        candidates.value.push({
          id: newId,
          ...formData.value
        })
      }

      closeModal()
    }

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files && target.files[0]) {
        const file = target.files[0]
        console.log('File uploaded:', file.name)
        // Here you would typically upload the file to a server
      }
    }

    const resetForm = () => {
      formData.value = {
        name: '',
        email: '',
        position: '',
        department: '',
        status: 'Applied',
        applicationDate: new Date().toISOString().split('T')[0],
        notes: ''
      }
    }

    const closeModal = () => {
      showModal.value = false
      showDetailModal.value = false
      showDeleteModal.value = false
      resetForm()
    }

    return {
      collapsed,
      candidates,
      showModal,
      showDetailModal,
      showDeleteModal,
      isEditing,
      currentCandidate,
      formData,
      statusClass,
      formatDate,
      openAddModal,
      viewCandidate,
      editCandidate,
      confirmDelete,
      deleteCandidate,
      handleSubmit,
      handleFileUpload,
      closeModal
    }
  }
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Table row hover effect */
tr {
  transition: background-color 0.2s ease;
}

/* Button hover effects */
button {
  transition: all 0.2s ease;
}

/* Input focus effects */
input:focus, select:focus, textarea:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* Status badge animation */
.status-badge {
  transition: all 0.3s ease;
}

.status-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>