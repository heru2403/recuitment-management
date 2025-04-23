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
  faTimes
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
  faTimes
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})