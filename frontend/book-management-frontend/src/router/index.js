// import { createRouter, createWebHistory } from 'vue-router'
// import clientRoutes from './client.route'
// import adminRoutes from './admin.route'

// const routes = [
//   ...clientRoutes,
//   ...adminRoutes,
// ]

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes
// })

// export default router;



import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "book",
    component: () => import("@/views/admin/pages/books/Book.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/admin/pages/books/NotFound.vue"),
  },
  {
    path: "/books/:id",
    name: "book.edit",
    component: () => import("@/views/admin/pages/books/BookEdit.vue"),
    props: true // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/books/create",
    name: "book.add",
    component: () => import("@/views/admin/pages/books/CreateBook.vue"),
    props: true // Truyền các biến trong $route.params vào làm props
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;


