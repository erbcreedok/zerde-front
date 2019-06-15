<template>
  <router-link :to="{name: 'qa-single', params: {slug: question.id+''}}" class="qaCard" :class="{'qaCard-small': isSmall}">
    <div class="qaCard_wrap">
      <div class="qa_tags" v-if="!isSmall && question.themes.length">
        <router-link :to="{name: 'qa', query: {theme: theme.id}}" v-for="theme in question.themes" :key="theme.id" @click="handleTagClick">{{theme.name}}</router-link>
      </div>

      <span class="qaCard_title">{{question.title}}</span>
    </div>

    <div class="qaCard_footer">
      <router-link :to="{name: 'qa-single', params: {slug: question.id+''}}" class="qaCard_answers" :class="{'qaCard_answers-success': question.has_correct_answer}" v-if="question.answers_count">{{$t('{count} answer ::: {count} answers', {count: question.answers_count}, question.answers_count)}}</router-link>
      <router-link :to="{name: 'qa-single', params: {slug: question.id+''}}" class="qaCard_answers" v-if="!question.answers_count">{{$t('no answers')}}</router-link>
      <ul class="qaCard_details" v-if="!isSmall">
        <li :title="question.created_at | moment('D MMMM YYYY, hh:mm:ss')">{{question.created_at | moment('D MMMM')}}</li>
        <li>{{$t('{count} view ::: {count} views', {count: question.views}, question.views)}}</li>
        <li>{{$t('{count} subscriber ::: {count} subscribers', {count: question.fav_count}, question.fav_count)}}</li>
      </ul>

      <div v-if="question.user_id" class="qaCard_author avatar" :title="question.user_id">
        <img v-if="question.user_avatar" :src="question.user_avatar" alt="">
        <img v-if="!question.user_avatar" src="/assets/img/avatar-placeholder.jpg" alt="">
      </div>
    </div>
  </router-link>
</template>

<script>
  export default {
    props: {
      isSmall: Boolean,
      question: {
        type: Object,
        required: true
      }
    },
    methods: {
      handleTagClick(e) {
        e.stopPropagation();
      }
    }
  }
</script>
