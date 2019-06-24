const KBRoutes = [
  {
    path: '',
    name: 'kb',
    redirect: (to) => ({...to, name: 'kb-catalog'})
  },
  {
    path: 'catalog',
    name: 'kb-catalog',
    component: () => import('../../views/KBViews/KBCatalog.vue')
  },
  {
    path: 'all',
    name: 'kb-all',
    component: () => import('../../views/KBViews/KBAll.vue')
  },
  {
    path: 'search',
    name: 'kb-search',
    component: () => import('../../views/KBViews/KBSearch.vue')
  },
  {
    path: 'bookmarks',
    name: 'kb-bookmarks',
    component: () => import('../../views/KBViews/KBAll.vue')
  },
];

export default KBRoutes;
