<template>
  <article class="usercourse">
    <div class="usercourse_title caption">
      <router-link :to="{name: 'course', params: {slug: this.id}}">Курс "{{title}}"</router-link>
    </div>
    <div class="usercourse_controls">
      <div class="course_progress">
        <ui-progress :progress="progress" :success="user_course.finished"/>
        <div class="course_progress_stats">
          <div class="course_progress_lessons">Пройдено {{passedLessons}} из {{$t('{v} занятия ::: {v} занятий ::: {v} занатий', {v: lessons_amount}, lessons_amount-0)}}</div>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
  import UiProgress from '../ui/UiProgress'
  export default {
    components: {UiProgress},
    props: {
      id: [Number, String],
      user_course: Object,
      lessons_amount: [Number, String],
      title: String,
    },
    computed: {
      progress() {
        return this.user_course.progress - 0  >  100 ? 100 : this.user_course.progress - 0 ;
      },
      passedLessons() {
        return (this.lessons_amount-0) * (this.progress / 100);
      },
    }
  }
</script>