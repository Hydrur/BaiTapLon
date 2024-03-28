<template>
  <div class="darken-layer">
    <div class="form-wrap">
      <div class="login-wrap">
        <div class="login-wrap__left"></div>
        <div class="login-wrap__right">
          <strong class="login-wrap__right--title"> ĐĂNG KÍ </strong>
          <span class="login-wrap__right--welcome-text">
            Chào Mừng Đến Trang Admin
          </span>
          <strong  class="login-wrap__right--warning">
            Vui lòng liên hệ Admin hoặc sử dụng một tài khoản khác, tài khoản
            khách không được phép tạo mới!
          </strong>
          <div class="d-flex justify-content-center align-items-center">
            <span class="line"></span>
            <span style="color: #aaa; font-size: 1.2rem; margin: 3rem 1rem"
              >or</span
            >
            <span class="line"></span>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div style="font-size: 1.4rem">Đã có tài khoản ?</div>
            <router-link :to="`/admin/auth/login`" class="redirect-page">
              Đăng nhập
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  <script>
import { defineComponent } from "vue";
export default defineComponent({});
</script>
  
  
  <style lang="scss" scoped>
$color-fade: #666;

.darken-layer {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
}

.form-wrap {
  background-image: url("https://preview.colorlib.com/theme/bootstrap/login-form-20/images/bg.jpg.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-wrap {
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    width: 70%;
    height: 80%;
    position: relative;
    z-index: 3;

    &__left {
      background-image: url("https://preview.colorlib.com/theme/bootstrap/login-form-20/images/bg.jpg.webp");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 50%;
    }

    &__right {
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 50%;
      padding: 2rem;

      &--title {
        font-size: 2.2rem;
        font-weight: 600;
        text-transform: uppercase;
      }

      &--welcome-text {
        color: $color-fade;
        margin-top: 1.8rem;
        font-size: 1.5rem;
      }
    }

    form {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      label {
        margin-top: 2.5rem;
        color: $color-fade;
        font-size: 1.3rem;
      }

      input {
        color: #000;
        display: flex;
        width: 30rem;
        padding: 1.75rem;
      }

      .custom-submit-btn {
        margin-top: 3rem;
        font-size: 1.4rem;
        padding: 0.4rem 4rem;
        border-radius: 5px;
        color: #fff;
        background-color: #595959;
      }
    }
  }

  .line {
    height: 2px;
    background-color: #ddd;
    width: 5rem;
  }
  .redirect-page {
    margin-left: 0.5rem;
    font-size: 1.4rem;
    color: #000;
  }
}

.login-wrap__right--warning {
    margin-top: 30px;
    max-width: 35rem; /* Đặt chiều rộng tùy ý */
  text-align: center; /* Căn giữa nội dung */
  margin-left: auto; /* Canh lề trái tự động */
  margin-right: auto; /* Canh lề phải tự động */
}
</style>
  
  