<template>
  <div class="container">
    <div class="add-new">Hiệu chỉnh đầu sách</div>
    <div class="form">
      <form @submit.prevent="updateBook()">
        <div class="form-item">
          <label class="label" for="bookTitle">Tên sách:</label><br />
          <input
            class="input"
            type="text"
            id="bookTitle"
            v-model="formData.bookTitle"
          />
        </div>

        <div class="form-item">
          <label class="label" for="price">Giá:</label><br />
          <input
            class="input"
            type="number"
            id="price"
            v-model="formData.price"
          />
        </div>

        <div class="form-item">
          <label class="label" for="quantity">Số lượng:</label><br />
          <input
            class="input"
            type="number"
            id="quantity"
            v-model="formData.quantity"
          />
        </div>

        <div class="form-item">
          <label class="label" for="publishYear">Năm phát hành:</label><br />
          <input
            class="input"
            type="text"
            id="publishYear"
            v-model="formData.publishYear"
          />
        </div>

        <div class="form-item">
          <label class="label" for="author">Tác giả:</label><br />
          <input
            class="input"
            type="text"
            id="author"
            v-model="formData.author"
          />
        </div>

        <div class="form-item">
          <label class="label" for="thumbnail">Ảnh sách</label><br />
          <input
            class="input"
            type="file"
            id="thumbnail"
            accept="image/*"
            @change="handleFileUpload"
          />
          <div v-if="formData.thumbnail">
            {{ getFileName(formData.thumbnail) }}
            <div v-if="imageChanged">{{ info }}</div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import BookService from "@/services/admin/book.service";

export default {
  data() {
    return {
      info: "Image data is being updated",
      imageChanged: false,
      formData: {
        id_publisher: "",
        bookTitle: "",
        price: 0,
        quantity: 0,
        publishYear: "",
        author: "",
        thumbnail: null,
      },
    };
  },
  mounted() {
    this.retrieve(this.$route.params.id);
  },

  methods: {
    async retrieve(bookId) {
      try {
        const book = await BookService.get(bookId);
        if (book) {
          this.formData.id_publisher = book.id_publisher;
          this.formData.bookTitle = book.bookTitle;
          this.formData.price = book.price;
          this.formData.quantity = book.quantity;
          this.formData.publishYear = book.publishYear;
          this.formData.author = book.author;
          this.formData.thumbnail = book.thumbnail;
        } else {
          console.log("Book not found");
        }

        console.log(book);
      } catch (error) {
        console.log(error);
      }
    },

    getFileName(file) {
      // Extract and return only the file name
      return file instanceof File ? file.name : file;
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      this.formData.thumbnail = file;
      this.imageChanged = true;
    },

    async updateBook() {
      try {
        if (
          !this.formData.bookTitle ||
          !this.formData.price ||
          !this.formData.quantity ||
          !this.formData.publishYear ||
          !this.formData.author ||
          !this.formData.thumbnail
        ) {
          toast.error("Please fill in all required fields.", {
            autoClose: 3000,
          });
          return;
        }

        const formData = new FormData();
        formData.append("id_publisher", this.formData.id_publisher);
        formData.append("bookTitle", this.formData.bookTitle);
        formData.append("price", this.formData.price);
        formData.append("quantity", this.formData.quantity);
        formData.append("publishYear", this.formData.publishYear); // Append the image file
        formData.append("author", this.formData.author);
        formData.append("thumbnail", this.formData.thumbnail);
        const response = await BookService.update(
          this.$route.params.id,
          this.formData
        );
        console.log(response);
        alert("Book was updated");
        this.$router.push({ name: "book" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  width: 60%;
  height: 700px;
  text-align: center;
  /* margin-top: 10px; */
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.add-new {
  font-size: 30px;
  margin-top: 10px;
}

.form-item {
  text-align: left;
  padding: 10px;
}

.label {
  font-weight: bold;
}

.input {
  width: 100%;
  /* height: 40px; */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
