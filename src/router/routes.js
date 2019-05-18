import {unrequireAuth} from "./router-guards";

export default [
  {
    path: '',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: 'about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: 'blog:slug',
    name: 'blog',
    component: () => import('../views/BlogPage.vue')
  },
  {
    path: 'signin',
    name: 'signin',
    beforeEnter: unrequireAuth,
    component: () => import('../views/Signin.vue')
  },
  {
    path: 'signup',
    name: 'signup',
    beforeEnter: unrequireAuth,
    component: () => import('../views/Signup.vue')
  },
  {
    path: 'signin/forgot',
    name: 'forgot-password',
    beforeEnter: unrequireAuth,
    component: () => import('../views/Signin.vue')
  },
  {
    path: 'qa',
    name: 'qa',
    component: () => import('../views/QA.vue')
  },
];
