import Vue from 'vue'
import Router from 'vue-router'
import {unrequireAuth} from './router-guards'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/blog:slug',
      name: 'blog',
      component: () => import('../views/BlogPage.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      beforeEnter: unrequireAuth,
      component: () => import('../views/Signin.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      beforeEnter: unrequireAuth,
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/signin/forgot',
      name: 'forgot-password',
      beforeEnter: unrequireAuth,
      component: () => import('../views/Signin.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/FAQ.vue')
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {selector: to.hash, offset: {x:0, y: 150}}
    }
    return { x: 0, y: 0 };
  }
})
