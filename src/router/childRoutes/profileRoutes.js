import {requireAuth} from '../router-guards'

const profileRoutes = [
  {
    path: '',
    name: 'user',
    component: () => import('../../views/ProfileViews/ProfileMain.vue'),
  },
  {
    path: 'settings',
    name: 'profile-settings',
    component: () => import('../../views/ProfileViews/ProfileSettings.vue'),
    beforeEnter: requireAuth
  }
];

export default profileRoutes;