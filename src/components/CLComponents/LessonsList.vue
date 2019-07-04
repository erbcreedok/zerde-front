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
        <a v-for="lesson in finished" :key="lesson.id" href="#" class="courcont_progress_item courcont_progress_item-done"></a>
        <a v-for="lesson in started" :key="lesson.id" href="#" class="courcont_progress_item courcont_progress_item-current"></a>
        <span v-for="lesson in pristines" :key="lesson.id" class="courcont_progress_item"></span>
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
      finished() {
        return this.lessons.filter(l => l.user_finished);
      },
      started() {
        return this.lessons.filter(l => l.user_finished === false);
      },
      pristines() {
        return this.lessons.filter(l => l.user_finished === null);
      }
    },
  }
</script>