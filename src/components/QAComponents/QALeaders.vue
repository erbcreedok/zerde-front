<template>
  <section class="qa_sidesection">
    <h3 class="qa_sidesection_title caption">Лидеры ответов</h3>

    <ul class="qa_leaders">

      <template v-if="status==='loading'">
        <li class="qa_leaders_item user user-block" style="max-width: 300px">
          <div class="user_photo avatar loading_placeholder loading_placeholder-round loading_placeholder-animate"></div>
          <div class="user_info loading_placeholder loading_placeholder-round loading_placeholder-animate d-flex" style="height: 40px; width: 100%"></div>
        </li>
        <li class="qa_leaders_item user user-block" style="max-width: 300px">
          <div class="user_photo avatar loading_placeholder loading_placeholder-round loading_placeholder-animate"></div>
          <div class="user_info loading_placeholder loading_placeholder-round loading_placeholder-animate d-flex" style="height: 40px; width: 100%"></div>
        </li>
      </template>

      <li class="qa_leaders_item user user-block"
          v-for="(leader, index) in leaders"
          :key="index"
      >
        <div class="user_photo avatar"><img :src="leader.avatar_src" alt=""></div>
        <div class="user_info">
          <router-link :to="{name: 'user', params: {userId: leader.id}}" class="user_name">{{leader.fullname}}</router-link>
          <ul class="user_details">
            <li>{{$t('{count} answer ::: {count} answers', {count: leader.answers_count}, leader.answers_count-0)}}</li>
            <li>{{$t('{count} comment ::: {count} comments', {count: leader.comments_count}, leader.comments_count-0)}}</li>
            <li>{{$t('{count} like ::: {count} likes', {count: leader.rating_count}, leader.rating_count-0)}}</li>
          </ul>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  import qaService from '../../_services/qa.service'

  export default {
    name: 'qa-leaders',
    data() {
      return {
        status: 'clean',
        leaders: [],
      }
    },
    methods: {
      loadLeaders() {
        this.status = 'loading';
        qaService.getAnswerLeaders().then((leaders) => {
          this.status = 'success';
          this.leaders = leaders;
        })
      }
    },
    mounted() {
      this.loadLeaders();
    }
  }
</script>