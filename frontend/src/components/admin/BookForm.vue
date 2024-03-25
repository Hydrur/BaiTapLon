<template>
  <Form @submit="submitBook" :validation-schema="bookFormSchema" >
    <div class="form-group">
      <label for="bookTitle">Tên Sách:</label>
      <Field
        name="bookTitle"
        type="text"
        class="form-control"
        v-model="bookLocal.bookTitle"
      />
      <ErrorMessage name="bookTitle" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="price">Giá:</label>
      <Field
        name="price"
        type="text"
        class="form-control"
        v-model="bookLocal.price"
      />
      <ErrorMessage name="price" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="quantity">Số lượng:</label>
      <Field
        name="quantity"
        type="text"
        class="form-control"
        v-model="bookLocal.quantity"
      />
      <ErrorMessage name="quantity" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="publishYear">Năm phát hành:</label>
      <Field
        name="publishYear"
        type="text"
        class="form-control"
        v-model="bookLocal.publishYear"
      />
      <ErrorMessage name="publishYear" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="author">Tác giả:</label>
      <Field
        name="author"
        type="text"
        class="form-control"
        v-model="bookLocal.author"
      />
      <ErrorMessage name="author" class="error-feedback" />
    </div>
    <div class="form-group">
    <label for="thumbnail">Ảnh bìa sách:</label>
    <input
      class="input"
      type="file"
      id="thumbnail"
      accept="image/jpg, image/png"
      @change="handleFileUpload"
    />
    <ErrorMessage name="thumbnail" class="error-feedback" />
  </div>
    <div class="form-group mt-3">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="bookLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteBook"
      >
        Xóa
      </button>
    </div>
  </Form>
</template>
  
  <script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:book", "delete:book"],
  props: {
    book: { type: Object, required: true },
  },
  data() {
    const bookFormSchema = yup.object().shape({
      bookTitle: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // bookLocal để liên kết với các input trên form
      bookLocal:this.book,
      bookFormSchema,
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]; // Lấy tệp tin từ sự kiện
      this.bookLocal.thumbnail =file.name; // Lưu trữ tệp tin vào bookLocal hoặc trường tương ứng
    },
    submitBook() {
      this.$emit("submit:book", this.bookLocal);
      // console.log(this.bookLocal)
    },
    deleteBook() {
      this.$emit("delete:book", this.bookLocal.id);
    },
  },
};
</script>
  
<style scoped>
@import "@/assets/form.css";
</style>