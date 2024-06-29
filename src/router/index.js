import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AdminHelpView from '../views/AdminHelpView.vue'
import MakeAnOfferingView from '../views/MakeAnOfferingView.vue'
import LiveMassTimesView from '../views/LiveMassTimesView.vue'
import TestimonialsView from '../views/TestimonialsView.vue'
import SeeUpcomingEventsView from '../views/SeeUpcomingEventsView.vue'
import AdminView from '../views/Admin.vue'
import LoginView from '../views/Login.vue'
import MemberView from '../views/MemberView.vue';
import RegisterView from '@/views/RegisterView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/admin-help', name: 'AdminHelp', component: AdminHelpView },
  { path: '/make-an-offering', name: 'MakeAnOffering', component: MakeAnOfferingView },
  { path: '/live-mass-times', name: 'LiveMassTimes', component: LiveMassTimesView },
  { path: '/testimonials', name: 'Testimonials', component: TestimonialsView },
  { path: '/see-upcoming-events', name: 'SeeUpcomingEvents', component: SeeUpcomingEventsView },
  { path: '/admin', name: 'Admin', component: AdminView },
  { path: '/member', name: 'Member', component: MemberView },
 { path: '/register', name: 'register', component: RegisterView },
{ path: '/book-events', name: 'BookEvents', component: BookEventsView },
{ path: '/church-activity', name: 'ChurchActivity', component: ChurchActivityView },
{ path: '/pay-tithes', name: 'PayTithes', component: PayTithesView },
{ path: '/priest-consultation', name: 'PriestConsultation', component: PriestConsultationView },
 {
  path: '/',
  name: 'Home',
  component: () => import('../views/HomeView.vue'),  // Default route
},
   
  { path: '/login', name: 'Login', component: LoginView }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router