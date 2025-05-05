import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faTachometerAlt, 
  faUserPlus, 
  faUsers, 
  faCalendarAlt, 
  faFileInvoiceDollar, 
  faChartBar, 
  faSignOutAlt, 
  faBars,
  faUserFriends,
  faCalendarCheck,
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

config.autoAddCss = false
library.add(
  faTachometerAlt, 
  faUserPlus, 
  faUsers, 
  faCalendarAlt, 
  faFileInvoiceDollar, 
  faChartBar, 
  faSignOutAlt, 
  faBars,
  faUserFriends,
  faCalendarCheck,
  faExclamationCircle,
  faEnvelope,
  faFileExport,
  faTimes,
  faShieldAlt, 
  faTachometerAlt, 
  faUsers, 
  faUserTag, 
  faCog, 
  faSignOutAlt, 
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
  faUserPlus,
  faFileExport,
  faDatabase

)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})