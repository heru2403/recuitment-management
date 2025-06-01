<template>
  <div class="min-h-screen bg-gray-50 flex">
    <CandidateSidebar />
    
    <div class="flex-1 overflow-auto">
      <div class="p-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-[#174e65] font-redressed">Profil Saya</h1>
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

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="md:col-span-1">
            <div class="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <div class="flex flex-col items-center">
                <div class="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden">
                  <img 
                    v-if="user.photo" 
                    :src="user.photo" 
                    alt="Profile Photo"
                    class="w-full h-full object-cover"
                  >
                  <div v-else class="w-full h-full flex items-center justify-center bg-[#174e65] text-white text-4xl">
                    {{ user?.name?.charAt(0) }}
                  </div>
                </div>
                <h2 class="text-xl font-semibold text-center font-redressed">{{ user.name }}</h2>
                <p class="text-gray-500 text-center">{{ user.email }}</p>
                
                <button 
                  @click="editPhoto = true"
                  class="mt-4 px-4 py-2 bg-gray-100 rounded-lg text-sm font-redressed hover:bg-gray-200 transition-colors"
                >
                  Ganti Foto
                </button>
              </div>
            </div>
          </div>
          
          <div class="md:col-span-2">
            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 class="text-xl font-semibold mb-6 font-redressed">Informasi Pribadi</h2>
              
              <form @submit.prevent="updateProfile">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-gray-700 mb-2 font-redressed">Nama Lengkap</label>
                    <input 
                      v-model="profileForm.name"
                      type="text" 
                      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed"
                      required
                    >
                  </div>
                  
                  <div>
                    <label class="block text-gray-700 mb-2 font-redressed">Email</label>
                    <input 
                      v-model="profileForm.email"
                      type="email" 
                      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed"
                      required
                      disabled
                    >
                  </div>
                  
                  <div>
                    <label class="block text-gray-700 mb-2 font-redressed">Nomor Telepon</label>
                    <input 
                      v-model="profileForm.phone"
                      type="tel" 
                      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-gray-700 mb-2 font-redressed">Tanggal Lahir</label>
                    <input 
                      v-model="profileForm.birthDate"
                      type="date" 
                      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed"
                    >
                  </div>
                  
                  <div class="md:col-span-2">
                    <label class="block text-gray-700 mb-2 font-redressed">Alamat</label>
                    <textarea 
                      v-model="profileForm.address"
                      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                
                <div class="mt-8 flex justify-end">
                  <button 
                    type="submit"
                    class="px-6 py-2 bg-[#174e65] text-white rounded-lg font-redressed hover:bg-[#0d3648] transition-colors"
                    :disabled="loading"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-6">
              <h2 class="text-xl font-semibold mb-6 font-redressed">Ubah Password</h2>
              
              <form @submit.prevent="changePassword">
                <div class="space-y-4">
                  <div>
                    <label class="block text-gray-700 mb-2 font-redressed">Password Lama</label>
                    <input 
                      v-model="passwordForm.oldPassword"
                      type="password" 
                      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed"
                      required
                    >
                  </div>
                  
                  <div>
                    <label class="block text-gray-700 mb-2 font-redressed">Password Baru</label>
                    <input 
                      v-model="passwordForm.newPassword"
                      type="password" 
                      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed"
                      required
                    >
                  </div>
                  
                  <div>
                    <label class="block text-gray-700 mb-2 font-redressed">Konfirmasi Password Baru</label>
                    <input 
                      v-model="passwordForm.confirmPassword"
                      type="password" 
                      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#174e65] font-redressed"
                      required
                    >
                  </div>
                </div>
                
                <div class="mt-8 flex justify-end">
                  <button 
                    type="submit"
                    class="px-6 py-2 bg-[#174e65] text-white rounded-lg font-redressed hover:bg-[#0d3648] transition-colors"
                    :disabled="loading"
                  >
                    Ubah Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Edit Photo Modal -->
    <div v-if="editPhoto" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-md w-full">
        <h2 class="text-xl font-semibold mb-4 font-redressed">Ubah Foto Profil</h2>
        
        <div class="mb-4">
          <input 
            type="file" 
            ref="photoInput"
            accept="image/*"
            @change="handlePhotoChange"
            class="hidden"
          >
          <button 
            @click="$refs.photoInput.click()"
            class="w-full px-4 py-2 border border-dashed rounded-lg font-redressed"
          >
            Pilih Foto
          </button>
          <p v-if="selectedPhoto" class="mt-2 text-sm text-gray-500">{{ selectedPhoto.name }}</p>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button 
            @click="editPhoto = false"
            class="px-4 py-2 bg-gray-200 rounded-lg font-redressed hover:bg-gray-300 transition-colors"
          >
            Batal
          </button>
          <button 
            @click="uploadPhoto"
            class="px-4 py-2 bg-[#174e65] text-white rounded-lg font-redressed hover:bg-[#0d3648] transition-colors"
            :disabled="!selectedPhoto"
          >
            Unggah
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  photo: null,
  phone: '081234567890',
  birthDate: '1990-01-01',
  address: 'Jl. Contoh No. 123, Jakarta'
});

const editPhoto = ref(false);
const selectedPhoto = ref(null);
const photoInput = ref(null);
const loading = ref(false);

const profileForm = ref({
  name: user.value.name,
  email: user.value.email,
  phone: user.value.phone,
  birthDate: user.value.birthDate,
  address: user.value.address
});

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

onMounted(() => {
  const authData = localStorage.getItem('candidateAuth') || sessionStorage.getItem('candidateAuth');
  if (authData) {
    const authUser = JSON.parse(authData);
    user.value = { ...user.value, ...authUser };
    profileForm.value = { ...profileForm.value, ...authUser };
  } else {
    navigateTo('/candidate/login');
  }
});

const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    selectedPhoto.value = file;
  }
};

const uploadPhoto = () => {
  if (selectedPhoto.value) {
    loading.value = true;
    // Simulasi upload
    setTimeout(() => {
      user.value.photo = URL.createObjectURL(selectedPhoto.value);
      editPhoto.value = false;
      selectedPhoto.value = null;
      loading.value = false;
      // Simpan ke storage
      const authData = localStorage.getItem('candidateAuth') || sessionStorage.getItem('candidateAuth');
      if (authData) {
        const updatedUser = { ...JSON.parse(authData), photo: user.value.photo };
        localStorage.setItem('candidateAuth', JSON.stringify(updatedUser));
        sessionStorage.setItem('candidateAuth', JSON.stringify(updatedUser));
      }
    }, 1500);
  }
};

const updateProfile = () => {
  loading.value = true;
  // Simulasi update
  setTimeout(() => {
    user.value = { ...user.value, ...profileForm.value };
    // Simpan ke storage
    const authData = localStorage.getItem('candidateAuth') || sessionStorage.getItem('candidateAuth');
    if (authData) {
      const updatedUser = { ...JSON.parse(authData), ...profileForm.value };
      localStorage.setItem('candidateAuth', JSON.stringify(updatedUser));
      sessionStorage.setItem('candidateAuth', JSON.stringify(updatedUser));
    }
    loading.value = false;
  }, 1000);
};

const changePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('Password baru dan konfirmasi password tidak sama');
    return;
  }
  
  loading.value = true;
  // Simulasi change password
  setTimeout(() => {
    alert('Password berhasil diubah');
    passwordForm.value = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    loading.value = false;
  }, 1000);
};
</script>