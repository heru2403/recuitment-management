<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showModal = ref(false);
const countdown = ref('5 Hari 00:00:00');
const intervalId = ref(null);
const currentTime = ref('');
const currentDate = ref('');

// Scroll ke section
function scrollToSection(refName) {
  const el = document.getElementById(refName);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Modal
function openModal() {
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
}

// Countdown logic (3-5 days)
function startCountdown() {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 5); // 5 days from now
  
  intervalId.value = setInterval(() => {
    const now = new Date();
    const diff = endDate - now;
    
    if (diff <= 0) {
      countdown.value = '00:00:00';
      clearInterval(intervalId.value);
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    countdown.value = `${days} Hari ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
}

// Real time clock
function updateClock() {
  const now = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  currentTime.value = now.toLocaleTimeString();
  currentDate.value = now.toLocaleDateString('id-ID', options);
}

onMounted(() => {
  startCountdown();
  updateClock();
  setInterval(updateClock, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId.value);
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-[#174e65] to-[#5fa7ff]">
    <!-- Navigation -->
    <nav class="flex items-center justify-between bg-white h-20 px-4 md:px-12 sticky top-0 z-40 shadow-md">
      <img 
        class="w-16 h-16 md:w-20 md:h-20 object-contain"
        src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59362048888/e57d/c20b/0fc0/43202cb2a030d9ebadb57d0725cd1b01.jpg" 
        alt="Company Logo"
      />
      <div class="hidden md:flex items-center space-x-8">
        <span class="text-xl md:text-2xl font-redressed cursor-pointer hover:text-[#4491f0] transition-colors" @click="scrollToSection('tentang')">Tentang Kami</span>
        <span class="text-xl md:text-2xl font-redressed cursor-pointer hover:text-[#4491f0] transition-colors" @click="scrollToSection('lowongan')">Lowongan</span>
        <span class="text-xl md:text-2xl font-redressed cursor-pointer hover:text-[#4491f0] transition-colors" @click="scrollToSection('proses')">Proses Rekrutmen</span>
        <span class="text-xl md:text-2xl font-redressed cursor-pointer hover:text-[#4491f0] transition-colors" @click="scrollToSection('testimoni')">Testimoni</span>
        <span class="text-xl md:text-2xl font-redressed cursor-pointer hover:text-[#4491f0] transition-colors" @click="scrollToSection('kontak')">Kontak</span>
        
        <!-- Login/Register Buttons -->
        <div class="flex items-center space-x-4">
          <button class="text-[#174e65] text-xl md:text-2xl px-4 py-2 rounded-lg font-redressed hover:bg-gray-100 transition-colors"
            @click="openModal">
            Login
          </button>
          <button class="bg-[#4491f0] text-white text-xl md:text-2xl px-6 py-2 rounded-lg font-redressed hover:bg-[#174e65] transition-colors shadow-md"
            @click="scrollToSection('lowongan')">
            Daftar Sekarang
          </button>
        </div>
      </div>
      
      <!-- Mobile menu button -->
      <button class="md:hidden text-3xl focus:outline-none" @click="openModal">
        ☰
      </button>
    </nav>

    <!-- Mobile Menu Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 md:hidden">
      <div class="bg-white rounded-lg p-8 w-[90vw] max-w-md shadow-xl">
        <div class="flex flex-col space-y-6">
          <span class="text-2xl font-redressed cursor-pointer hover:text-[#4491f0]" @click="scrollToSection('tentang'); closeModal()">Tentang Kami</span>
          <span class="text-2xl font-redressed cursor-pointer hover:text-[#4491f0]" @click="scrollToSection('lowongan'); closeModal()">Lowongan</span>
          <span class="text-2xl font-redressed cursor-pointer hover:text-[#4491f0]" @click="scrollToSection('proses'); closeModal()">Proses Rekrutmen</span>
          <span class="text-2xl font-redressed cursor-pointer hover:text-[#4491f0]" @click="scrollToSection('testimoni'); closeModal()">Testimoni</span>
          <span class="text-2xl font-redressed cursor-pointer hover:text-[#4491f0]" @click="scrollToSection('kontak'); closeModal()">Kontak</span>
          
          <!-- Login/Register Buttons for Mobile -->
          <div class="flex flex-col space-y-4 pt-4">
            <button class="text-[#174e65] text-2xl px-6 py-3 rounded-lg font-redressed border border-[#174e65] hover:bg-gray-100 transition-colors"
              @click="openModal; closeModal()">
              Login
            </button>
            <button class="bg-[#4491f0] text-white text-2xl px-6 py-3 rounded-lg font-redressed hover:bg-[#174e65] transition-colors shadow-md"
              @click="scrollToSection('lowongan'); closeModal()">
              Daftar Sekarang
            </button>
          </div>
        </div>
        <button class="mt-6 text-[#174e65] font-semibold w-full text-xl hover:underline" @click="closeModal">Tutup</button>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="flex flex-col items-center pt-16 pb-24 text-white text-center px-4" id="tentang">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-redressed mb-6 leading-tight">Bergabunglah Dengan Tim Profesional Kami</h1>
      <p class="text-xl md:text-2xl font-redressed mb-10 max-w-3xl">Membangun solusi digital inovatif bersama tim yang berdedikasi dan berpengalaman</p>
      
      <!-- Real-time clock -->
      <div class="bg-white/20 backdrop-blur-sm text-white text-lg md:text-xl px-8 py-4 rounded-xl font-redressed mb-6 shadow-lg">
        <p>Waktu Sekarang: {{ currentTime }}</p>
        <p class="mt-1">{{ currentDate }}</p>
      </div>
      
      <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-12">
        <div class="bg-[#409bff] text-white text-lg md:text-xl px-6 py-3 rounded-lg font-redressed shadow-md">
          ⏳ Waktu pendaftaran ditutup dalam: {{ countdown }}
        </div>
        <button class="bg-white text-[#174e65] text-lg md:text-xl px-8 py-3 rounded-lg font-redressed hover:bg-gray-100 transition-colors shadow-md"
          @click="scrollToSection('lowongan')">
          Lihat Lowongan
        </button>
      </div>
      
      <div class="animate-bounce mt-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="scrollToSection('lowongan')">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Job Openings Section -->
    <section class="bg-white py-16 px-4 shadow-inner" id="lowongan">
      <div class="container mx-auto">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-redressed text-center mb-12 text-[#174e65]">Lowongan Tersedia</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Job Card 1 -->
          <div class="bg-gray-50 rounded-xl shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow border border-gray-100">
            <h3 class="text-2xl md:text-3xl font-redressed text-[#174e65]">Frontend Developer</h3>
            <p class="text-lg md:text-xl font-redressed text-gray-600 mb-4">Engineering</p>
            <div class="flex items-center space-x-4 mt-2">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="ml-2 text-lg font-redressed">Bandung</span>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="ml-2 text-lg font-redressed">Full-time</span>
              </div>
            </div>
            <button class="bg-[#174e65] text-white text-xl w-full py-3 rounded-lg mt-6 font-redressed hover:bg-[#0d3648] transition-colors shadow-md"
              @click="openModal">
              Lamar Sekarang
            </button>
          </div>
          
          <!-- Job Card 2 -->
          <div class="bg-gray-50 rounded-xl shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow border border-gray-100">
            <h3 class="text-2xl md:text-3xl font-redressed text-[#174e65]">Backend Developer</h3>
            <p class="text-lg md:text-xl font-redressed text-gray-600 mb-4">Engineering</p>
            <div class="flex items-center space-x-4 mt-2">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="ml-2 text-lg font-redressed">Bandung</span>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="ml-2 text-lg font-redressed">Full-time</span>
              </div>
            </div>
            <button class="bg-[#174e65] text-white text-xl w-full py-3 rounded-lg mt-6 font-redressed hover:bg-[#0d3648] transition-colors shadow-md"
              @click="openModal">
              Lamar Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Recruitment Process Section -->
    <section class="bg-gray-50 py-20 px-4" id="proses">
      <div class="container mx-auto max-w-6xl">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-redressed text-center mb-16 text-[#174e65]">Proses Rekrutmen</h2>
        
        <div class="relative w-full">
          <!-- Timeline line -->
          <div class="absolute left-4 md:left-1/2 h-full w-1 md:-translate-x-1/2 bg-gradient-to-b from-[#174e65] to-[#5fa7ff]"></div>
          
          <!-- Process Steps -->
          <div class="space-y-12 pl-12 md:pl-0">
            <!-- Process Step 1 -->
            <div class="relative md:w-1/2 md:ml-auto md:pr-12 md:pl-8">
              <div class="absolute -left-3 top-0 w-8 h-8 rounded-full bg-[#174e65] flex items-center justify-center shadow-md">
                <span class="text-white font-bold">1</span>
              </div>
              <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 class="text-2xl font-redressed text-[#174e65] mb-2">Pendaftaran Online</h3>
                <p class="text-gray-600 font-redressed">Isi formulir pendaftaran dan upload CV Anda melalui sistem kami</p>
              </div>
            </div>
            
            <!-- Process Step 2 -->
            <div class="relative md:w-1/2 md:mr-auto md:pl-12 md:pr-8">
              <div class="absolute -left-3 top-0 w-8 h-8 rounded-full bg-[#174e65] flex items-center justify-center shadow-md md:left-auto md:-right-3">
                <span class="text-white font-bold">2</span>
              </div>
              <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 class="text-2xl font-redressed text-[#174e65] mb-2">Seleksi Administrasi</h3>
                <p class="text-gray-600 font-redressed">Tim HR akan meninjau kelengkapan dokumen Anda dalam 3-5 hari kerja</p>
              </div>
            </div>
            
            <!-- Process Step 3 -->
            <div class="relative md:w-1/2 md:ml-auto md:pr-12 md:pl-8">
              <div class="absolute -left-3 top-0 w-8 h-8 rounded-full bg-[#174e65] flex items-center justify-center shadow-md">
                <span class="text-white font-bold">3</span>
              </div>
              <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 class="text-2xl font-redressed text-[#174e65] mb-2">Tes Online</h3>
                <p class="text-gray-600 font-redressed">Anda akan menerima link tes online untuk mengukur kemampuan teknis</p>
              </div>
            </div>
            
            <!-- Process Step 4 -->
            <div class="relative md:w-1/2 md:mr-auto md:pl-12 md:pr-8">
              <div class="absolute -left-3 top-0 w-8 h-8 rounded-full bg-[#174e65] flex items-center justify-center shadow-md md:left-auto md:-right-3">
                <span class="text-white font-bold">4</span>
              </div>
              <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 class="text-2xl font-redressed text-[#174e65] mb-2">Wawancara</h3>
                <p class="text-gray-600 font-redressed">Wawancara dengan tim HR dan technical team terkait posisi</p>
              </div>
            </div>
            
            <!-- Process Step 5 -->
            <div class="relative md:w-1/2 md:ml-auto md:pr-12 md:pl-8">
              <div class="absolute -left-3 top-0 w-8 h-8 rounded-full bg-[#174e65] flex items-center justify-center shadow-md">
                <span class="text-white font-bold">5</span>
              </div>
              <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 class="text-2xl font-redressed text-[#174e65] mb-2">Hasil Akhir</h3>
                <p class="text-gray-600 font-redressed">Pengumuman hasil melalui email resmi dalam 7 hari kerja setelah wawancara</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="bg-white py-20 px-4" id="testimoni">
      <div class="container mx-auto">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-redressed text-center mb-16 text-[#174e65]">Testimoni Karyawan</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Testimonial 1 -->
          <div class="bg-[#174e65] rounded-xl shadow-lg p-8 text-white hover:shadow-xl transition-shadow">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <span class="text-xl font-bold">H</span>
              </div>
              <div>
                <h4 class="text-xl font-bold">Heru Rizaldi</h4>
                <p class="text-gray-300">Mobile Developer</p>
              </div>
            </div>
            <p class="text-lg italic">
              "Perusahaan ini memberikan lingkungan kerja kolaboratif dengan kesempatan pengembangan skill yang sangat baik. Teknologi yang digunakan selalu up-to-date."
            </p>
            <div class="flex mt-4">
              <span class="text-yellow-400">★★★★★</span>
            </div>
          </div>
          
          <!-- Testimonial 2 -->
          <div class="bg-[#174e65] rounded-xl shadow-lg p-8 text-white hover:shadow-xl transition-shadow">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <span class="text-xl font-bold">W</span>
              </div>
              <div>
                <h4 class="text-xl font-bold">Wahyu Bulkhoir</h4>
                <p class="text-gray-300">Web Developer</p>
              </div>
            </div>
            <p class="text-lg italic">
              "Budaya perusahaan yang inklusif dan tim yang solid membuat saya berkembang pesat. Benefit dan work-life balance juga sangat baik."
            </p>
            <div class="flex mt-4">
              <span class="text-yellow-400">★★★★★</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Application Form Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-redressed text-[#174e65]">Formulir Pendaftaran</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="closeModal" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-redressed mb-1">Nama Lengkap</label>
            <input type="text" placeholder="Nama Anda" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#174e65] focus:border-transparent font-redressed" required />
          </div>
          <div>
            <label class="block text-gray-700 font-redressed mb-1">Email</label>
            <input type="email" placeholder="email@contoh.com" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#174e65] focus:border-transparent font-redressed" required />
          </div>
          <div>
            <label class="block text-gray-700 font-redressed mb-1">Nomor Telepon</label>
            <input type="tel" placeholder="08123456789" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#174e65] focus:border-transparent font-redressed" required />
          </div>
          <div>
            <label class="block text-gray-700 font-redressed mb-1">Posisi</label>
            <select class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#174e65] focus:border-transparent font-redressed" required>
              <option value="">Pilih Posisi</option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 font-redressed mb-1">Upload CV (PDF, max 5MB)</label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input type="file" accept=".pdf" class="hidden" id="cv-upload" required />
              <label for="cv-upload" class="cursor-pointer text-[#174e65] font-redressed hover:underline">
                Klik untuk upload CV
              </label>
            </div>
          </div>
          <button type="submit" class="w-full bg-[#174e65] text-white px-6 py-3 rounded-lg font-redressed hover:bg-[#0d3648] transition-colors shadow-md mt-6">
            Kirim Aplikasi
          </button>
        </form>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-[#174e65] text-white py-12 px-4" id="kontak">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 class="text-2xl font-redressed mb-4">Tentang Kami</h3>
            <p class="font-redressed mb-4">
              Perusahaan teknologi inovatif yang berfokus pada pengembangan solusi digital untuk kebutuhan bisnis modern.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="hover:opacity-80 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="#" class="hover:opacity-80 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" class="hover:opacity-80 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 class="text-2xl font-redressed mb-4">Kontak Kami</h3>
            <div class="space-y-2 font-redressed">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>recruitment@gluonit.com</span>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+62 812 3456 7890</span>
              </div>
              <div class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Jl. Teknologi No. 123, Bandung, Jawa Barat, Indonesia 40123</span>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-2xl font-redressed mb-4">Jam Kerja</h3>
            <p class="font-redressed">Senin - Jumat: 09.00 - 17.00 WIB</p>
            <p class="font-redressed">Sabtu - Minggu : Tutup </p>
            
          </div> 
        </div>
        <div class="text-center mt-12">
          <p class="font-redressed">© 2023 Gluon IT. All rights reserved.</p> 
          <p class="font-redressed">Developed with ❤️ by Gluon IT Team</p>
        </div>
      </div>  
    </footer>
  </div>
</template>