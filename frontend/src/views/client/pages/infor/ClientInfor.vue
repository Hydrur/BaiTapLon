<template>
  <div>
    <ClientAppHeader />

    <div class="infor-page">
      <div class="infor-container">
        <div class="infor-title">Thông tin cá nhân</div>

        <div class="infor-item">
          <label for="fullName" class="infor-label">Họ tên:</label><br />
          <input
            v-model="formData.fullName"
            type="text"
            id="fullName"
            class="infor-input"
          />
        </div>

        <div class="infor-item">
          <label for="email" class="infor-label">Email:</label><br />
          <input
            v-model="formData.email"
            type="text"
            id="email"
            class="infor-input"
          />
        </div>

        <div class="infor-item">
          <label for="address" class="infor-label">Địa chỉ:</label><br />
          <input
            v-model="formData.address"
            type="text"
            id="address"
            class="infor-input"
          />
        </div>

        <div class="infor-item">
          <label for="phone" class="infor-label">Số điện thoại:</label><br />
          <input
            v-model="formData.phone"
            type="text"
            id="phone"
            class="infor-input"
          />
        </div>
      </div>
    </div>
    <ClientAppFooter/>
  </div>
</template>
    
    <script>
import "vue3-toastify/dist/index.css";
import ClientAppHeader from "@/components/client/ClientAppHeader.vue";
import ClientAppFooter from "@/components/client/ClientAppFooter.vue";
import ReaderService from "@/services/client/reader.service";

export default {
  components: {
    ClientAppHeader,
    ClientAppFooter,
  },
  data() {
    return {
      formData: {
        fullName: "",
        email: "",
        address: "",
        phone: "",
      },
    };
  },
  methods: {
    async getInfor() {
      // Xử lý đăng xuất ở đây
      try {
        const readerResponse = await ReaderService.getInfor();
        const reader = readerResponse.reader;
        if (reader) {
          this.formData.fullName = reader.fullName;
          this.formData.email = reader.email;
          this.formData.address = reader.address;
          this.formData.phone = reader.phone;
        } else {
          console.log("Employee not found");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getInfor();
  },
};
</script>
    
  <style scoped>
.infor-page {
  margin-top: 30px;
}

.infor-container {
  width: 80%;
  max-width: 500px;
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
}

.infor-title {
  font-size: 30px;
  margin-bottom: 20px;
}

.infor-item {
  margin: 10px 0;
  text-align: left;
}

.infor-label {
  font-weight: bold;
}

.infor-input {
  width: calc(
    100% - 20px
  ); /* Take up the width of the container minus 20px padding */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: transparent;
}
</style>