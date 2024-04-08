<template>
  <div>
  <div class="container d-flex justify-content-between">
    <div>Bạn cần hỗ trợ: <b class="text-danger">02871086979</b></div>
    <div> Hệ thống cửa hàngLiên hệ hỗ trợ (07:30 - 17:00)</div>
  </div>
  <nav class="navbar navbar-expand">
    <div class="navbar-brand-container">
      <a href="/books" class="navbar-brand">
        <img src="/client/SpringBook.png" alt="" />
      </a>
      <div class="mr-auto navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'book-client' }" class="nav-link">
            <h5><b>Sách</b></h5>
            <i class="fa-solid fa-book"></i>
          </router-link>
        </li>
        <li class="nav-item" style="width: 180px">
          <router-link :to="{ name: 'borrow-client' }" class="nav-link">
            
            <h5><b>Đơn Mượn</b></h5>
            <i class="fa-solid fa-basket-shopping"></i>
          </router-link>
        </li>
      </div>
    </div>
    <div class="login-logout-register-container">
      <div v-if="isLoggedIn">
        <button class="btn btn-primary">
          <router-link :to="{ name: 'infor-client' }" class="nav-link" style="margin:0;">
            Thông tin cá nhân
          </router-link>
        </button>
        <button class="btn btn-danger button-logout" @click="logout">
          Đăng Xuất
        </button>
      </div>
      <div v-else>
        <button class="btn btn-primary button-login" @click="login">
          Đăng Nhập
        </button>
        <button class="btn btn-danger button-register" @click="register">
          Đăng Ký
        </button>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
import Authorization from "@/services/client/authorization.service";
export default {
  data() {
    return {
      isLoggedIn: false, // Ban đầu chưa đăng nhập
    };
  },
  created() {
    this.checkLoggedIn(); // Gọi phương thức kiểm tra đăng nhập khi component được tạo
  },
  computed: {},
  name: "app-header-admin",
  methods: {
    checkLoggedIn() {
      const token = this.getTokenFromCookie(); // Phương thức để lấy token từ cookie
      if (token) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
    getTokenFromCookie() {
      // Phương thức để lấy token từ cookie
      const name = "tokenUser="; // Tên cookie chứa token
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(";");
      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
      return null;
    },
    login() {
      // Xử lý đăng nhập ở đây
      this.$router.push({ name: "login-client" });
      // this.isLoggedIn = true;
    },
    logout() {
      // Xử lý đăng xuất ở đây
      try {
        const respone = Authorization.logOut();
        // this.isLoggedIn = false;
        this.$router.push({ name: "login-client" });
      } catch (error) {
        console.log(error);
      }
    },
    register() {
      // Xử lý đăng ký ở đây
      this.$router.push({ name: "register-client" });
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

.login-logout-register-container {
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
