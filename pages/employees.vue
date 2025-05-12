<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />

    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <Header />
      
      <!-- Main content - Employee Management -->
      <main class="flex-1 overflow-y-auto" :class="[sidebarCollapsed ? 'ml-16' : 'ml-64']">
        <div class="p-6 bg-white rounded-lg shadow m-4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Manajemen Karyawan</h2>
            <div class="flex space-x-3">
              <button 
                @click="showAddEmployeeModal = true"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
              >
                <font-awesome-icon icon="user-plus" class="mr-2" />
                Tambah Karyawan
              </button>
              <button 
                @click="exportToExcel"
                class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
              >
                <font-awesome-icon icon="file-export" class="mr-2" />
                Export Excel
              </button>
            </div>
          </div>

          <div class="mb-4 flex justify-between items-center">
            <div class="relative w-64">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Cari karyawan..." 
                class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <font-awesome-icon icon="search" class="absolute left-3 top-3 text-gray-400" />
            </div>
            <div>
              <select v-model="departmentFilter" class="border rounded p-2">
                <option value="">Semua Departemen</option>
                <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
              </select>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departemen</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posisi</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="employee in filteredEmployees" :key="employee.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" :src="employee.photo || 'https://via.placeholder.com/40'" alt="">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ employee.name }}</div>
                        <div class="text-sm text-gray-500">{{ employee.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ employee.nik }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ employee.department }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ employee.position }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="statusClass(employee.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ employee.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button @click="viewEmployee(employee.id)" class="text-blue-600 hover:text-blue-900 mr-3">Detail</button>
                    <button @click="editEmployee(employee.id)" class="text-yellow-600 hover:text-yellow-900 mr-3">Edit</button>
                    <button @click="confirmTerminate(employee.id)" class="text-red-600 hover:text-red-900">Terminate</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="mt-4 flex justify-between items-center">
            <div class="text-sm text-gray-500">
              Menampilkan {{ filteredEmployees.length }} dari {{ employees.length }} karyawan
            </div>
            <div class="flex space-x-1">
              <button 
                @click="currentPage--" 
                :disabled="currentPage === 1"
                class="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button 
                v-for="page in totalPages" 
                :key="page"
                @click="currentPage = page"
                :class="{'bg-blue-600 text-white': currentPage === page}"
                class="px-3 py-1 border rounded"
              >
                {{ page }}
              </button>
              <button 
                @click="currentPage++" 
                :disabled="currentPage === totalPages"
                class="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          <!-- Add Employee Modal -->
          <EmployeeFormModal 
            v-if="showAddEmployeeModal"
            :employee="editingEmployee"
            @close="showAddEmployeeModal = false"
            @save="handleSaveEmployee"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import EmployeeFormModal from '@/components/EmployeeFormModal.vue'

interface Employee {
  id: number
  nik: string
  name: string
  email: string
  department: string
  position: string
  status: string
  joinDate: string
  photo?: string
}

export default defineComponent({
  name: 'EmployeeManagementPage',
  components: {
    FontAwesomeIcon,
    Sidebar,
    Header,
    EmployeeFormModal
  },
  setup() {
    // Sidebar state
    const sidebarCollapsed = ref(false)
    const toggleSidebar = () => {
      sidebarCollapsed.value = !sidebarCollapsed.value
    }

    // Employee management state
    const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations']
    const positions = ['Manager', 'Supervisor', 'Staff', 'Intern']

    const employees = ref<Employee[]>([
      {
        id: 1,
        nik: 'EMP001',
        name: 'Budi Santoso',
        email: 'budi.santoso@company.com',
        department: 'IT',
        position: 'Frontend Developer',
        status: 'Active',
        joinDate: '2020-05-15',
        photo: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      {
        id: 2,
        nik: 'EMP002',
        name: 'Ani Wijaya',
        email: 'ani.wijaya@company.com',
        department: 'HR',
        position: 'HR Manager',
        status: 'Active',
        joinDate: '2019-08-10',
        photo: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      {
        id: 3,
        nik: 'EMP003',
        name: 'Cahyo Pratama',
        email: 'cahyo.pratama@company.com',
        department: 'Finance',
        position: 'Finance Staff',
        status: 'Active',
        joinDate: '2021-02-20',
        photo: 'https://randomuser.me/api/portraits/men/2.jpg'
      }
    ])

    const showAddEmployeeModal = ref(false)
    const editingEmployee = ref<Employee | null>(null)
    const searchQuery = ref('')
    const departmentFilter = ref('')
    const currentPage = ref(1)
    const itemsPerPage = 10

    const filteredEmployees = computed(() => {
      let result = employees.value
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(e => 
          e.name.toLowerCase().includes(query) || 
          e.nik.toLowerCase().includes(query) ||
          e.email.toLowerCase().includes(query)
        )
      }
      
      if (departmentFilter.value) {
        result = result.filter(e => e.department === departmentFilter.value)
      }
      
      return result
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredEmployees.value.length / itemsPerPage)
    })

    const statusClass = (status: string) => {
      return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }

    const exportToExcel = () => {
      console.log('Exporting to Excel...')
      alert('Data karyawan telah diexport ke Excel')
    }

    const viewEmployee = (id: number) => {
      console.log('View employee:', id)
    }

    const editEmployee = (id: number) => {
      const employee = employees.value.find(e => e.id === id)
      if (employee) {
        editingEmployee.value = {...employee}
        showAddEmployeeModal.value = true
      }
    }

    const confirmTerminate = (id: number) => {
      if (confirm('Apakah Anda yakin ingin mengakhiri kontrak karyawan ini?')) {
        const index = employees.value.findIndex(e => e.id === id)
        if (index !== -1) {
          employees.value[index].status = 'Terminated'
        }
      }
    }

    const handleSaveEmployee = (employeeData: Employee) => {
      if (employeeData.id) {
        // Update existing employee
        const index = employees.value.findIndex(e => e.id === employeeData.id)
        if (index !== -1) {
          employees.value[index] = employeeData
        }
      } else {
        // Add new employee
        const newId = employees.value.length > 0 
          ? Math.max(...employees.value.map(e => e.id)) + 1 
          : 1
        employees.value.push({
          ...employeeData,
          id: newId,
          nik: `EMP${String(newId).padStart(3, '0')}`
        })
      }
      
      showAddEmployeeModal.value = false
      editingEmployee.value = null
    }

    return {
      sidebarCollapsed,
      toggleSidebar,
      departments,
      positions,
      employees,
      showAddEmployeeModal,
      editingEmployee,
      searchQuery,
      departmentFilter,
      currentPage,
      itemsPerPage,
      filteredEmployees,
      totalPages,
      statusClass,
      exportToExcel,
      viewEmployee,
      editEmployee,
      confirmTerminate,
      handleSaveEmployee
    }
  }
})
</script>