export const clientesRoute = [
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('./index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/add-cliente',
      name: 'addCliente',
      component: () => import('./views/AddClient.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/update-cliente',
      name: 'updateCliente',
      component: () => import('./views/AddClient.vue'),
      meta: { requiresAuth: true },
    },
  ];