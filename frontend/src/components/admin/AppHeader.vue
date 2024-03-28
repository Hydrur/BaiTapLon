<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/admin/books" class="navbar-brand">Ứng dụng Quản lý Sách</a>
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'book' }" class="nav-link">
          Sách
          <i class="fa-solid fa-book"></i>
        </router-link>
      </li>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {},
  name: "app-header-admin",
};
</script>

<style scoped>
.navbar-brand {
  margin-right: 20px; /* Khoảng cách từ biểu tượng sách đến nội dung bên phải */
  margin-left: 5%;
}

.nav-link {
  display: flex;
  align-items: center; /* Canh chỉnh chữ và biểu tượng sách theo chiều ngang */
  margin-right: 15px; /* Khoảng cách giữa các mục nav */
}

.fa-book {
  margin-left: 5px; /* Khoảng cách giữa chữ "Sách" và biểu tượng sách */
}
</style>
