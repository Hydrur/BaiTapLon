<template>
  <div>
    <AppHeader />
    <div class="container mt-3">
      <h3 class="text-danger">
        <b><i>Các đơn mượn sách</i></b>
      </h3>
      <div v-for="(reader, readerIndex) in readers" :key="readerIndex">
        <template v-if="reader.borrow.length > 0">
          <h4>{{ reader.fullName }}</h4>
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
                v-for="(borrowedBook, bookIndex) in reader.borrow"
                :key="bookIndex"
              >
                <td>{{ bookIndex + 1 }}</td>
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
                    @click="changeStatus(reader, borrowedBook, 'accepted')"
                    class="btn btn-success"
                  >
                    Duyệt
                  </button>
                  <button
                    @click="changeStatus(reader, borrowedBook, 'refused')"
                    class="btn btn-danger"
                  >
                    Từ chối
                  </button>
                  <button
                    @click="changeStatus(reader, borrowedBook, 'returned')"
                    class="btn btn-warning"
                  >
                    Đã trả
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/admin/AppHeader.vue";
import BookService from "@/services/admin/book.service";
import ReaderService from "@/services/client/reader.service";
import AppFooter from "@/components/admin/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      books: [],
      readers: [],
    };
  },
  methods: {
    async retrieveBooks() {
      try {
        this.books = await BookService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    async retrieveReaders() {
      try {
        this.readers = await ReaderService.retrieveAllReaders();
      } catch (error) {
        console.log(error);
      }
    },
    async changeStatus(reader, borrowedBook, status) {
      try {
        const response = await ReaderService.changeStatus(
          reader._id,
          borrowedBook.id_book,
          status
        );
        // Refresh data after changing status
        await this.retrieveReaders();
        await this.retrieveBooks();
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
  },
  mounted() {
    this.retrieveBooks();
    this.retrieveReaders();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
}
</style>
