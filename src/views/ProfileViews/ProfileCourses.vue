<template>
  <div>
    <template v-if="status==='loading'">
      <div style="margin: 3rem 0">
        <grid-loader loading style="margin: auto" color="#6a89f9"/>
      </div>
    </template>
    <template v-if="courses.length">
      <user-course v-for="course in courses" :key="course.id" v-bind="course"></user-course>
    </template>
  </div>
</template>
<script>
  import GridLoader from 'vue-spinner/src/GridLoader'
  import clService from '../../_services/cl.service'
  import UserCourse from '../../components/CLComponents/UserCourse'

  export default {
    components: {UserCourse, GridLoader},
    props: {
      user: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        status: 'clean',
        courses: [],
      };
    },
    watch: {
      user(to) {
        this.loadCourses(to.id);
      },
    },
    methods: {
      loadCourses() {
        this.status = 'loading';
        clService.loadUserCourses(this.user.id).then(({courses}) => {
          this.status = 'success';
          this.courses = courses;
        }).catch(() => {
          this.status = 'error';
        });
      }
    },
    mounted() {
      this.loadCourses();
    },
  }
</script>
