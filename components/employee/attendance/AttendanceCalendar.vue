<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <button @click="prevMonth" class="p-1 rounded-md hover:bg-gray-100">
        <ChevronLeftIcon class="w-5 h-5 text-gray-600" />
      </button>
      <h4 class="text-md font-medium text-gray-800">
        {{ currentMonth }} {{ currentYear }}
      </h4>
      <button @click="nextMonth" class="p-1 rounded-md hover:bg-gray-100">
        <ChevronRightIcon class="w-5 h-5 text-gray-600" />
      </button>
    </div>
    
    <div class="grid grid-cols-7 gap-1 mb-2">
      <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" 
           :key="day"
           class="text-center text-xs font-medium text-gray-500 py-1">
        {{ day }}
      </div>
    </div>
    
    <div class="grid grid-cols-7 gap-1">
      <div v-for="day in calendarDays" 
           :key="day.date"
           class="h-12 border rounded-md flex flex-col overflow-hidden relative"
           :class="dayClasses(day)">
        <div class="text-right pr-1 pt-1">
          <span class="text-xs" 
                :class="dayNumberClasses(day)">
            {{ day.day }}
          </span>
        </div>
        <div v-if="day.record" class="flex-1 flex items-center justify-center">
          <div class="w-2 h-2 rounded-full" :class="statusColor(day.record.status)"></div>
        </div>
        <div v-if="isToday(day.date)" class="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-blue-500"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

interface CalendarDay {
  date: string
  day: number
  isCurrentMonth: boolean
  record?: any
}

export default defineComponent({
  name: 'AttendanceCalendar',
  components: {
    ChevronLeftIcon,
    ChevronRightIcon
  },
  props: {
    records: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const currentDate = ref(new Date())
    
    const currentMonth = computed(() => {
      return currentDate.value.toLocaleString('default', { month: 'long' })
    })
    
    const currentYear = computed(() => {
      return currentDate.value.getFullYear()
    })
    
    const calendarDays = computed(() => {
      // Implement calendar generation logic here
      // This should return an array of CalendarDay objects
      return generateCalendarDays(currentDate.value, props.records)
    })
    
    const prevMonth = () => {
      currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() - 1,
        1
      )
    }
    
    const nextMonth = () => {
      currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() + 1,
        1
      )
    }
    
    const dayClasses = (day: CalendarDay) => {
      return {
        'bg-gray-50 text-gray-400': !day.isCurrentMonth,
        'border-blue-200': day.record,
        'hover:bg-gray-50': day.isCurrentMonth
      }
    }
    
    const dayNumberClasses = (day: CalendarDay) => {
      return {
        'bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto': isToday(day.date),
        'text-gray-900': day.isCurrentMonth && !isToday(day.date),
        'text-gray-400': !day.isCurrentMonth
      }
    }
    
    const statusColor = (status: string) => {
      return {
        present: 'bg-green-500',
        late: 'bg-yellow-500',
        absent: 'bg-red-500',
        holiday: 'bg-blue-500'
      }[status] || 'bg-gray-300'
    }
    
    const isToday = (dateString: string) => {
      const date = new Date(dateString)
      const today = new Date()
      return date.getDate() === today.getDate() && 
             date.getMonth() === today.getMonth() && 
             date.getFullYear() === today.getFullYear()
    }
    
    return {
      currentDate,
      currentMonth,
      currentYear,
      calendarDays,
      prevMonth,
      nextMonth,
      dayClasses,
      dayNumberClasses,
      statusColor,
      isToday
    }
  }
})

function generateCalendarDays(date: Date, records: any[]): CalendarDay[] {
  // Implementation of calendar generation
  // This should return an array of CalendarDay objects
  return []
}
</script>