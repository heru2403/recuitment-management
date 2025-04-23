<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="p-4 border-b flex justify-between items-center">
      <h5 class="font-bold text-lg">Kalender HR</h5>
      <div class="flex items-center space-x-4">
        <button @click="prevMonth" class="p-1 rounded hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span class="font-medium">{{ currentMonthName }} {{ currentYear }}</span>
        <button @click="nextMonth" class="p-1 rounded hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Add Event Button -->
    <div class="px-4 py-2 border-b flex justify-end">
      <button 
        @click="showAddEventModal = true"
        class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Agenda
      </button>
    </div>
    
    <div class="p-4">
      <table class="w-full">
        <thead>
          <tr>
            <th v-for="day in days" :key="day" class="text-sm font-medium text-gray-500 py-2">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, weekIndex) in calendar" :key="weekIndex">
            <td 
              v-for="(day, dayIndex) in week" 
              :key="dayIndex"
              class="border p-2 text-center relative h-16 hover:bg-gray-50 group"
              :class="{ 
                'text-gray-400': !day.currentMonth,
                'bg-blue-50': isToday(day.date, day.month, day.year),
                'cursor-pointer': day.eventDetails
              }"
              @click="showDayDetails(day)"
            >
              <div class="flex flex-col h-full">
                <span>{{ day.date }}</span>
                <div v-if="day.event" class="text-xs mt-1 flex-grow flex items-center justify-center" :class="eventClasses(day.event.type)">
                  {{ day.event.title }}
                </div>
              </div>
              <div 
                v-if="day.eventDetails" 
                class="absolute z-10 hidden group-hover:block bg-white border shadow-lg rounded p-2 w-48 left-0 top-full"
              >
                <div v-for="(detail, i) in day.eventDetails" :key="i" class="mb-2 last:mb-0">
                  <strong>{{ detail.title }}</strong>
                  <div class="text-xs">{{ detail.time }}</div>
                  <div class="text-xs text-gray-500">{{ detail.note }}</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Add Event Modal -->
    <div v-if="showAddEventModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div class="p-4 border-b flex justify-between items-center">
          <h5 class="font-bold text-lg">Tambah Agenda Baru</h5>
          <button @click="showAddEventModal = false" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-4">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Jenis Agenda</label>
            <select v-model="newEvent.type" class="w-full border rounded p-2">
              <option value="interview">Interview</option>
              <option value="training">Training</option>
              <option value="deadline">Deadline</option>
              <option value="meeting">Meeting</option>
              <option value="other">Lainnya</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Judul</label>
            <input v-model="newEvent.title" type="text" class="w-full border rounded p-2" placeholder="Judul agenda">
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
            <input v-model="newEvent.date" type="date" class="w-full border rounded p-2">
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Waktu</label>
            <input v-model="newEvent.time" type="text" class="w-full border rounded p-2" placeholder="Contoh: 10:00 - 12:00">
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Peserta/Keterangan</label>
            <input v-model="newEvent.note" type="text" class="w-full border rounded p-2" placeholder="Contoh: Interviewer: Budi">
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Detail Peserta</label>
            <textarea v-model="newEvent.details" class="w-full border rounded p-2" rows="3" placeholder="Nama peserta dan detail lainnya"></textarea>
          </div>
        </div>
        <div class="p-4 border-t flex justify-end space-x-2">
          <button @click="showAddEventModal = false" class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
            Batal
          </button>
          <button @click="addNewEvent" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import type { CalendarDay, CalendarEvent, EventDetail } from '~/types/dashboard'

interface Today {
  date: number
  month: number
  year: number
}

interface NewEvent {
  type: string
  title: string
  date: string
  time: string
  note: string
  details: string
}

export default defineComponent({
  name: 'HRCalendar',
  emits: ['show-interview'],
  setup(props, { emit }) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ]

    // Current date tracking
    const currentDate = ref(new Date())
    const currentMonth = ref(currentDate.value.getMonth())
    const currentYear = ref(currentDate.value.getFullYear())

    // Event data
    const hrEvents = ref<Record<string, { event: CalendarEvent; eventDetails: EventDetail[] }>>({})

    // Add event modal
    const showAddEventModal = ref(false)
    const newEvent = ref<NewEvent>({
      type: 'interview',
      title: '',
      date: '',
      time: '',
      note: '',
      details: ''
    })

    // Computed properties
    const currentMonthName = computed(() => months[currentMonth.value])
    const today = computed<Today>(() => ({
      date: currentDate.value.getDate(),
      month: currentDate.value.getMonth(),
      year: currentDate.value.getFullYear()
    }))

    // Generate calendar with events
    const calendar = computed<CalendarDay[][]>(() => {
      const firstDay = new Date(currentYear.value, currentMonth.value, 1)
      const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
      
      const startDay = firstDay.getDay()
      const daysInMonth = lastDay.getDate()
      const daysInPrevMonth = new Date(currentYear.value, currentMonth.value, 0).getDate()
      
      const weeks: CalendarDay[][] = []
      let week: CalendarDay[] = []
      
      // Add days from previous month
      for (let i = 0; i < startDay; i++) {
        const date = daysInPrevMonth - startDay + i + 1
        const prevMonth = currentMonth.value === 0 ? 11 : currentMonth.value - 1
        const prevMonthYear = currentMonth.value === 0 ? currentYear.value - 1 : currentYear.value
        
        week.push(createCalendarDay(date, prevMonth, prevMonthYear, false))
      }
      
      // Add days from current month
      for (let i = 1; i <= daysInMonth; i++) {
        const dayOfWeek = new Date(currentYear.value, currentMonth.value, i).getDay()
        
        week.push(createCalendarDay(i, currentMonth.value, currentYear.value, true))
        
        if (dayOfWeek === 6 || i === daysInMonth) {
          weeks.push(week)
          week = []
        }
      }
      
      // Add days from next month to complete the last week
      if (week.length > 0) {
        const daysToAdd = 7 - week.length
        for (let i = 1; i <= daysToAdd; i++) {
          const nextMonth = currentMonth.value === 11 ? 0 : currentMonth.value + 1
          const nextMonthYear = currentMonth.value === 11 ? currentYear.value + 1 : currentYear.value
          
          week.push(createCalendarDay(i, nextMonth, nextMonthYear, false))
        }
        weeks.push(week)
      }
      
      return weeks
    })

    // Helper function to create a calendar day with events
    const createCalendarDay = (date: number, month: number, year: number, currentMonth: boolean): CalendarDay => {
      const dateKey = `${year}-${month + 1}-${date}`
      const eventData = hrEvents.value[dateKey]
      
      return {
        date,
        month,
        year,
        currentMonth,
        event: eventData?.event,
        eventDetails: eventData?.eventDetails
      }
    }

    // Load events from API or local storage
    const loadEvents = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/hr-events')
        // const data = await response.json()
        
        // For demo purposes, we'll use mock data
        const mockEvents = {
          '2023-5-1': {
            event: { type: 'interview' as 'interview', title: 'Interview' },
            eventDetails: [
              { title: 'Sarah Johnson', time: '10:00 - Frontend Dev', note: 'Interviewer: Budi' },
              { title: 'Andi Wijaya', time: '14:00 - UX Designer', note: 'Interviewer: Ani' }
            ]
          },
          '2023-5-2': {
            event: { type: 'training' as 'training', title: 'Training' },
            eventDetails: [
              { title: 'Training HR', time: '09:00 - 12:00', note: 'Ruang Meeting A' }
            ]
          },
          '2023-5-5': {
            event: { type: 'deadline' as 'deadline', title: 'Deadline' },
            eventDetails: [
              { title: 'Deadline Kontrak', time: '', note: '3 karyawan - Perpanjangan/Pemutusan' }
            ]
          }
        }
        
        hrEvents.value = mockEvents
      } catch (error) {
        console.error('Failed to load events:', error)
      }
    }

    // Helper functions
    const isToday = (date: number, month: number, year: number): boolean => {
      return (
        date === today.value.date &&
        month === today.value.month &&
        year === today.value.year
      )
    }

    const eventClasses = (type: string) => {
      return {
        'text-blue-600 bg-blue-50 rounded px-1': type === 'interview',
        'text-green-600 bg-green-50 rounded px-1': type === 'training',
        'text-red-600 bg-red-50 rounded px-1': type === 'deadline',
        'text-purple-600 bg-purple-50 rounded px-1': type === 'meeting',
        'text-yellow-600 bg-yellow-50 rounded px-1': type === 'other'
      }
    }

    // Navigation functions
    const prevMonth = () => {
      if (currentMonth.value === 0) {
        currentMonth.value = 11
        currentYear.value--
      } else {
        currentMonth.value--
      }
    }

    const nextMonth = () => {
      if (currentMonth.value === 11) {
        currentMonth.value = 0
        currentYear.value++
      } else {
        currentMonth.value++
      }
    }

    const showDayDetails = (day: CalendarDay) => {
      if (day.eventDetails && day.event) {
        const title = `Agenda ${day.date} ${months[day.month]} ${day.year} - ${day.event.title}`
        const content = day.eventDetails.map(detail => `
          <div class="mb-3 pb-2 border-b last:border-b-0">
            <strong>${detail.title}</strong>
            <div class="text-sm">${detail.time}</div>
            <div class="text-sm text-gray-500">${detail.note}</div>
          </div>
        `).join('')
        
        emit('show-interview', title, content)
      }
    }

    // Add new event
    const addNewEvent = () => {
      if (!newEvent.value.title || !newEvent.value.date) {
        alert('Judul dan tanggal harus diisi')
        return
      }

      const date = new Date(newEvent.value.date)
      const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      
      const eventDetails: EventDetail[] = [{
        title: newEvent.value.title,
        time: newEvent.value.time,
        note: newEvent.value.note
      }]
      
      // If there are details, split them into multiple event details
      if (newEvent.value.details) {
        const details = newEvent.value.details.split('\n').filter(d => d.trim())
        if (details.length > 0) {
          eventDetails.push(...details.map(d => ({
            title: d,
            time: newEvent.value.time,
            note: newEvent.value.note
          })))
        }
      }
      
      // Add to events
      hrEvents.value[dateKey] = {
        event: {
          type: newEvent.value.type as 'interview' | 'training' | 'deadline',
          title: getEventTitle(newEvent.value.type)
        },
        eventDetails
      }
      
      // Reset form and close modal
      newEvent.value = {
        type: 'interview',
        title: '',
        date: '',
        time: '',
        note: '',
        details: ''
      }
      
      showAddEventModal.value = false
    }

    const getEventTitle = (type: string): string => {
      const titles: Record<string, string> = {
        interview: 'Interview',
        training: 'Training',
        deadline: 'Deadline',
        meeting: 'Meeting',
        other: 'Agenda'
      }
      return titles[type] || 'Agenda'
    }

    // Load events when component mounts
    onMounted(() => {
      loadEvents()
      
      // Set default date for new event to today
      const today = new Date()
      newEvent.value.date = today.toISOString().split('T')[0]
    })

    return { 
      days, 
      calendar, 
      currentMonthName,
      currentYear,
      eventClasses, 
      showDayDetails,
      prevMonth,
      nextMonth,
      isToday,
      showAddEventModal,
      newEvent,
      addNewEvent
    }
  }
})
</script>