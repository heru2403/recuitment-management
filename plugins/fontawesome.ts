import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faTachometerAlt, 
  faUser,
  faUserPlus, 
  faUsers, 
  faCalendarAlt, 
  faCalendarCheck,
  faPlane,
  faFileInvoiceDollar, 
  faTasks,
  faChartBar, 
  faSignOutAlt, 
  faBars,
  faUserFriends,
  faExclamationCircle,
  faEnvelope,
  faFileExport,
  faTimes,
  faUserTag, 
  faCog, 
  faBell, 
  faChevronDown, 
  faUserCircle,
  faSyncAlt,
  faCircleCheck,
  faUserCheck,
  faClock,
  faArrowRight,
  faCaretUp,
  faCaretDown,
  faDatabase,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons'

// Konfigurasi untuk mencegah penambahan CSS otomatis
config.autoAddCss = false

// Tambahkan semua ikon ke library
library.add(
  // Ikon dasar
  faTachometerAlt,
  faUser,
  faUserPlus,
  faUsers,
  faUserFriends,
  faUserTag,
  faUserCircle,
  faUserCheck,
  
  // Ikon kalender dan waktu
  faCalendarAlt,
  faCalendarCheck,
  faClock,
  
  // Ikon dokumen
  faFileInvoiceDollar,
  faFileExport,
  
  // Ikon navigasi
  faBars,
  faSignOutAlt,
  faChevronDown,
  faArrowRight,
  faCaretUp,
  faCaretDown,
  
  // Ikon aksi
  faTasks,
  faChartBar,
  faSyncAlt,
  faCircleCheck,
  faTimes,
  
  // Ikon notifikasi
  faExclamationCircle,
  faEnvelope,
  faBell,
  
  // Ikon sistem
  faCog,
  faDatabase,
  faShieldAlt,
  
  // Ikon khusus
  faPlane
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})