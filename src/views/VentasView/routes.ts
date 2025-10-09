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
  ];