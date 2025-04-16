<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showModal = ref(false);
const countdown = ref('12:00:00');
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

// Countdown logic
function startCountdown() {
  let totalSeconds = 12 * 60 * 60; // 12 jam
  intervalId.value = setInterval(() => {
    if (totalSeconds <= 0) {
      countdown.value = '00:00:00';
      clearInterval(intervalId.value);
      return;
    }
    totalSeconds--;
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    countdown.value = `${h}:${m}:${s}`;
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
    <div class="flex items-center justify-between bg-white h-20 px-4 md:px-12 sticky top-0 z-40">
      <img 
        class="w-16 h-16 md:w-20 md:h-20 object-cover"
        src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59362048888/e57d/c20b/0fc0/43202cb2a030d9ebadb57d0725cd1b01.jpg" 
      />
      <div class="hidden md:flex items-center space-x-6">
        <span class="text-xl md:text-3xl font-redressed cursor-pointer hover:text-[#4491f0]" @click="scrollToSection('tentang')">Tentang Kami</span>
        <span class="text-xl md:text-3xl font-redressed cursor-pointer hover:text-[#4491f0]" @click="scrollToSection('lowongan')">Lowongan</span>
        <span class="text-xl md:text-3xl font-redressed cursor-pointer hover:text-[#4491f0]" @click="scrollToSection('proses')">Proses Rekrutmen</span>
        <span class="text-xl md:text-3xl font-redressed cursor-pointer hover:text-[#4491f0]" @click="scrollToSection('testimoni')">Testimoni</span>
        <span class="text-xl md:text-3xl font-redressed cursor-pointer hover:text-[#4491f0]" @click="scrollToSection('kontak')">Kontak</span>
        <button class="bg-[#4491f0] text-white text-xl md:text-3xl px-6 py-2 rounded-lg font-redressed hover:bg-[#174e65] transition-colors"
          @click="scrollToSection('lowongan')">
          Daftar Sekarang
        </button>
      </div>
      
      <!-- Mobile menu button -->
      <button class="md:hidden text-3xl" @click="openModal">
        ☰
      </button>
    </div>

    <!-- Mobile Menu Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 md:hidden">
      <div class="bg-white rounded-lg p-8 w-[90vw] max-w-md">
        <div class="flex flex-col space-y-4">
          <span class="text-2xl font-redressed cursor-pointer" @click="scrollToSection('tentang'); closeModal()">Tentang Kami</span>
          <span class="text-2xl font-redressed cursor-pointer" @click="scrollToSection('lowongan'); closeModal()">Lowongan</span>
          <span class="text-2xl font-redressed cursor-pointer" @click="scrollToSection('proses'); closeModal()">Proses Rekrutmen</span>
          <span class="text-2xl font-redressed cursor-pointer" @click="scrollToSection('testimoni'); closeModal()">Testimoni</span>
          <span class="text-2xl font-redressed cursor-pointer" @click="scrollToSection('kontak'); closeModal()">Kontak</span>
          <button class="bg-[#4491f0] text-white text-2xl px-6 py-2 rounded-lg font-redressed mt-4"
            @click="scrollToSection('lowongan'); closeModal()">
            Daftar Sekarang
          </button>
        </div>
        <button class="mt-6 text-[#174e65] underline w-full text-2xl" @click="closeModal">Tutup</button>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="flex flex-col items-center mt-10 text-white text-center" id="tentang">
      <h1 class="text-4xl md:text-6xl font-redressed mb-6">Bergabunglah Dengan Tim Kami</h1>
      <p class="text-xl md:text-3xl font-redressed mb-10">Membangun masa depan bersama tim profesional</p>
      
      <!-- Real-time clock -->
      <div class="bg-[#409bff] text-white text-lg md:text-2xl px-6 py-3 rounded-lg font-redressed mb-4">
        <p>Waktu Sekarang: {{ currentTime }}</p>
        <p>{{ currentDate }}</p>
      </div>
      
      <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-20">
        <div class="bg-[#409bff] text-white text-lg md:text-2xl px-6 py-3 rounded-lg font-redressed">
          {{ countdown }} Tersisa untuk mendaftar
        </div>
        <button class="bg-white text-black text-lg md:text-2xl px-6 py-3 rounded-lg font-redressed hover:bg-gray-100 transition-colors"
          @click="scrollToSection('lowongan')">
          Lihat Lowongan
        </button>
      </div>
    </div>

    <!-- Job Openings Section -->
    <div class="bg-gray-100 py-12 shadow-md" id="lowongan">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl md:text-6xl font-redressed text-center mb-12">Lowongan Tersedia</h2>
        <div class="flex flex-col md:flex-row justify-center items-center md:space-x-16 space-y-8 md:space-y-0">
          <!-- Job Card 1 -->
          <div class="bg-white w-full md:w-[472px] h-[250px] rounded shadow-lg p-4 flex flex-col hover:shadow-xl transition-shadow">
            <h3 class="text-2xl md:text-3xl font-redressed">Frontend Developer</h3>
            <p class="text-lg md:text-xl font-redressed">Engineering</p>
            <div class="flex items-center mt-4">
              <img class="w-8 h-8 mr-3" src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59362052751/6dcc/9af7/b4b6/471902c32cf7a57b27fc5a5a68c90b87.png" />
              <span class="text-lg md:text-xl font-redressed">Bandung</span>
            </div>
            <div class="flex items-center mt-2">
              <img class="w-8 h-8 mr-3" src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59362055179/b18f/451e/dc2d/167b3a01b4a0207a165af904065473ba.png" />
              <span class="text-lg md:text-xl font-redressed">Full-time</span>
            </div>
            <button class="bg-[#174e65] text-white text-xl w-full py-2 rounded mt-6 font-redressed hover:bg-[#0d3648] transition-colors"
              @click="openModal">
              Apply Now
            </button>
          </div>
          <!-- Job Card 2 -->
          <div class="bg-white w-full md:w-[472px] h-[250px] rounded shadow-lg p-4 flex flex-col hover:shadow-xl transition-shadow">
            <h3 class="text-2xl md:text-3xl font-redressed">Backend Developer</h3>
            <p class="text-lg md:text-xl font-redressed">Engineering</p>
            <div class="flex items-center mt-4">
              <img class="w-8 h-8 mr-3" src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59362052751/6dcc/9af7/b4b6/471902c32cf7a57b27fc5a5a68c90b87.png" />
              <span class="text-lg md:text-xl font-redressed">Bandung</span>
            </div>
            <div class="flex items-center mt-2">
              <img class="w-8 h-8 mr-3" src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59362055179/b18f/451e/dc2d/167b3a01b4a0207a165af904065473ba.png" />
              <span class="text-lg md:text-xl font-redressed">Full-time</span>
            </div>
            <button class="bg-[#174e65] text-white text-xl w-full py-2 rounded mt-6 font-redressed hover:bg-[#0d3648] transition-colors"
              @click="openModal">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Recruitment Process Section -->
    <div class="bg-white py-20" id="proses">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl md:text-6xl font-redressed text-center mb-16">Proses Rekrutmen</h2>
        
        <div class="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
          <!-- Process Timeline -->
          <div class="relative w-full md:w-[600px] mb-12 md:mb-0">
            <!-- Timeline line -->
            <div class="absolute left-8 top-0 h-full w-1 bg-[#174e65]"></div>
            
            <!-- Process Step 1 -->
            <div class="relative mb-12 pl-16">
              <div class="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#174e65] flex items-center justify-center">
                <span class="text-white font-bold">1</span>
              </div>
              <h3 class="text-2xl md:text-3xl font-redressed mb-2">Pendaftaran Online</h3>
              <p class="text-lg font-redressed">Isi formulir pendaftaran dan upload CV Anda</p>
            </div>
            
            <!-- Process Step 2 -->
            <div class="relative mb-12 pl-16">
              <div class="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#174e65] flex items-center justify-center">
                <span class="text-white font-bold">2</span>
              </div>
              <h3 class="text-2xl md:text-3xl font-redressed mb-2">Seleksi Administrasi</h3>
              <p class="text-lg font-redressed">Tim HR akan meninjau dokumen Anda dalam 3-5 hari kerja</p>
            </div>
            
            <!-- Process Step 3 -->
            <div class="relative mb-12 pl-16">
              <div class="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#174e65] flex items-center justify-center">
                <span class="text-white font-bold">3</span>
              </div>
              <h3 class="text-2xl md:text-3xl font-redressed mb-2">Tes Online</h3>
              <p class="text-lg font-redressed">Anda akan menerima link tes online untuk mengukur kemampuan</p>
            </div>
            
            <!-- Process Step 4 -->
            <div class="relative mb-12 pl-16">
              <div class="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#174e65] flex items-center justify-center">
                <span class="text-white font-bold">4</span>
              </div>
              <h3 class="text-2xl md:text-3xl font-redressed mb-2">Wawancara</h3>
              <p class="text-lg font-redressed">Wawancara dengan tim HR dan user terkait</p>
            </div>
            
            <!-- Process Step 5 -->
            <div class="relative pl-16">
              <div class="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#174e65] flex items-center justify-center">
                <span class="text-white font-bold">5</span>
              </div>
              <h3 class="text-2xl md:text-3xl font-redressed mb-2">Hasil Akhir</h3>
              <p class="text-lg font-redressed">Pengumuman hasil melalui email dalam 7 hari kerja</p>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="bg-gray-100 py-20" id="testimoni">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl md:text-6xl font-redressed text-center mb-16">Testimoni Karyawan</h2>
        <div class="flex flex-col md:flex-row justify-center items-center md:space-x-16 space-y-8 md:space-y-0">
          <!-- Testimonial 1 -->
          <div class="bg-[#174d65] w-full md:w-[472px] h-[250px] rounded shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
            <p class="text-lg md:text-xl font-redressed mb-6">
              "Perusahaan ini memberikan lingkungan kerja yang sangat mendukung dan kesempatan pengembangan karir yang luar biasa."
            </p>
            <p class="text-xl md:text-2xl font-redressed text-center">Heru Rizaldi</p>
            <p class="text-lg md:text-xl font-redressed text-center mt-4">Mobile Developer</p>
          </div>
          <!-- Testimonial 2 -->
          <div class="bg-[#174e65] w-full md:w-[472px] h-[250px] rounded shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
            <p class="text-lg md:text-xl font-redressed mb-6">
              "Budaya perusahaan yang inklusif dan tim yang solid membuat saya betah bekerja di sini."
            </p>
            <p class="text-xl md:text-2xl font-redressed text-center">Wahyu Bulkhoir</p>
            <p class="text-lg md:text-xl font-redressed text-center mt-4">Web Developer</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Form Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 w-[90vw] max-w-md">
        <h3 class="text-2xl font-redressed mb-4">Formulir Pendaftaran</h3>
        <form @submit.prevent="closeModal">
          <input type="text" placeholder="Nama Lengkap" class="w-full mb-3 p-2 border rounded font-redressed" required />
          <input type="email" placeholder="Email" class="w-full mb-3 p-2 border rounded font-redressed" required />
          <input type="tel" placeholder="Nomor Telepon" class="w-full mb-3 p-2 border rounded font-redressed" required />
          <select class="w-full mb-3 p-2 border rounded font-redressed" required>
            <option value="">Pilih Posisi</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
          </select>
          <div class="mb-3">
            <label class="font-redressed block mb-2">Upload CV (PDF)</label>
            <input type="file" accept=".pdf" class="w-full p-2 border rounded" required />
          </div>
          <button type="submit" class="bg-[#174e65] text-white px-4 py-2 rounded w-full font-redressed hover:bg-[#0d3648] transition-colors">
            Kirim Aplikasi
          </button>
        </form>
        <button class="mt-4 text-[#174e65] underline w-full font-redressed" @click="closeModal">Tutup</button>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-[#174e65] text-white py-12" id="kontak">
      <div class="container mx-auto px-8">
        <div class="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h3 class="text-2xl md:text-3xl font-redressed mb-4">Kontak Kami</h3>
            <p class="text-lg md:text-2xl font-redressed">Email : gluonit@gmail.com</p>
            <p class="text-lg md:text-2xl font-redressed mt-2">Telp : +62 8123456789</p>
            <p class="text-lg md:text-2xl font-redressed mt-2">Alamat : Jl. Contoh No. 123, Bandung</p>
          </div>
          <div class="flex items-center space-x-6 mt-8 md:mt-0">
            <a href="#" class="hover:opacity-80 transition-opacity">
              <img class="w-10 h-10 md:w-12 md:h-12" src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59362055391/8a0a/f790/eae4/1a99bcdab2c2d9e3d39ee4956bf4123a.png" />
            </a>
            <a href="#" class="hover:opacity-80 transition-opacity">
              <img class="w-10 h-10 md:w-12 md:h-12" src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59362055343/bc6d/60b0/81f2/dc545068c3132eb1d64c954b6f159a59.png" />
            </a>
            <a href="#" class="hover:opacity-80 transition-opacity">
              <img class="w-12 h-12 md:w-14 md:h-14" src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59362053507/8514/d0bd/7026/b409ceaad2038812d5def21da8748d67.png" />
            </a>
          </div>
        </div>
        <div class="border-t border-white my-8 w-full"></div>
        <p class="text-lg md:text-2xl font-redressed text-center">
          © 2025 Heru Rizaldi. All rights reserved
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Redressed&display=swap');
.font-redressed {
  font-family: 'Redressed', cursive;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>