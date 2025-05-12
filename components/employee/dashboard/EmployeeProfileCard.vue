<template>
  <div class="bg-white rounded-xl shadow-md p-6 mb-5 hover:-translate-y-1 transition-transform">
    <div class="flex items-center">
      <img src="https://randomuser.me/api/portraits/men/41.jpg" class="w-20 h-20 rounded-full mr-5"/>
      <div>
        <h4 class="text-lg font-bold">John Doe</h4>
        <div class="text-gray-500 mb-2">Frontend Developer</div>
        <span class="bg-green-500 text-white text-xs px-2 py-1 rounded">Aktif</span>
      </div>
    </div>
    <hr class="my-4 border-gray-200">
    <div class="grid grid-cols-3 text-center">
      <div>
        <div class="font-bold">2.5</div>
        <div class="text-gray-500 text-sm">Tahun</div>
      </div>
      <div>
        <div class="font-bold">12</div>
        <div class="text-gray-500 text-sm">Cuti</div>
      </div>
      <div>
        <div class="font-bold">5</div>
        <div class="text-gray-500 text-sm">Proyek</div>
      </div>
    </div>
  </div>
</template>