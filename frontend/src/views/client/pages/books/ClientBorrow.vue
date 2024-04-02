<template>
  <div>
    <ClientAppHeader />

    <div class="container mt-3">
      <h2>Quyển sách đã mượn</h2>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Ảnh sách</th>
            <th>Tên sách</th>
            <th>Số lượng</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(borrowedBook, index) in reader.borrow"
            :key="borrowedBook._id"
          >
            <td>{{ index + 1 }}</td>
            <td>
              <img
                :src="getBookImage(borrowedBook.id_book)"
                alt="Book image"
                width="100"
              />
            </td>
            <td>{{ getBookTitle(borrowedBook.id_book) }}</td>
            <td>{{ borrowedBook.quantity }}</td>
            <td>{{ borrowedBook.borrowDate }}</td>
            <td>{{ borrowedBook.returnDate }}</td>
            <td class="text-primary">{{ borrowedBook.status }}</td>
            <td>
              <button
                v-if="canDelete(borrowedBook.status)"
                class="btn btn-danger"
                @click="deleteBook(borrowedBook.id_book)"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import ClientAppHeader from "@/components/client/ClientAppHeader.vue";
import BookService from "@/services/client/book.service";
import ReaderService from "@/services/client/reader.service";

export default {
  components: {
    ClientAppHeader,
  },
  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
  data() {
    return {
      books: [],
      reader: {},
    };
  },
  methods: {
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
    async retrieveBooks() {
      try {
        this.books = await BookService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    async retrieveReader() {
      try {
        const tokenUser = this.getTokenFromCookie();

        let formData = new FormData();
        formData.append("tokenUser", tokenUser);

        this.reader = await ReaderService.retrieveReader(formData);
      } catch (error) {
        console.log(error);
      }
    },
    getBookTitle(bookId) {
      const book = this.books.find((book) => book._id === bookId);
      return book ? book.bookTitle : "Unknown";
    },
    getBookImage(bookId) {
      const book = this.books.find((book) => book._id === bookId);
      return book ? "http://localhost:3000/uploads/" + book.thumbnail : ""; // Assuming `imageUrl` is the field that stores the image URL in your book object
    },
    canDelete(status) {
      return status === "processing" || status === "refused";
    },
    async deleteBook(id) {
      const respone = await ReaderService.deleteBook(id);
      this.retrieveBooks();
      this.retrieveReader();
      // Thực hiện xóa quyển sách đã mượn ở vị trí index trong mảng reader.borrow
      // Gọi API hoặc thực hiện các thao tác cần thiết để xóa quyển sách đã mượn
    },
  },
  mounted() {
    this.retrieveBooks();
    this.retrieveReader();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
}

.custom-margin {
  margin-right: 10px; /* hoặc bất kỳ giá trị nào bạn muốn */
}
</style>
