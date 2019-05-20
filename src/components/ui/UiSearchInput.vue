<template>
  <form class="qa_search textfield textfield-block" @submit.prevent="handleSubmit">
    <input v-model="text" type="text" class="qa_search_field textfield_input" placeholder=" ">
    <label class="textfield_label">{{'find your question or ask by yourself' | translate | capitalize}}</label>
    <button type="submit" class="textfield_button textfield_button-search"></button>
  </form>
</template>

<script>
  export default {
    props: {
      value: String,
    },
    data() {
      return {
        text: this.value
      }
    },
    methods: {
      handleSubmit() {
        this.$emit('submit', this.text);
      }
    }
  }
</script>