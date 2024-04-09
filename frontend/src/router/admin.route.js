const requireAdminAuth = (to, from, next) => {
  try {
    
    const token = document.cookie.split(';').find(cookie => /\btoken\b/.test(cookie));
    if (token) {
      next();
    } else {
      next('/admin/auth/login');
    }
  } catch (error) {
    next('/admin/auth/login');
  }
};

const adminRoutes = [
  {
    path: "/admin/books",
    name: "book",
    component: () => import("@/views/admin/pages/books/Book.vue"),
    beforeEnter: requireAdminAuth
  },
  {
    path: "/admin/books/:id",
    name: "book.edit",
    component: () => import("@/views/admin/pages/books/BookEdit.vue"),
    beforeEnter: requireAdminAuth,
  },
  {
    path: "/admin/books/create",
    name: "book.add",
    component: () => import("@/views/admin/pages/books/CreateBook.vue"),
    beforeEnter: requireAdminAuth,
  },

  {
    path: "/admin/books/borrow",
    name: "book.borrow",
    component: () => import("@/views/admin/pages/books/Borrow.vue"),
    beforeEnter: requireAdminAuth,
  },

  {
    path: "/admin/employee/infor",
    name: "employee.infor",
    component: () => import("@/views/admin/pages/infor/Infor.vue"),
    beforeEnter: requireAdminAuth,
  },
//   {
//     path: "/admin/*", // Sửa lại định tuyến này để bắt đầu bằng "/"
//     name: "notfound",
//     component: () => import("@/views/admin/pages/books/NotFound.vue"),
//   },
  // {
  //   path: "/:catchAll(.*)", // Bắt tất cả các đường dẫn không hợp lệ
  //   name: "notfound",
  //   component: () => import("@/views/admin/pages/books/NotFound.vue"),
  // },
  {
    path: "/admin/auth/register",
    name: "register",
    component: () => import("@/views/admin/pages/register/Register.vue"),
  },
  {
    path: "/admin/auth/login",
    name: "login",
    component: () => import("@/views/admin/pages/login/Login.vue"),
  },
];

export default adminRoutes;

