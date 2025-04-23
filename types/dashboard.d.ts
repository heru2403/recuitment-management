export interface MenuItem {
  text: string
  to: string
  icon: string
}

export interface Applicant {
  id: number
  name: string
  position: string
  status: string
  avatar: string
}

export interface CalendarEvent {
  type: 'interview' | 'training' | 'deadline'
  title: string
}

export interface EventDetail {
  title: string
  time: string
  note: string
}

export interface CalendarDay {
  date: number
  month: number  // Ubah ke tipe number
  year: number
  currentMonth: boolean
  event?: CalendarEvent
  eventDetails?: EventDetail[]
}
export interface QuickAction {
  subtext: any
  completed: any
  iconColor: unknown
  completed: any
  completed: any[] | Booleanish | Set<any> | undefined
  iconColor: any
  completed: any
  text: string
  icon: string
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  action: string
}

export interface Birthday {
  id: number
  name: string
  days: string
  avatar: string
}