<template>
  <div class="min-h-screen bg-gray-50 flex">
    <CandidateSidebar />
    
    <div class="flex-1 overflow-auto">
      <div class="p-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-[#174e65] font-redressed">Hasil Tes</h1>
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

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <h3 class="text-gray-500 mb-2 font-redressed">Total Tes</h3>
            <p class="text-3xl font-bold">3</p>
          </div>
          
          <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <h3 class="text-gray-500 mb-2 font-redressed">Tes Selesai</h3>
            <p class="text-3xl font-bold">1</p>
          </div>
          
          <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <h3 class="text-gray-500 mb-2 font-redressed">Nilai Rata-rata</h3>
            <p class="text-3xl font-bold">78.5</p>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="py-3 px-4 text-left font-redressed">Nama Tes</th>
                  <th class="py-3 px-4 text-left font-redressed">Tanggal</th>
                  <th class="py-3 px-4 text-left font-redressed">Nilai</th>
                  <th class="py-3 px-4 text-left font-redressed">Status</th>
                  <th class="py-3 px-4 text-left font-redressed">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="result in results" :key="result.id" class="border-b hover:bg-gray-50">
                  <td class="py-4 px-4">{{ result.testName }}</td>
                  <td class="py-4 px-4">{{ result.date }}</td>
                  <td class="py-4 px-4">{{ result.score }}</td>
                  <td class="py-4 px-4">
                    <span :class="statusClass(result.status)" class="px-3 py-1 rounded-full text-xs">
                      {{ result.status }}
                    </span>
                  </td>
                  <td class="py-4 px-4">
                    <button 
                      @click="viewDetail(result)"
                      class="px-3 py-1 bg-[#174e65] text-white rounded-lg text-sm font-redressed hover:bg-[#0d3648] transition-colors"
                    >
                      Detail
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
const results = ref([
  {
    id: 1,
    testName: 'Tes Logika Verbal',
    date: '15 Mei 2023',
    score: '78.5',
    status: 'Lulus'
  },
  {
    id: 2,
    testName: 'Tes Matematika Dasar',
    date: '-',
    score: '-',
    status: 'Belum'
  },
  {
    id: 3,
    testName: 'Tes Bahasa Inggris',
    date: '-',
    score: '-',
    status: 'Belum'
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
    'bg-green-100 text-green-800': status === 'Lulus',
    'bg-red-100 text-red-800': status === 'Tidak Lulus',
    'bg-yellow-100 text-yellow-800': status === 'Belum'
  };
};

const viewDetail = (result) => {
  if (result.status !== 'Belum') {
    navigateTo(`/candidate/results/${result.id}`);
  }
};
</script>