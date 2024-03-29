<template>
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
      v-for="(book, index) in books"
      :key="book._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    > 
      <td>{{ index }}</td>
      <td>
        <img :src="'http://localhost:3000/uploads/' + book.thumbnail" class="img-book" alt="Product Image" />
      </td>
      <td>{{ book.bookTitle }}</td>
      <td>{{ book.price }}</td>
      <td>{{ book.quantity }}</td>
      <td>{{ book.author }}</td>
    </tr>
  </tbody>
</table>

</template>

<script>
export default {
  props: {
    books: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
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