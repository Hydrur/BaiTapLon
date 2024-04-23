<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <img :src="'http://localhost:3000/uploads/' + book.thumbnail" alt="" class="book-thumbnail">
      </div>
      <div class="col-4 book-details">
        <div class="p-1">
          <strong>Tên sách:</strong>
          {{ book.bookTitle }}
        </div>
        <div class="p-1">
          <strong>Giá: </strong>
          {{ book.price }}
        </div>
        <div class="p-1">
          <strong>Số lượng: </strong>
          {{ book.quantity }}
        </div>
        <div class="p-1">
          <strong>Số lượng sách còn lại: </strong>
          {{ remainingBooks }}
        </div>
        <div class="p-1">
          <strong>Tác giả:</strong>
          {{ book.author }}
        </div>
        <div class="p-1">
          <strong>Tên nhà xuất bản:</strong>
          {{ book.publisherName }}
        </div>
        <div class="p-1">
          <strong>Năm xuất bản:</strong>
          {{ book.publishYear }}
        </div>
        <div class="p-1">
          <strong>Địa chỉ NXB:</strong>
          {{ book.publisherAddress }}
        </div>
      </div>
      <div class="col-4">
        <h4>Đăng ký mượn sách</h4>
        <div class="form">
          <form @submit.prevent="add" action="" enctype="multipart/form-data" method="post">
            <div class="form-item mb-3">
              <label class="label" for="quantity">Số lượng:</label><br />
              <input class="input" type="number" id="quantity" min="1" max="3" required v-model="formData.quantity" />
            </div>
            <div class="form-item mb-3">
              <label class="label" for="borrowDate">Ngày mượn:</label><br />
              <input class="input" type="date" id="borrowDate" required v-model="formData.borrowDate" />
            </div>
            <div class="form-item mb-3">
              <label class="label" for="returnDate">Ngày trả:</label><br />
              <input class="input" type="date" id="returnDate" required v-model="formData.returnDate" />
            </div>

            <button type="submit" class="btn btn-primary mb-3">Đăng ký mượn</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import ReaderService from "@/services/client/reader.service";

export default {
  props: {
    book: { type: Object, required: true },
  },
  data() {
    return {
      formData: {
        quantity: 1,
        borrowDate: "",
        returnDate: "",
        book_id: this.book._id,
      },
      remainingBooks: 0,
    };
  },
  watch: {
    // Giám sát sự thay đổi của prop 'book'
    book: {
      handler() {
        // Gọi phương thức updateRemainingBooks() mỗi khi prop 'book' thay đổi
        this.updateRemainingBooks();
      },
      deep: true, // Giám sát sâu vào các thuộc tính của 'book'
    },
  },
  methods: {
    async add() {
      try {
        const formData = new FormData();
        formData.append("quantity", this.formData.quantity);
        formData.append("book_id", this.formData.book_id);
        formData.append("borrowDate", this.formData.borrowDate);
        formData.append("returnDate", this.formData.returnDate);
        console.log(this.formData)
        const response = await ReaderService.addBook(this.formData);
        toast.success("Added successfully!", {
          autoClose: 1200,
        });

        setTimeout(() => {
          this.$router.push({ name: "borrow-client" });
        }, 800);
      } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.error || "Số lượng sách không đủ để mượn!";
        toast.error(errorMessage, { autoClose: 3000 });
        setTimeout(() => {
          this.$router.push({ name: "borrow-client" });
        }, 800);
      }
    },
    async updateRemainingBooks() {
      try {
        const response = await ReaderService.getNumberBookBorrowed(this.book._id);
        this.remainingBooks = this.book.quantity - response;
      } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.error || "Error!";
        toast.error(errorMessage, { autoClose: 3000 });
      }
    },
  },
  mounted() {
    this.updateRemainingBooks();
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.book-thumbnail {
  width: 100%;
  /* Đảm bảo ảnh chiếm toàn bộ chiều rộng của cột */
  height: auto;
  /* Cho phép chiều cao tự động điều chỉnh theo tỉ lệ */
}

.book-details {
  padding: 0 20px;
  /* Tạo khoảng cách giữa chi tiết sách và ảnh */
}

.form-item {
  margin-bottom: 15px;
  /* Khoảng cách giữa các mục form */
}
</style>