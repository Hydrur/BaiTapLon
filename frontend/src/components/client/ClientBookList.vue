<template>
  <div class="mb-5">
    <div class="book-grid">
      <div
        class="book-card"
        v-for="(book, index) in paginatedBooks"
        :key="[book._id, currentPage, itemsPerPage]"
        :class="{ active: index === activeIndex }"
        @click="updateActiveIndex(index + (currentPage-1)*itemsPerPage)"
      >
        <img
          :src="'http://localhost:3000/uploads/' + book.thumbnail"
          class="img-book"
          alt="Ảnh sách"
          style="border-top-left-radius: 10px;border-top-right-radius: 10px;"
        />
        <div class="book-details">
          <h4 class="text-primary m-1"><b>{{ book.bookTitle }}</b></h4>
          <p class="m-1"><b>Giá:</b> {{ book.price }}</p>
          <p class="m-1"><b>Số lượng:</b> {{ book.quantity }}</p>
          <p class="m-1"><b>Tác giả:</b> {{ book.author }}</p>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
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
      itemsPerPage: 10,
    };
  },
  computed: {
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.books.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.books.length / this.itemsPerPage);
    },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
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

<style scoped>
.book-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* Cột linh hoạt */
  gap: 20px; /* Khoảng cách giữa các ô */
}

.book-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  max-width: 300px; /* Kích thước tối đa của mỗi ô sách */
  border-radius: 10px;
}

.img-book {
  width: 100%;
  height: auto;
}

.book-details {
  padding: 10px;
}

.active {
  border-color: #007bff; /* Biên màu xanh khi được chọn */
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination button {
  margin: 0 5px;
}
</style>
