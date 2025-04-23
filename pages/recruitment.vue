<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar :collapsed="collapsed" @toggle="collapsed = !collapsed" />

    <!-- Main Content -->
    <div :class="[collapsed ? 'ml-16' : 'ml-64', 'flex-1 min-h-screen bg-gray-100 transition-all duration-300']">
      <Header />
      <div class="p-6 bg-white rounded-lg shadow m-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Rekrutmen Karyawan</h2>
          <button 
            @click="showAddCandidateModal = true"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
          >
            <font-awesome-icon icon="plus" class="mr-2" />
            Tambah Kandidat
          </button>
        </div>

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
              <tr v-for="candidate in candidates" :key="candidate.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full" :src="candidate.photo || 'https://via.placeholder.com/40'" alt="">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ candidate.name }}</div>
                      <div class="text-sm text-gray-500">{{ candidate.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ candidate.position }}</div>
                  <div class="text-sm text-gray-500">{{ candidate.department }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="statusClass(candidate.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ candidate.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(candidate.applicationDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="viewCandidate(candidate.id)" class="text-blue-600 hover:text-blue-900 mr-3">Detail</button>
                  <button @click="editCandidate(candidate.id)" class="text-yellow-600 hover:text-yellow-900 mr-3">Edit</button>
                  <button @click="deleteCandidate(candidate.id)" class="text-red-600 hover:text-red-900">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Add Candidate Modal -->
        <div v-if="showAddCandidateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div class="p-4 border-b flex justify-between items-center">
              <h3 class="text-lg font-medium">Tambah Kandidat Baru</h3>
              <button @click="showAddCandidateModal = false" class="text-gray-500 hover:text-gray-700">
                <font-awesome-icon icon="times" />
              </button>
            </div>
            <div class="p-4">
              <form @submit.prevent="handleAddCandidate">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input v-model="newCandidate.name" type="text" class="w-full border rounded p-2" required>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input v-model="newCandidate.email" type="email" class="w-full border rounded p-2" required>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Posisi</label>
                    <select v-model="newCandidate.position" class="w-full border rounded p-2" required>
                      <option value="">Pilih Posisi</option>
                      <option value="Frontend Developer">Frontend Developer</option>
                      <option value="Backend Developer">Backend Developer</option>
                      <option value="UX Designer">UX Designer</option>
                      <option value="HR Specialist">HR Specialist</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Departemen</label>
                    <select v-model="newCandidate.department" class="w-full border rounded p-2" required>
                      <option value="">Pilih Departemen</option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select v-model="newCandidate.status" class="w-full border rounded p-2" required>
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offered">Offered</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Lamar</label>
                    <input v-model="newCandidate.applicationDate" type="date" class="w-full border rounded p-2" required>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Resume/CV</label>
                    <input type="file" @change="handleFileUpload" class="w-full border rounded p-2">
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                    <textarea v-model="newCandidate.notes" class="w-full border rounded p-2" rows="3"></textarea>
                  </div>
                </div>
                <div class="mt-4 flex justify-end space-x-2">
                  <button @click="showAddCandidateModal = false" type="button" class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
                    Batal
                  </button>
                  <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Simpan
                  </button>
                </div>
              </form>
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
    const candidates = ref<Candidate[]>([ /* sample data */ ])
    const showAddCandidateModal = ref(false)
    const newCandidate = ref<Omit<Candidate, 'id'>>({
      name: '',
      email: '',
      position: '',
      department: '',
      status: 'Applied',
      applicationDate: new Date().toISOString().split('T')[0],
      notes: ''
    })

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
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('id-ID', options)
    }

    const handleAddCandidate = () => {
      const newId = candidates.value.length > 0 
        ? Math.max(...candidates.value.map(c => c.id)) + 1 
        : 1

      candidates.value.push({
        id: newId,
        ...newCandidate.value
      })

      showAddCandidateModal.value = false
      resetNewCandidate()
    }

    const resetNewCandidate = () => {
      newCandidate.value = {
        name: '',
        email: '',
        position: '',
        department: '',
        status: 'Applied',
        applicationDate: new Date().toISOString().split('T')[0],
        notes: ''
      }
    }

    const viewCandidate = (id: number) => {
      console.log('View candidate:', id)
    }

    const editCandidate = (id: number) => {
      console.log('Edit candidate:', id)
    }

    const deleteCandidate = (id: number) => {
      if (confirm('Apakah Anda yakin ingin menghapus kandidat ini?')) {
        candidates.value = candidates.value.filter(c => c.id !== id)
      }
    }

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files && target.files[0]) {
        const file = target.files[0]
        console.log('File uploaded:', file.name)
      }
    }

    return {
      collapsed,
      candidates,
      showAddCandidateModal,
      newCandidate,
      statusClass,
      formatDate,
      handleAddCandidate,
      viewCandidate,
      editCandidate,
      deleteCandidate,
      handleFileUpload
    }
  }
})
</script>