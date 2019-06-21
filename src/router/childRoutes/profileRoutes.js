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