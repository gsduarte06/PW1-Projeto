import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPageView.vue'
import LoginPage from '../views/LoginPageView.vue'
import RegisterPage from '../views/RegisterPageView.vue'
import LeaderboardPage from '../views/LeaderboardPageView.vue'
import ProfilePage from '../views/ProfilePageView.vue'
import EventPage from '../views/EventPageView.vue'
import MerchandisingPage from '../views/MerchandisingPageView.vue'
import AdminPage from '../views/Admin/AdminPageView.vue'
import AdminEventPage from '../views/Admin/AdminEventPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderboardPage,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
    },
    {
      path: '/event/:eventId',
      name: 'event',
      component: EventPage,
    },
    {
      path: '/merchandising',
      name: 'merchandising',
      component: MerchandisingPage,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage,
      /*       beforeEnter: (to, from, next) => {
        //insert admin validation
      }, */
    },
    {
      path: '/admin/:eventId',
      name: 'AdminEvent',
      component: AdminEventPage,
      /*       beforeEnter: (to, from, next) => {
        //insert admin validation
      }, */
    },
  ],
})
/* router.beforeEach((to, from, next) => {
  if (from.path != '/' || from.path != '/leaderboard') {
    //Insert login validation
  } else {
    next()
  }
}) */
export default router
