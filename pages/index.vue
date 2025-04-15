<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showModal = ref(false);
const countdown = ref('12:00:00');
const intervalId = ref(null);

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

onMounted(() => {
  startCountdown();
});
onUnmounted(() => {
  clearInterval(intervalId.value);
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-[#174e65] to-[#5fa7ff]">
    <!-- Navigation -->
    <div class="flex items-center justify-between bg-white h-20 px-4 md:px-12">
      <img 
        class="w-16 h-16 md:w-20 md:h-20 object-cover"
        src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59362048888/e57d/c20b/0fc0/43202cb2a030d9ebadb57d0725cd1b01.jpg" 
      />
      <div class="flex items-center space-x-4 md:space-x-6">
        <span class="text-xl md:text-3xl font-redressed cursor-pointer" @click="scrollToSection('tentang')">Tentang Kami</span>
        <span class="text-xl md:text-3xl font-redressed cursor-pointer" @click="scrollToSection('lowongan')">Lowongan</span>
        <span class="text-xl md:text-3xl font-redressed cursor-pointer" @click="scrollToSection('proses')">Proses</span>
        <span class="text-xl md:text-3xl font-redressed cursor-pointer" @click="scrollToSection('testimoni')">Testimoni</span>
        <span class="text-xl md:text-3xl font-redressed cursor-pointer" @click="scrollToSection('kontak')">Kontak</span>
        <button class="bg-[#4491f0] text-white text-xl md:text-3xl px-4 md:px-6 py-2 rounded-lg font-redressed"
          @click="scrollToSection('lowongan')">
          Daftar Sekarang
        </button>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="flex flex-col items-center mt-10 text-white text-center" id="tentang">
      <h1 class="text-4xl md:text-6xl font-redressed mb-6">Bergabunglah Dengan Tim Kami</h1>
      <p class="text-xl md:text-3xl font-redressed mb-10">Membangun masa depan bersama tim profesional</p>
      <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-20">
        <div class="bg-[#409bff] text-white text-lg md:text-2xl px-6 py-3 rounded-lg font-redressed">
          {{ countdown }} Tersisa untuk mendaftar
        </div>
        <button class="bg-white text-black text-lg md:text-2xl px-6 py-3 rounded-lg font-redressed"
          @click="scrollToSection('lowongan')">
          Lihat Lowongan
        </button>
      </div>
    </div>

    <!-- Job Openings Section -->
    <div class="bg-gray-100 py-12 shadow-md" id="lowongan">
      <div class="container mx-auto">
        <h2 class="text-4xl md:text-6xl font-redressed text-center mb-12">Lowongan Tersedia</h2>
        <div class="flex flex-col md:flex-row justify-center items-center md:space-x-16 space-y-8 md:space-y-0">
          <!-- Job Card 1 -->
          <div class="bg-white w-full md:w-[472px] h-[250px] rounded shadow-lg p-4 flex flex-col">
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
            <button class="bg-[#174e65] text-white text-xl w-full py-2 rounded mt-6 font-redressed"
              @click="openModal">
              Apply Now
            </button>
          </div>
          <!-- Job Card 2 -->
          <div class="bg-white w-full md:w-[472px] h-[250px] rounded shadow-lg p-4 flex flex-col">
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
            <button class="bg-[#174e65] text-white text-xl w-full py-2 rounded mt-6 font-redressed"
              @click="openModal">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Form Apply -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 w-[90vw] max-w-md">
        <h3 class="text-2xl font-redressed mb-4">Formulir Pendaftaran</h3>
        <form @submit.prevent="closeModal">
          <input type="text" placeholder="Nama Lengkap" class="w-full mb-3 p-2 border rounded" required />
          <input type="email" placeholder="Email" class="w-full mb-3 p-2 border rounded" required />
          <input type="text" placeholder="Posisi yang dilamar" class="w-full mb-3 p-2 border rounded" required />
          <button type="submit" class="bg-[#174e65] text-white px-4 py-2 rounded w-full font-redressed">Kirim</button>
        </form>
        <button class="mt-4 text-[#174e65] underline w-full" @click="closeModal">Tutup</button>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="bg-white py-20" id="testimoni">
      <div class="container mx-auto">
        <h2 class="text-4xl md:text-6xl font-redressed text-center mb-16">Testimoni Karyawan</h2>
        <div class="flex flex-col md:flex-row justify-center items-center md:space-x-16 space-y-8 md:space-y-0">
          <!-- Testimonial 1 -->
          <div class="bg-[#174d65] w-full md:w-[472px] h-[250px] rounded shadow-lg p-6 text-white">
            <p class="text-lg md:text-xl font-redressed mb-6">
              "Perusahaan ini memberikan lingkungan kerja yang sangat mendukung."
            </p>
            <p class="text-xl md:text-2xl font-redressed text-center">Heru Rizaldi</p>
            <p class="text-lg md:text-xl font-redressed text-center mt-4">Mobile Developer</p>
          </div>
          <!-- Testimonial 2 -->
          <div class="bg-[#174e65] w-full md:w-[472px] h-[250px] rounded shadow-lg p-6 text-white">
            <p class="text-lg md:text-xl font-redressed mb-6">
              "Perusahaan ini memberikan lingkungan kerja yang sangat mendukung."
            </p>
            <p class="text-xl md:text-2xl font-redressed text-center">Wahyu Bulkhoir</p>
            <p class="text-lg md:text-xl font-redressed text-center mt-4">Web Developer</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-[#174e65] text-white py-12" id="kontak">
      <div class="container mx-auto px-8">
        <div class="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h3 class="text-2xl md:text-3xl font-redressed mb-4">Kontak Kami</h3>
            <p class="text-lg md:text-2xl font-redressed">Email : gluonit@gmail.com</p>
          </div>
          <div class="flex items-center space-x-4 md:space-x-6 mt-4 md:mt-0">
            <img class="w-10 h-10 md:w-12 md:h-12" src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59362055391/8a0a/f790/eae4/1a99bcdab2c2d9e3d39ee4956bf4123a.png" />
            <img class="w-10 h-10 md:w-12 md:h-12" src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59362055343/bc6d/60b0/81f2/dc545068c3132eb1d64c954b6f159a59.png" />
            <img class="w-12 h-12 md:w-14 md:h-14" src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59362053507/8514/d0bd/7026/b409ceaad2038812d5def21da8748d67.png" />
          </div>
        </div>
        <p class="text-lg md:text-2xl font-redressed mb-8">Telp : +62 8123456789</p>
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
</style>
