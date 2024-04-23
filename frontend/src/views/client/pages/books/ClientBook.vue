<template>
  <div>
    <ClientAppHeader />
    <div class="container mt-3">
      <div class="page row">
        <img src="/client/bannerhome.png" alt="" class="mb-3" />
        <div class="col-md-12">
          <ClientInputSearch v-model="searchText" />
        </div>
        <div class="pt-3">
          <div class="">
            <button class="btn btn-sm btn-primary custom-margin mb-3" @click="refreshList()">
              <i class="fas fa-redo"></i> Làm mới
            </button>
          </div>

          <ClientBookList v-if="filteredBooksCount > 0" :books="filteredBooks" v-model:activeIndex="activeIndex" />
          <p v-else>Không có sách trong kho.</p>
        </div>
        <!-- Overlay và phần chi tiết sách -->

        <div v-if="activeBook" class="overlay-container" @mousedown="handleOverlayClick">
          <div class="overlay">
            <div class="book-details-container">
              <div>
                <h4>
                  Chi tiết đầu sách
                  <i class="fa-solid fa-book"></i>
                </h4>
                <ClientBookDetail :book="activeBook" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ClientAppFooter />
  </div>
</template>

<script>
import ClientBookDetail from "@/components/client/ClientBookDetail.vue";
import ClientAppHeader from "@/components/client/ClientAppHeader.vue";
import ClientAppFooter from "@/components/client/ClientAppFooter.vue";
import ClientInputSearch from "@/components/client/ClientInputSearch.vue";
import ClientBookList from "@/components/client/ClientBookList.vue";
import BookService from "@/services/client/book.service";

export default {
  components: {
    ClientBookDetail,
    ClientInputSearch,
    ClientBookList,
    ClientAppHeader,
    ClientAppFooter,
  },
  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
  data() {
    return {
      books: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng book thành chuỗi để tiện cho tìm kiếm.
    booksStrings() {
      return this.books.map((book) => {
        const {
          id_publisher,
          bookTitle,
          price,
          quantity,
          publishYear,
          author,
          thumbnail,
        } = book;
        return [
          id_publisher,
          bookTitle,
          price,
          quantity,
          publishYear,
          author,
          thumbnail,
        ].join("");
      });
    },
    // Trả về các book có chứa thông tin cần tìm kiếm.
    filteredBooks() {
      if (!this.searchText) return this.books;

      return this.books.filter((_book, index) =>
        this.booksStrings[index].includes(this.searchText)
      );
    },
    activeBook() {
      if (this.activeIndex < 0) return null;
      return this.filteredBooks[this.activeIndex];
    },
    filteredBooksCount() {
      return this.filteredBooks.length;
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        this.books = await BookService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveBooks();
      this.searchText = "";
      this.activeIndex = -1;
    },
    handleOverlayClick(event) {
      // Kiểm tra xem người dùng có nhấp vào phần chi tiết sách hay không
      const isInsideDetail = event.target.closest('.book-details-container');
      if (!isInsideDetail) {
        // Nếu không, đóng overlay
        this.closeOverlay();
      }
    },
    closeOverlay() {
      this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
}

.custom-margin {
  margin-right: 10px;
  /* hoặc bất kỳ giá trị nào bạn muốn */
}

.book-details-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 65%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.overlay-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;

}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* Màu nền đậm */
  z-index: 222;
  /* Đặt z-index thấp hơn overlay-container để hiển thị bên dưới */
}
</style>
