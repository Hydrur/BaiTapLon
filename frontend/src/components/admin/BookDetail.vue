<template>
  <div>
    <div class="p-1 d-flex justify-content-center align-items-center">
      <img :src="'http://localhost:3000/uploads/' + book.thumbnail" class="img-book" alt="">
    </div>
    <hr>
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
    <hr>
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
  </div>
</template>

<script>
export default {
  props: {
    book: { type: Object, required: true },
  },
};
</script>

<style scoped>
.img-book {
  height: auto;
  width: 120px;
}
</style>