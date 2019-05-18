<template>
  <div class="auth-provider">
    <template v-if="!authorised">
      <slot/>
    </template>
    <template v-if="authorised">
      <slot v-if="status==='success'"></slot>
      <template v-if="status==='error'">
        <error-block :error="error"/>
        <a @click="logout" href="#">Выйти</a>
      </template>
      <full-page-loading v-if="status === 'loading'"/>
    </template>
  </div>
</template>

<script>

  import userService from '../_services/user.service'
  import ErrorBlock from '../components/ErrorBlock'
  import FullPageLoading from '../components/FullPageLoading'
  import authService from '../_services/auth.service'

  export default {
    components: {ErrorBlock, FullPageLoading},
    data(){
      return {
        status: 'clear',
        error: null,
      }
    },
    computed: {
      authorised() {
        return this.$store.state.auth.authorized
      }
    },
    watch: {
      authorised(to) {
        if (to) {
          this.getUser();
        }
      }
    },
    mounted() {
      if (this.authorised) {
        this.getUser();
      }
    },
    methods: {
      getUser() {
        this.status = 'loading';
        userService.getMyUser().then(() => {
          this.status = 'success';
        }).catch(err => {
          console.log(err);
          this.error = err;
          this.status = 'error';
        })
      },
      logout() {
        authService.logout();
      }
    },
  }
</script>
