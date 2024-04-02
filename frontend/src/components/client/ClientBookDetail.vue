<template>
  <div>
    <hr />
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
      <strong>Tác giả:</strong>
      {{ book.author }}
    </div>
    <hr />
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
    <hr />
    <h4>Đăng ký mượn sách</h4>
    <div class="form">
      <form
        @submit.prevent="add"
        action=""
        enctype="multipart/form-data"
        method="post"
      >
        <div class="form-item mb-3">
          <label class="label" for="quantity">Số lượng:</label><br />
          <input
            class="input"
            type="number"
            id="quantity"
            min="1"
            required
            v-model="formData.quantity"
          />
        </div>

        <button type="submit" class="btn btn-primary mb-3">Đăng ký mượn</button>
      </form>
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
        quantity: 0,
        book_id: this.book._id,
      },
    };
  },
  methods: {
    async add() {
      try {
        const formData = new FormData();
        formData.append("quantity", this.formData.quantity);
        formData.append("book_id", this.formData.book_id);
        const response = await ReaderService.addBook(this.formData);
        toast.success("Added successfully!", {
          autoClose: 1200,
        });

        setTimeout(() => {
          this.$router.push({ name: "borrow-client" });
        }, 800);
      } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.error || "Error!";
        toast.error(errorMessage, { autoClose: 3000 });
      }
    },
  },
};
</script>