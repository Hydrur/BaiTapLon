<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Ảnh sách</th>
          <th>Tên sách</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Tác giả</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(book, index) in paginatedBooks"
          :key="book._id"
          :class="{ active: index === activeIndex }"
          @click="updateActiveIndex(index)"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <img
              :src="'http://localhost:3000/uploads/' + book.thumbnail"
              class="img-book"
              alt="Product Image"
            />
          </td>
          <td>{{ book.bookTitle }}</td>
          <td>{{ book.price }}</td>
          <td>{{ book.quantity }}</td>
          <td>{{ book.author }}</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click="prevPage">Previous</a>
        </li>
        <li
          class="page-item"
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          :class="{ active: pageNumber === currentPage }"
        >
          <a class="page-link" href="#" @click="changePage(pageNumber)">{{
            pageNumber
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click="nextPage">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    books: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  data() {
    return {
      currentPage: 1,
      booksPerPage: 4,
    };
  },
  computed: {
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.booksPerPage;
      const endIndex = startIndex + this.booksPerPage;
      return this.books.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.books.length / this.booksPerPage);
    },
  },
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style>
.img-book {
  height: 90px;
  width: 90px;
}
</style>
