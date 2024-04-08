<template>
  <div>
    <footer class="footer">
      <hr />
      <div class="footer__container container">
        <div class="footer__left">
          <img src="/client/SpringBook.png" alt="" />
          <p class="footer__title">Hệ Thống Nhà Sách SpringBook</p>
          <p class="footer__address">
            Trụ sở chính: 805 Hồng Bàng, Phường 09, Quận 5, Hồ Chí Minh, Vietnam
          </p>
          <p class="footer__contact">
            Điện thoại: <a href="tel:02871086979">02871086979</a> Email:
            <a href="mailto:online@springbook.vn">online@springbook.vn</a>
          </p>
        </div>
        <div class="footer__right">
          <ul class="footer__list">
            <li class="footer__item">
              <a href="https://www.facebook.com/" class="footer__link"
                >Facebook</a
              >
            </li>
            <li class="footer__item">
              <img
                src="/client/logo-bct.webp"
                style="width: 250px"
                alt=""
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
    <p class="footer__copyright text-center">
      © 2024 - Cung cấp bởi Brian Nguyen - Thiết kế quản lý bởi SPRINGBOOK
      BOOKSTORE
    </p>
  </div>
</template>
  
  <style scoped>
.footer {
  background-color: #fff; /* Nền màu trắng */
  color: #000; /* Chữ màu đen */
  padding-top: 0;
}

.footer__container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.footer__left {
  flex: 1;
}

.footer__title {
  font-size: 24px;
  margin-bottom: 10px;
}

.footer__address {
  margin-bottom: 10px;
}

.footer__contact {
  margin-bottom: 10px;
}

.footer__right {
  flex: 1;
  text-align: right;
}

.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__item {
  display: inline-block;
  margin-right: 10px;
}

.footer__link {
  color: #000; /* Chữ màu đen */
  text-decoration: none;
  transition: 0.3s;
}

.footer__link:hover {
  color: #666; /* Chữ màu xám */
}

.footer__copyright {
  margin: 0;
  font-size: 14px;
  background-color: #81c240;
  padding: 10px;
  color: #fff;
}
</style>
  