<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />

    <!-- Main content -->
    <div
      class="flex-1 flex flex-col overflow-hidden transition-all duration-300"
      :class="sidebarCollapsed ? 'ml-16' : 'ml-64'"
    >
      <!-- Header -->
      <Header />

      <!-- Main content area -->
      <main class="flex-1 overflow-y-auto p-4 md:p-8">
        <!-- Dashboard header -->
        <h1 class="text-2xl font-bold mb-6">HRD Dashboard</h1>

        <!-- Stats cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Karyawan"
            value="132"
            change="+8 from last month"
            icon="user-friends"
            color="primary"
          />
          <StatsCard
            title="Pelamar Baru"
            value="24"
            change="5 perlu review"
            icon="user-plus"
            color="success"
          />
          <StatsCard
            title="Cuti Bulan Ini"
            value="18"
            change="3 menunggu persetujuan"
            icon="calendar-check"
            color="warning"
          />
          <StatsCard
            title="Kontrak Habis"
            value="7"
            change="Perlu tindak lanjut"
            icon="exclamation-circle"
            color="danger"
          />
        </div>

        <!-- Main content grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left column -->
          <div class="lg:col-span-2 space-y-6">
            <RecentApplicants />
            <HRCalendar @show-interview="showInterviewModal" />
          </div>

          <!-- Right column -->
          <div class="space-y-6">
            <QuickActions />
            <BirthdayList />
          </div>
        </div>
      </main>
    </div>

    <!-- Interview modal -->
    <InterviewModal
      :visible="modalVisible"
      :title="modalTitle"
      :content="modalContent"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'
import StatsCard from '../components/StatsCard.vue'
import RecentApplicants from '../components/RecentApplicants.vue'
import HRCalendar from '../components/HRCalendar.vue'
import QuickActions from '../components/QuickActions.vue'
import BirthdayList from '../components/BirthdayList.vue'
import InterviewModal from '../components/InterviewModal.vue'

export default defineComponent({
  name: 'DashboardPage',
  components: {
    Sidebar,
    Header,
    StatsCard,
    RecentApplicants,
    HRCalendar,
    QuickActions,
    BirthdayList,
    InterviewModal
  },
  setup() {
    // Modal state
    const modalVisible = ref(false)
    const modalTitle = ref('')
    const modalContent = ref('')

    // Sidebar state
    const sidebarCollapsed = ref(false)

    // Methods
    const showInterviewModal = (title: string, content: string) => {
      modalTitle.value = title
      modalContent.value = content
      modalVisible.value = true
    }

    const closeModal = () => {
      modalVisible.value = false
    }

    const toggleSidebar = () => {
      sidebarCollapsed.value = !sidebarCollapsed.value
    }

    return {
      modalVisible,
      modalTitle,
      modalContent,
      sidebarCollapsed,
      showInterviewModal,
      closeModal,
      toggleSidebar,
    }
  },
})
</script>