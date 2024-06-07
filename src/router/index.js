import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import FavoritePage from '@/pages/FavoritePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import ParentPage from '@/pages/ParentPage.vue'
import DetailPage from '@/pages/DetailPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import { nextTick } from 'vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundPage
    },
    {
      path: '/',
      component: ParentPage,
      children: [
        {
          path: '',
          name: 'home',
          component: HomePage
        },
        {
          path: 'favorites',
          name: 'favorites',
          component: FavoritePage
        },
        {
          path: 'movies/:movieId',
          name: 'detailMovie',
          component: DetailPage
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const access_token = localStorage.access_token
  if (to.name === "favorites" && !access_token) {
    next({ name: "login" })
  } else if (to.name === "login" && access_token) {
    next({ name: "home"})
  } else if (to.name === "register" && access_token) {
    next({ name: "home" })
  } else {
    next()
  }
})

export default router
