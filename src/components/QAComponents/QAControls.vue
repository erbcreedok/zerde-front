<template>
  <div class="qa_controls">

    <ul class="qa_controls_counters" v-if="status==='success'">
      <li>{{$t('{count} question ::: {count} questions', {count: questionsCount}, questionsCount)}}</li>
      <li>{{$t('{count} answer ::: {count} answers', {count: answersCount}, answersCount)}}</li>
    </ul>
    <ul class="qa_controls_counters" v-if="status==='loading'">
      <li style="width: 60px; height: 10px; margin-bottom: .5rem" class="loading_placeholder loading_placeholder-round loading_placeholder-animate"></li>
      <li style="width: 75px; height: 10px" class="loading_placeholder loading_placeholder-round loading_placeholder-animate"></li>
    </ul>

    <router-link :to="{name: 'qa-create'}" class="qa_controls_button button button-primary">{{'ask question' | translate | capitalize}}</router-link>
  </div>
</template>

<script>
  import qaService from '../../_services/qa.service'

  export default {
    data() {
      return {
        questionsCount: 0,
        answersCount: 0,
        status: 'clean',
      }
    },
    mounted() {
      this.loadQAStats();
    },
    methods: {
      loadQAStats() {
        this.status = 'loading';
        qaService.getQAStats().then(({questionsCount, answersCount}) => {
          this.status = 'success';
          this.questionsCount = questionsCount;
          this.answersCount = answersCount;
        })
      }
    }
  }
</script>
