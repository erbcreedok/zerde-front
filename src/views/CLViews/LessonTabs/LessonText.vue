<template>
  <div class="lesson_text typeset" v-html="lesson.body">
  </div>
</template>
<script>
  export default {
    props: {
      lesson: Object,
    }
  }
</script>