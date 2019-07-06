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
        <router-link v-for="(lesson, index) in availables" :key="index" :to="{name: lesson.type, params: {slug: lesson.id}}" class="courcont_progress_item" :class="{'courcont_progress_item-done': lesson.user_finished, 'courcont_progress_item-current': !lesson.user_finished}" :data-tooltip="lesson.title" :data-tooltip-position="'top' + lesson.tooltipPosition"></router-link>
        <span v-for="(lesson, index) in unavailables" :key="index + availables.length" class="courcont_progress_item" data-tooltip="Курс недоступен" :data-tooltip-position="'top' + lesson.tooltipPosition"></span>
      </div>
    </div>

    <lesson-item v-for="(lesson, index) in lessons" :key="index" v-bind="lesson"/>

  </section>
</template>
<script>
  import LessonItem from './LessonItem'
  export default {
    components: {LessonItem},
    props: {
      lessons: {
        type: Array,
        default: () => [],
      },
    },
    name: 'lessons-list',
    computed: {
      lessonsList() {
        return this.lessons.map((l, index) => ({
          ...l,
          tooltipPosition: index===0 ? ' right' : index===this.lessons.length-1 ? ' left' : '',
        }));
      },
      availables() {
        return this.lessonsList.filter(l => l.user_access);
      },
      unavailables() {
        return this.lessonsList.filter(l => !l.user_access);
      },
      finished() {
        return this.lessonsList.filter(l => l.user_finished);
      }
    },
  }
</script>