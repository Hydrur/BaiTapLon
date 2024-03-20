import LayoutDefaultAdmin from '../views/admin/layouts/LayoutDefault.vue'

const adminRoutes = [
    {
        path: '/admin',
        name: 'layout-default-admin',
        component: LayoutDefaultAdmin,
        children: [
            {
                path: 'dashboard',
                name: 'dashboard-page',
                component: () => import('@/views/admin/pages/dashboard/Dashboard.vue')
            },
            {
                path: 'products',
                name: 'products-page-admin',
                component: () => import('@/views/admin/pages/products/Products.vue')
            },
           
        ]
    },
]

export default adminRoutes;
