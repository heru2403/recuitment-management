<template>
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
        System Services Status
      </h3>
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200">
          <li v-for="service in services" :key="service.name">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-indigo-600 truncate">
                  {{ service.name }}
                </p>
                <div class="ml-2 flex-shrink-0 flex">
                  <p
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="statusClasses(service.status)"
                  >
                    {{ service.status }}
                  </p>
                </div>
              </div>
              <div class="mt-2 sm:flex sm:justify-between">
                <div class="sm:flex">
                  <p class="flex items-center text-sm text-gray-500">
                    <svg
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Uptime: {{ service.uptime }}
                  </p>
                </div>
                <div
                  v-if="service.message"
                  class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                >
                  <svg
                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ service.message }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  
  interface Service {
    name: string;
    status: string;
    uptime: string;
    message?: string;
  }
  
  const props = defineProps<{
    services: Service[];
  }>();
  
  const statusClasses = (status: string) => {
    const statusLower = status.toLowerCase()
    return {
      'bg-green-100 text-green-800': statusLower === 'operational',
      'bg-yellow-100 text-yellow-800': statusLower === 'degraded',
      'bg-red-100 text-red-800': statusLower === 'down',
      'bg-gray-100 text-gray-800': statusLower === 'maintenance'
    }
  }
  </script>