import {requireAuth} from '../router-guards'

const profileRoutes = [
  {
    path: '',
    name: 'user',
    redirect: (to) => ({...to, name: 'profile-main'})
  },
  {
    path: 'home',
    name: 'profile-main',
    component: () => import('../../views/ProfileViews/ProfileMain.vue'),
  },
  {
    path: 'qa',
    name: 'profile-qa',
    component: () => import('../../views/ProfileViews/ProfileQA.vue'),
  },
  {
    path: 'comments',
    name: 'profile-comments',
    component: () => import('../../views/ProfileViews/ProfileComments.vue'),
  },
  {
    path: 'bookmarks',
    name: 'profile-bookmarks',
    component: () => import('../../views/ProfileViews/ProfileBookmarks.vue'),
    beforeEnter: requireAuth
  },
  {
    path: 'settings',
    name: 'profile-settings',
    component: () => import('../../views/ProfileViews/ProfileSettings.vue'),
    beforeEnter: requireAuth
  },
];

export default profileRoutes;
