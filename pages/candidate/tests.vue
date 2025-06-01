<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <CandidateSidebar />
    
    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <div class="p-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-[#174e65] font-redressed">Daftar Tes</h1>
          <div class="flex items-center space-x-4">
            <div class="relative">
              <i class="fas fa-bell text-gray-500 text-xl"></i>
              <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div class="w-8 h-8 rounded-full bg-[#174e65] flex items-center justify-center text-white">
              {{ user?.name?.charAt(0) }}
            </div>
          </div>
        </div>

        <!-- Filter Section -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-gray-700 mb-2 font-redressed">Kategori Tes</label>
              <select class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed">
                <option>Semua Kategori</option>
                <option>Matematika</option>
                <option>Bahasa</option>
                <option>Logika</option>
              </select>
            </div>
            <div>
              <label class="block text-gray-700 mb-2 font-redressed">Status Tes</label>
              <select class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed">
                <option>Semua Status</option>
                <option>Belum Dikerjakan</option>
                <option>Sudah Dikerjakan</option>
              </select>
            </div>
            <div class="flex items-end">
              <button class="w-full bg-[#174e65] text-white py-2 px-4 rounded-lg hover:bg-[#0d3648] transition-colors font-redressed">
                Filter
              </button>
            </div>
          </div>
        </div>

        <!-- Test List -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="py-3 px-4 text-left font-redressed">Nama Tes</th>
                  <th class="py-3 px-4 text-left font-redressed">Kategori</th>
                  <th class="py-3 px-4 text-left font-redressed">Durasi</th>
                  <th class="py-3 px-4 text-left font-redressed">Jumlah Soal</th>
                  <th class="py-3 px-4 text-left font-redressed">Status</th>
                  <th class="py-3 px-4 text-left font-redressed">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="test in tests" :key="test.id" class="border-b hover:bg-gray-50">
                  <td class="py-4 px-4">{{ test.name }}</td>
                  <td class="py-4 px-4">{{ test.category }}</td>
                  <td class="py-4 px-4">{{ test.duration }} menit</td>
                  <td class="py-4 px-4">{{ test.questions }}</td>
                  <td class="py-4 px-4">
                    <span :class="statusClass(test.status)" class="px-3 py-1 rounded-full text-xs">
                      {{ test.status }}
                    </span>
                  </td>
                  <td class="py-4 px-4">
                    <button 
                      @click="startTest(test)"
                      class="px-3 py-1 bg-[#174e65] text-white rounded-lg text-sm font-redressed hover:bg-[#0d3648] transition-colors"
                      :disabled="test.status === 'Selesai'"
                    >
                      {{ test.status === 'Belum' ? 'Mulai' : 'Lihat' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = ref(null);
const tests = ref([
  {
    id: 1,
    name: 'Tes Matematika Dasar',
    category: 'Matematika',
    duration: 30,
    questions: 20,
    status: 'Belum'
  },
  {
    id: 2,
    name: 'Tes Bahasa Inggris',
    category: 'Bahasa',
    duration: 45,
    questions: 30,
    status: 'Belum'
  },
  {
    id: 3,
    name: 'Tes Logika Verbal',
    category: 'Logika',
    duration: 25,
    questions: 15,
    status: 'Selesai'
  }
]);

onMounted(() => {
  const authData = localStorage.getItem('candidateAuth') || sessionStorage.getItem('candidateAuth');
  if (authData) {
    user.value = JSON.parse(authData);
  } else {
    navigateTo('/candidate/login');
  }
});

const statusClass = (status) => {
  return {
    'bg-yellow-100 text-yellow-800': status === 'Belum',
    'bg-green-100 text-green-800': status === 'Selesai',
    'bg-blue-100 text-blue-800': status === 'Proses'
  };
};

const startTest = (test) => {
  if (test.status === 'Belum') {
    navigateTo(`/candidate/test/${test.id}`);
  } else {
    navigateTo(`/candidate/results/${test.id}`);
  }
};
</script>