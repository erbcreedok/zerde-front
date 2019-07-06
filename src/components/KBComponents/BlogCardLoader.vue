<template>
  <blog-card v-if="article" v-bind="article" :wide="wide" :inverse="inverse" :horizontal="horizontal" :highlight="highlight" :stacked="stacked"/>
</template>
<script>
  import BlogCard from './BlogCard'
  import kbService from '../../_services/kb.service'
  export default {
    props: {
      id: [Number, String],
      wide: Boolean,
      inverse: Boolean,
      horizontal: Boolean,
      highlight: Boolean,
      stacked: Boolean,
    },
    components: {BlogCard},
    data() {
      return {
        article: null,
      }
    },
    methods: {
      loadArticle(id = this.id) {
        kbService.loadArticleById(id).then(article => {
          this.article = article;
        })
      }
    },
    watch: {
      id(to) {
        this.loadArticle(to);
      },
    },
    mounted() {
      this.loadArticle();
    },
  }
</script>