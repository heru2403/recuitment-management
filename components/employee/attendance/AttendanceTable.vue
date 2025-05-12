<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th v-for="header in headers" :key="header.key" 
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="record in records" :key="record.date">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ formatDate(record.date) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ record.day }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <span class="inline-flex items-center">
              <ClockIcon class="w-4 h-4 mr-1" :class="statusIconColor(record.status)" />
              {{ record.checkIn || '--:--' }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <span class="inline-flex items-center">
              <ClockIcon class="w-4 h-4 mr-1" :class="statusIconColor(record.status)" />
              {{ record.checkOut || '--:--' }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ record.hours || '--' }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                  :class="statusBadgeClass(record.status)">
              {{ formatStatus(record.status) }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ record.notes || '-' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClockIcon } from '@heroicons/vue/24/outline'

interface Header {
  key: string
  label: string
}

interface Record {
  date: string
  day: string
  checkIn?: string
  checkOut?: string
  hours?: string
  status: string
  notes?: string
}

export default defineComponent({
  components: {
    ClockIcon
  },
  props: {
    records: {
      type: Array as () => Record[],
      required: true
    }
  },
  setup() {
    const headers: Header[] = [
      { key: 'date', label: 'Date' },
      { key: 'day', label: 'Day' },
      { key: 'checkIn', label: 'Check In' },
      { key: 'checkOut', label: 'Check Out' },
      { key: 'hours', label: 'Working Hours' },
      { key: 'status', label: 'Status' },
      { key: 'notes', label: 'Notes' }
    ]

    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    }

    const formatStatus = (status: string) => {
      return {
        present: 'Present',
        late: 'Late',
        absent: 'Absent',
        holiday: 'Holiday'
      }[status] || status
    }

    const statusBadgeClass = (status: string) => {
      return {
        present: 'bg-green-100 text-green-800',
        late: 'bg-yellow-100 text-yellow-800',
        absent: 'bg-red-100 text-red-800',
        holiday: 'bg-blue-100 text-blue-800'
      }[status] || 'bg-gray-100 text-gray-800'
    }

    const statusIconColor = (status: string) => {
      return {
        present: 'text-green-500',
        late: 'text-yellow-500',
        absent: 'text-red-500',
        holiday: 'text-blue-500'
      }[status] || 'text-gray-400'
    }

    return {
      headers,
      formatDate,
      formatStatus,
      statusBadgeClass,
      statusIconColor
    }
  }
})
</script>