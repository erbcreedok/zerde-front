<template>
  <div class="full-page-loading"></div>
</template>

<script>
  export default {
    data() {
      return {
        loader: null,
      }
    },
    mounted() {
      this.loader = this.$loading.show();
    },
    beforeDestroy() {
      this.loader.hide();
    }
  }
</script>