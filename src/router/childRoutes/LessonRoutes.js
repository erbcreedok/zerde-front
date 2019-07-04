const LessonRoutes = [
  {
    path: 'video',
    name: 'lesson-video',
    component: () => import('../../views/CLViews/CL.vue')
  },
  {
    path: 'text',
    name: 'lesson-text',
    component: () => import('../../views/CLViews/CL.vue')
  },
  {
    path: 'resources',
    name: 'lesson-resources',
    component: () => import('../../views/CLViews/CL.vue')
  },
  {
    path: 'comments',
    name: 'lesson-comments',
    component: () => import('../../views/CLViews/CL.vue')
  },
];

export default LessonRoutes;
