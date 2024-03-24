<template>
  <div class="page">
    <h4>Thêm mới Sách</h4>
    <BookForm :book="book" @submit:book="createBook" />
  </div>
</template>
    
<script>
import BookForm from "@/components/admin/BookForm.vue";
import BookService from "@/services/admin/book.service";

export default {
  components: {
    BookForm,
  },
  data() {
    return {
      book: {
        bookTitle: "",
      },
    };
  },
  methods: {
    async createBook(data){
        try {
            await BookService.create(data);
            this.$router.push({name: "book"});
        } catch (error) {
            console.log(error);
        }
    }
  }
};
</script>