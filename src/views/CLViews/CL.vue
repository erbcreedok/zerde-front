<template>
    <div class="page wrap">
        <h1 class="title courses_title">Бесплатные онлайн-курсы</h1>

        <template v-if="status==='loading'">
            <grid-loader color="#e3e3e3" style="text-align: center; margin: 1rem auto"/>
        </template>
        <template v-if="status==='success' && !courses.length">
            <div class="post_subtitle caption"><span class="muted">Курсов нет</span></div>
        </template>
        <main class="courses_grid">
            <course-card v-for="course of courses" :key="course.id" v-bind="course"/>
        </main>
    </div>
</template>

<script>
    import clService from "../../_services/cl.service";
    import CourseCard from '../../components/CLComponents/CourseCard'
    import GridLoader from 'vue-spinner/src/GridLoader'
    import {setDocumentTitle} from '../../_helpers'

    export default {
      components: {GridLoader, CourseCard},
      data() {
        return {
          status: 'clean',
          courses: [],
        }
      },
      methods: {
        loadCourses() {
          this.status = 'loading';
          clService.loadCourses().then(({courses}) => {
            this.courses = courses;
            this.status = 'success';
          });
        },
      },
      mounted() {
        this.loadCourses();
        setDocumentTitle('courses')
      },
      beforeDestroy() {
        setDocumentTitle();
      },
    }
</script>
