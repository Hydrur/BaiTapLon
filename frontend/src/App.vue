<template>
  <div id="app">
      <router-view />
      <!-- là một thẻ placeholder mà Vue Router sử dụng để render nội dung của các route trong ứng dụng Vue.js của bạn. -->
  </div>
</template>

<script>
import AppHeader from "@/components/admin/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>
