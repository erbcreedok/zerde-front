const LessonRoutes = [
  {
    path: '',
    name: 'lesson',
    redirect: (to) => ({...to, name: 'lesson-video'})
  },
  {
    path: 'video',
    name: 'lesson-video',
    component: () => import('../../views/CLViews/LessonTabs/LessonVideo.vue')
  },
  {
    path: 'text',
    name: 'lesson-text',
    component: () => import('../../views/CLViews/LessonTabs/LessonText.vue')
  },
  {
    path: 'resources',
    name: 'lesson-resources',
    component: () => import('../../views/CLViews/LessonTabs/LessonResources.vue')
  },
  {
    path: 'comments',
    name: 'lesson-comments',
    component: () => import('../../views/CLViews/LessonTabs/LessonComments.vue')
  },
];

export default LessonRoutes;
