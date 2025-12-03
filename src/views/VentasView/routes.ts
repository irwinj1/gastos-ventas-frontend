export const ventasRoute = [
    {
      path: '/ventas',
      name: 'ventas',
      component: () => import('./index.vue'),
      meta: { requiresAuth: true },
    },
    {
        path: '/ventas/agregar', // <-- sin /
        name: 'agregar-venta',
        component: () => import('./views/agregarVentas.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/ventas/editar/:id',
        name: 'editar-venta',
        component: () => import('./views/EditarVentas.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/ventas/ver/:id',
        name: 'ver-venta',
        component: () => import('./views/VerVentas.vue'),
        meta: { requiresAuth: true },
    },
  ];