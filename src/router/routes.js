import {requireAuth, unrequireAuth} from './router-guards'
import profileRoutes from './childRoutes/profileRoutes'
import KBRoutes from './childRoutes/KBRoutes'
import LessonRoutes from './childRoutes/LessonRoutes'

export default [
  {
    path: '',
    name: 'home',
    component: () => import('../views/Home.vue')
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
  {
    path: 'article/:slug',
    name: 'article',
    props: true,
    component: () => import('../views/KBViews/Article.vue')
  },
  {
    path: 'course/:slug',
    name: 'course',
    props: true,
    component: () => import('../views/CLViews/Course.vue')
  },
  {
    path: 'lesson/:slug',
    props: true,
    component: () => import('../views/CLViews/Lesson.vue'),
    children: LessonRoutes,
  },
  {
    path: 'cl',
    name: 'cl',
    props: true,
    component: () => import('../views/CLViews/CL.vue'),
  },
  {
    path: 'quiz/:slug',
    name: 'quiz',
    props: true,
    component: () => import('../views/CLViews/Quiz.vue'),
  }
];
