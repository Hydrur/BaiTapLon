<template>
  <div class="page-wrapper">
    <ClientAppHeader />

    <div class="container mt-3">
      <h3>Quyển sách đã mượn</h3>
      <p class="text-danger">
        <b><i>Lưu ý rằng, sách chỉ được mượn tối đa là 30 ngày.</i></b>
      </p>
      <template v-if="reader.borrow && reader.borrow.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th class="tr-thead">#</th>
              <th class="tr-thead">Ảnh sách</th>
              <th class="tr-thead">Tên sách</th>
              <th class="tr-thead">Số lượng</th>
              <th class="tr-thead">Ngày mượn</th>
              <th class="tr-thead">Ngày trả</th>
              <th class="tr-thead">Trạng thái</th>
              <th class="tr-thead">Hành động</th>
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
              <td class="text-primary">
                {{ borrowedBook.status === 'accepted' ? 'Đã duyệt' : borrowedBook.status === 'refused' ? 'Từ chối' : borrowedBook.status === 'returned' ? 'Đã trả' : borrowedBook.status === 'processing' ? 'Chờ xử lí' : 'Unknown' }}
              </td>
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
      </template>
      <template v-else>
        <p><i>Bạn chưa có đăng ký đơn mượn nào.</i></p>
      </template>
    </div>
    <ClientAppFooter />
  </div>
</template>

<script>
import ClientAppHeader from "@/components/client/ClientAppHeader.vue";
import ClientAppFooter from "@/components/client/ClientAppFooter.vue";
import BookService from "@/services/client/book.service";
import ReaderService from "@/services/client/reader.service";

export default {
  components: {
    ClientAppHeader,
    ClientAppFooter,
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
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Đảm bảo chiều cao tối thiểu của container là chiều cao của màn hình */
}

.container {
  flex-grow: 1; /* Mở rộng container để chiếm hết phần còn lại của trang */
}

.tr-thead{
  background-color: #c6f0a1;
}
</style>
