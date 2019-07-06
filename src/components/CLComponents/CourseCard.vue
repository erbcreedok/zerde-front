<template>
  <article class="coursecard">
    <div class="coursecard_cover">
      <img :src="img_src" alt="">
    </div>

    <div class="coursecard_content">
      <router-link :to="{name: 'course', params: {slug: id}}" class="coursecard_title">{{title}}</router-link>

      <ul class="coursecard_details">
        <li class="coursecard_detail coursecard_detail-icon coursecard_detail-lessons">{{lessons_amount}} занятий</li>
        <li v-if="studentCount" class="coursecard_detail coursecard_detail-icon coursecard_detail-users">132</li>
        <li class="coursecard_detail">
          <div class="coursecard_author user" v-for="author in authors" :key="author.id">
            <div class="user_photo avatar"><img :src="author.avatar_src" alt=""></div>
            <div class="user_name">{{author.fullname}}</div>
          </div>
        </li>
      </ul>

      <div class="coursecard_brief">{{body_out}}</div>

      <div class="coursecard_controls">
        <a href="#" class="button button-primary" v-if="isAuthorised">Начать</a>
        <router-link :to="{name: 'course', params: {slug: id}}" class="button button-outline">Подробнее</router-link>
      </div>
      <template v-if="progress">
        <div class="coursecard_progress">Ваш прогресс: 0%</div>
      </template>
    </div>
  </article>
</template>

<script>
  export default {
    props: {
      id: [Number, String],
      locale: String,
      slug: String,
      title: String,
      img_preview: String,
      img_src: String,
      video: String,
      video_src: String,
      body_in: String,
      body_out: String,
      duration: [String, Number],
      rating: [String, Number],
      is_published: [Boolean, String, Number],
      created_at: [String, Number, Date],
      updated_at: [String, Number, Date],
      lessons_amount: [Number, String],
      authors: Array,
      studentCount: Number,
      progress: Number,
    },
    computed: {
      isAuthorised() {
        return this.$store.state.auth.authorized;
      },
    },
  }
</script>
