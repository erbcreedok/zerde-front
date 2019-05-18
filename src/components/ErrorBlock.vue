<template>
  <div class="error-block">
    <h1 v-html="error.message"></h1>
  </div>
</template>

<script>
  export default {
    props: {
      error: {
        required: true
      }
    }
  }
</script>