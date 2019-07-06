<template>
  <section class="course_section courcont">
    <div class="courcont_header">
      <div class="courcont_title">
        <div class="caption">Содержание</div>
      </div>
    </div>

    <div class="courcont_progress">
      <div class="courcont_progress_captions">
        <span class="courcont_progress_caption courcont_progress_caption-success">Вы на {{finished.length + 1}} занятии</span>
        <span class="courcont_progress_caption">Всего {{lessons.length}} занятий</span>
      </div>

      <div class="courcont_progress_line">
        <router-link v-for="(lesson, index) in availables" :key="lesson.id" :to="{name: 'lesson', params: {slug: lesson.id}}" class="courcont_progress_item" :class="{'courcont_progress_item-done': lesson.user_finished, 'courcont_progress_item-current': !lesson.user_finished}" :data-tooltip="lesson.title" :data-tooltip-position="'top' + (index && index === lessons.length - 1 ? ' left' : '') + (!index ? ' right' : '') "></router-link>
        <span v-for="lesson in unavailables" :key="lesson.id" class="courcont_progress_item" data-tooltip="Курс недоступен" :data-tooltip-position="'top' + (index && index === lessons.length - 1 ? ' left' : '') + (!index ? ' right' : '') "></span>
      </div>
    </div>

    <lesson-item v-for="lesson in lessons" :key="lesson.id" v-bind="lesson"/>

  </section>
</template>
<script>
  import LessonItem from './LessonItem'
  export default {
    components: {LessonItem},
    props: {
      lessons: Array,
    },
    name: 'lessons-list',
    computed: {
      availables() {
        return this.lessons.filter(l => l.user_access);
      },
      unavailables() {
        return this.lessons.filter(l => !l.user_access);
      },
      finished() {
        return this.lessons.filter(l => l.user_finished);
      }
    },
  }
</script>