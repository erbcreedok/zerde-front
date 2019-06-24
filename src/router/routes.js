import {requireAuth, unrequireAuth} from "./router-guards";
import profileRoutes from './childRoutes/profileRoutes'
import KBRoutes from "./childRoutes/KBRoutes";

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
    component: () => import('../views/SignInViews/Signin.vue')
  },
  {
    path: 'signup',
    name: 'signup',
    beforeEnter: unrequireAuth,
    component: () => import('../views/SignInViews/Signup.vue')
  },
  {
    path: 'signin/restore-password',
    name: 'restore-password',
    beforeEnter: unrequireAuth,
    component: () => import('../views/SignInViews/RestorePassword.vue')
  },
  {
    path: 'qa',
    name: 'qa',
    component: () => import('../views/QAViews/QA.vue')
  },
  {
    path: 'qa/new',
    name: 'qa-create',
    props: true,
    beforeEnter: requireAuth,
    component: () => import('../views/QAViews/QACreate.vue')
  },
  {
    path: 'qa/:slug',
    name: 'qa-single',
    props: true,
    component: () => import('../views/QAViews/QASingle.vue')
  },
  {
    path: 'user/:userId',
    props: true,
    component: () => import('../views/ProfileViews/ProfileView.vue'),
    children: profileRoutes,
  },
  {
    path: 'kb',
    props: true,
    component: () => import('../views/KBViews/KB.vue'),
    children: KBRoutes,
  },
];
