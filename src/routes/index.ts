import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";
import { authGuard } from "../guards/authGuards";
import { ventasRoute } from "../views/VentasView/routes";
import { gastosRoute } from "../views/GastosView/routes";
import { clientesRoute } from "../views/ClientesView/router";

const routes = [
    {
        path: '/',
        component: () => import('../views/layouts/AdminLayout.vue'),
        children: [
            {
                path: '', // ← ruta vacía, se mostrará por defecto dentro del layout
                component: () => import('../views/HomeView/index.vue'),
                meta:{requiresAuth:true}
            },
            
            ...ventasRoute,
            ...gastosRoute,
            ...clientesRoute
        ],
        meta:{requiresAuth:true}
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('../views/layouts/PublicLayout.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
  
    await authGuard(to,from,next)


})

export default router;