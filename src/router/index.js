import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AdminHelpView from '../views/AdminHelpView.vue'
import MakeAnOfferingView from '../views/MakeAnOfferingView.vue'
import LiveMassTimesView from '../views/LiveMassTimesView.vue'
import TestimonialsView from '../views/TestimonialsView.vue'
import SeeUpcomingEventsView from '../views/SeeUpcomingEventsView.vue'
import Admin from '../views/Admin.vue'
import MemberView from '@/views/MemberView.vue'
import PriestView from '@/views/PriestView.vue'
import PriestSchedule from '../views/PriestSchedule.vue'
import PriestUpcomingEvents from '../views/PriestUpcomingEvents.vue'
import PriestCongregants from '../views/PriestCongregants.vue'
import LoginView from '../views/Login.vue'
import RegisterView from '../views/RegisterView.vue'
import UpcomingEvents from '../views/UpcomingEvents.vue'
import BookEvents from '../views/BookEvents.vue'
import PriestConsultation from '../views/PriestConsultation.vue'
import PayTithes from '../views/PayTithes.vue'
import YouthView from '../views/YouthView.vue'
import YouthUpcomingEventsView from '../views/YouthUpcomingEvents.vue'
import YouthChurchEventsView from '../views/YouthChurchEvents.vue'
import YouthPriestConsultationView from '../views/YouthPriestConsultation.vue'
import YouthPayTithesView from '../views/YouthPayTithes.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/admin-help', name: 'AdminHelp', component: AdminHelpView },
  { path: '/make-an-offering', name: 'MakeAnOffering', component: MakeAnOfferingView },
  { path: '/live-mass-times', name: 'LiveMassTimes', component: LiveMassTimesView },
  { path: '/testimonials', name: 'Testimonials', component: TestimonialsView },
  { path: '/see-upcoming-events', name: 'SeeUpcomingEvents', component: SeeUpcomingEventsView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/admin', name: 'Admin', component: Admin},
  { path: '/member', name: 'Member', component: MemberView },
  { path: '/priest', name: 'Priest', component: PriestView },
 
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/upcoming-events', name: 'UpcomingEvents', component: UpcomingEvents },
  {
    path: '/priest/schedule',
    name: 'PriestSchedule',
    component: PriestSchedule
  },
  {
    path: '/priest/upcoming-events',
    name: 'PriestUpcomingEvents',
    component: PriestUpcomingEvents
  },
  {
    path: '/priest/congregants',
    name: 'PriestCongregants',
    component: PriestCongregants
  },
  { path: '/book-church-events', name: 'BookEvents', component: BookEvents },
  { path: '/priest-consultation', name: 'PriestConsultation', component: PriestConsultation },
  { path: '/pay-tithes', name: 'PayTithes', component: PayTithes },
  { path: '/youth', name: 'youth', component: YouthView },
  { path: '/youth/upcoming-events', name: 'YouthUpcomingEvents', component: YouthUpcomingEventsView },
  { path: '/youth/book-church-events', name: 'YouthChurchEvents', component: YouthChurchEventsView },
  { path: '/youth/priest-consultation', name: 'YouthPriestConsultation', component: YouthPriestConsultationView },
  { path: '/youth/pay-tithes', name: 'YouthPayTithes', component: YouthPayTithesView }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
