<template>
  <div v-if="user" class="course_users_item" :data-tooltip="user.fullname" data-tooltip-position="top">
    <router-link :to="{name: 'user', params: {userId}}"
                 class="avatar"
                 style="height: 100%; display: block"
    >
      <img :src="user.avatar_src" alt=""/>
    </router-link>
  </div>
</template>

<script>
  import userService from '../../_services/user.service'

  export default {
    props: {
      userId: [Number],
    },
    data() {
      return {
        user: null,
        status: 'clean'
      };
    },
    methods: {
      loadUserProfile(id = this.userId) {
        this.status = 'loading';
        userService.getUserById(id).then(user => {
          this.user = user;
          this.status = 'success';
        });
      }
    },
    watch: {
      userId(to) {
        this.loadUserProfile(to);
      }
    },
    mounted() {
      console.log('hi');
      this.loadUserProfile();
    },
  }
</script>