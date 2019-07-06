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
        <template v-if="isAuthorised">
          <router-link v-if="user_course && user_course.finished" :to="{name: 'course', params: {slug: id}}" class="button button-danger button-success">Пройдено</router-link>
          <router-link v-else-if="last_user_lesson && last_user_lesson.id" :to="{name: last_user_lesson.type, params: {slug: last_user_lesson.id}}" class="button button-primary">
            <template v-if="user_course">Продолжить</template>
            <template v-else>Начать</template>
          </router-link>
          <button v-else class="button button-danger button-disabled" disabled="">В разработке</button>
        </template>
        <router-link :to="{name: 'course', params: {slug: id}}" class="button button-outline">Подробнее</router-link>
      </div>
      <template v-if="user_course && user_course.progress">
        <div class="coursecard_progress">Ваш прогресс: {{parseInt(user_course.progress)}}%</div>
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
      last_user_lesson: Object,
      rating: [String, Number],
      is_published: [Boolean, String, Number],
      created_at: [String, Number, Date],
      updated_at: [String, Number, Date],
      lessons_amount: [Number, String],
      authors: Array,
      studentCount: Number,
      progress: Number,
      user_course: Object,
    },
    computed: {
      isAuthorised() {
        return this.$store.state.auth.authorized;
      },
    },
  }
</script>
