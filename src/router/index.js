import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TaskEditPage from '@/views/TaskEditPage.vue';

import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SignInView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignUpView.vue')
    },
    {
      path: '/tasks/:taskId/edit',
      name: 'TaskEdit',
      component: TaskEditPage,
      props: true
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.user === undefined) {
    await userStore.fetchUser()
  }

  if (userStore.user === null && to.name !== 'signin' && to.name !== 'signup') {
    next({ name: 'signin' })
  } else if (userStore.user && (to.name === 'signin' || to.name === 'signup') && useUserStore.user !== undefined) {
    next('/')
  } else {
    next()
  }
})

export default router
