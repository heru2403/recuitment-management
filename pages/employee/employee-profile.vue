<template>
  <div class="employee-layout">
    <EmployeeSidebar :isOpen="sidebarOpen" />
    <EmployeeHeader @toggle-sidebar="toggleSidebar" />
    
    <main class="main-content ml-0 md:ml-64 pt-16 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 py-6">
        <!-- Profile Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div class="flex items-center mb-4 md:mb-0">
            <UserCircleIcon class="w-10 h-10 text-gray-600 mr-3" />
            <div>
              <h1 class="text-2xl font-bold text-gray-800">My Profile</h1>
              <p class="text-gray-500">Employee ID: {{ employeeData.employeeId }}</p>
            </div>
          </div>
          <button class="btn-primary flex items-center">
            <PencilSquareIcon class="w-5 h-5 mr-2" />
            Edit Profile
          </button>
        </div>

        <!-- Profile Card -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div class="flex flex-col items-center">
                <img :src="employeeData.avatar" class="w-32 h-32 rounded-full mb-4 object-cover border-4 border-white shadow-md" />
                <h2 class="text-xl font-bold text-center">{{ employeeData.name }}</h2>
                <p class="text-gray-500 text-center mb-2">{{ employeeData.position }}</p>
                <span class="badge-success">{{ employeeData.status }}</span>
              </div>
              
              <div class="mt-6 space-y-4">
                <ProfileInfoItem label="Department" :value="employeeData.department" :icon="BuildingOfficeIcon" />
                <ProfileInfoItem label="Join Date" :value="employeeData.joinDate" :icon="CalendarIcon" />
                <ProfileInfoItem label="Email" :value="employeeData.email" :icon="EnvelopeIcon" />
                <ProfileInfoItem label="Phone" :value="employeeData.phone" :icon="PhoneIcon" />
              </div>
            </div>
          </div>

          <!-- Detail Sections -->
          <div class="lg:col-span-2 space-y-6">
            <ProfileSection title="Personal Information">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileDetailItem label="Date of Birth" :value="employeeData.personal.dob" />
                <ProfileDetailItem label="Gender" :value="employeeData.personal.gender" />
                <ProfileDetailItem label="Nationality" :value="employeeData.personal.nationality" />
                <ProfileDetailItem label="Marital Status" :value="employeeData.personal.maritalStatus" />
                <ProfileDetailItem label="Address" :value="employeeData.personal.address" class="md:col-span-2" />
              </div>
            </ProfileSection>

            <ProfileSection title="Emergency Contact">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileDetailItem label="Name" :value="employeeData.emergencyContact.name" />
                <ProfileDetailItem label="Relationship" :value="employeeData.emergencyContact.relationship" />
                <ProfileDetailItem label="Phone" :value="employeeData.emergencyContact.phone" />
                <ProfileDetailItem label="Email" :value="employeeData.emergencyContact.email" />
              </div>
            </ProfileSection>

            <ProfileSection title="Bank Information">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileDetailItem label="Bank Name" :value="employeeData.bank.bankName" />
                <ProfileDetailItem label="Account Number" :value="employeeData.bank.accountNumber" />
                <ProfileDetailItem label="Account Holder" :value="employeeData.bank.accountHolder" />
                <ProfileDetailItem label="Branch" :value="employeeData.bank.branch" />
              </div>
            </ProfileSection>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  UserCircleIcon,
  PencilSquareIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/vue/24/outline'
import EmployeeSidebar from '@/components/employee/EmployeeSidebar.vue'
import EmployeeHeader from '@/components/employee/EmployeeHeader.vue'
import ProfileInfoItem from '@/components/employee/profile/ProfileInfoItem.vue'
import ProfileSection from '@/components/employee/profile/ProfileSection.vue'
import ProfileDetailItem from '@/components/employee/profile/ProfileDetailItem.vue'

interface EmployeeData {
  name: string
  position: string
  status: string
  employeeId: string
  department: string
  joinDate: string
  email: string
  phone: string
  avatar: string
  personal: {
    dob: string
    gender: string
    nationality: string
    maritalStatus: string
    address: string
  }
  emergencyContact: {
    name: string
    relationship: string
    phone: string
    email: string
  }
  bank: {
    bankName: string
    accountNumber: string
    accountHolder: string
    branch: string
  }
}

export default defineComponent({
  name: 'EmployeeProfile',
  components: {
    EmployeeSidebar,
    EmployeeHeader,
    UserCircleIcon,
    PencilSquareIcon,
    BuildingOfficeIcon,
    CalendarIcon,
    EnvelopeIcon,
    PhoneIcon,
    ProfileInfoItem,
    ProfileSection,
    ProfileDetailItem
  },
  setup() {
    const sidebarOpen = ref(true)

    const employeeData: EmployeeData = {
      name: 'John Doe',
      position: 'Senior Frontend Developer',
      status: 'Active',
      employeeId: 'EMP-2048',
      department: 'Engineering',
      joinDate: '15 March 2020',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      personal: {
        dob: '24 July 1990',
        gender: 'Male',
        nationality: 'American',
        maritalStatus: 'Single',
        address: '123 Main Street, San Francisco, CA 94107'
      },
      emergencyContact: {
        name: 'Jane Smith',
        relationship: 'Sister',
        phone: '+1 (555) 987-6543',
        email: 'jane.smith@example.com'
      },
      bank: {
        bankName: 'Chase Bank',
        accountNumber: '**** 4567',
        accountHolder: 'John Doe',
        branch: 'San Francisco Downtown'
      }
    }

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value
    }

    return {
      sidebarOpen,
      employeeData,
      toggleSidebar,
      // Expose icons to template
      BuildingOfficeIcon,
      CalendarIcon,
      EnvelopeIcon,
      PhoneIcon
    }
  }
})
</script>