<template>
  <div>
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
      <strong>Năm phát hành:</strong>
      {{ book.publishYear }}
    </div>
    <div class="p-1">
      <strong>Tác giả:</strong>
      {{ book.author }}
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