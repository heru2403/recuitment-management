<template>
  <header class="bg-white shadow-sm">
    <div class="flex items-center justify-end px-4 py-3 sm:px-6 lg:px-8">
      <div class="flex items-center space-x-4">
        <!-- Notification -->
        <button class="p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
          <span class="sr-only">Notifications</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        
        <!-- User Profile -->
        <div class="flex items-center">
          <div class="ml-3 relative">
            <div class="flex items-center">
              <img
                class="h-8 w-8 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User profile"
              />
              <span class="ml-2 text-sm font-medium text-gray-700">Admin HRD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',
})
</script>