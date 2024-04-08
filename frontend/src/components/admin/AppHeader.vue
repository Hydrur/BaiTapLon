<template>
  <nav class="navbar navbar-expand">
    <div class="navbar-brand-container">
      <a href="/admin/books" class="navbar-brand">
        <img src="/client/SpringBook.png" alt="" />
      </a>
      <div class="mr-auto navbar-nav">
        <li class="nav-item" style="width: 150px">
          <router-link :to="{ name: 'book' }" class="nav-link">
            
            <h6><b>Quản lý sách</b></h6>
            <i class="fa-solid fa-book"></i>
          </router-link>
        </li>
        <li class="nav-item" style="width: 200px">
          <router-link :to="{ name: 'book.borrow' }" class="nav-link">
            <h6><b>Quản lý đơn mượn</b></h6>
            <i class="fa-solid fa-basket-shopping"></i>
          </router-link>
        </li>
      </div>
    </div>
    <div class="logout-container">
      <button class="btn btn-primary">
        <router-link :to="{ name: 'employee.infor' }" class="nav-link m-0">
          Thông tin cá nhân
        </router-link>
      </button>
      <button class="btn btn-danger button-logout" @click="logout">
        Đăng Xuất
      </button>
    </div>
  </nav>
</template>

<script>
import Authorization from "@/services/admin/authorization.service.js";
export default {
  computed: {},
  name: "app-header-admin",
  methods: {
    async logout() {
      // Xử lý đăng xuất ở đây
      try {
        const respone = await Authorization.logOut();
        this.$router.push({ name: "login" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>

.navbar {
  background-color: #c6f0a1;
  height: 80px;
}

.navbar-brand-container {
  display: flex;
  align-items: center;
}

.logout-container {
  margin-left: auto;
  margin-right: 20px;
}

.navbar-brand {
  margin-right: 20px; /* Khoảng cách từ biểu tượng sách đến nội dung bên phải */
  margin-left: 10%;
}

.nav-link {
  display: flex;
  align-items: center; /* Canh chỉnh chữ và biểu tượng sách theo chiều ngang */
  margin-right: 15px; /* Khoảng cách giữa các mục nav */
}

.fa-book {
  margin-left: 5px; /* Khoảng cách giữa chữ "Sách" và biểu tượng sách */
}

.btn-danger {
  margin-left: 15px;
}
</style>
