<template>
  <div class="lesson_content_wrap">
    <div class="lesson_files" v-for="file in lesson.files_list" :key="file.id">
      <div class="caption">Файлы и ссылки</div>
      <a :href="file.link" target="_blank" class="file file-external">
        <span class="file_title">{{file.title}}</span>
        <span class="file_description" v-html="file.body"></span>
      </a>
    </div>
    <div class="lesson_posts">
      <div class="caption">Связанные материалы</div>
      <blog-card-loader v-for="article in articles" :key="article" :id="article" horizontal/>
    </div>
  </div>
</template>
<script>
  import BlogCardLoader from '../../../components/KBComponents/BlogCardLoader'
  export default {
    components: {BlogCardLoader},
    props: {
      lesson: Object,
    },
    computed: {
      articles() {
        try {
          return JSON.parse(this.lesson.articles);
        } catch {
          return [];
        }
      },
    },
  }
</script>