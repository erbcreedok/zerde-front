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
];

export default KBRoutes;
