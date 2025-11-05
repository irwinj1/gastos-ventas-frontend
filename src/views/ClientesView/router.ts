export const clientesRoute = [
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('./index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/agregar-cliente',
      name: 'addCliente',
      component: () => import('./views/AddClient.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/editar-cliente/:id',
      name: 'updateCliente',
      component: () => import('./views/UpdateClient.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/ver-cliente/:id',
      name: 'verCliente',
      component: () => import('./views/UpdateClient.vue'),
      meta: { requiresAuth: true },
    },
  ];