<template>
  <router-link :to="{name: 'qa-single', params: {slug: question.id+''}}" class="qaCard" :class="{'qaCard-small': isSmall}">
    <div class="qaCard_wrap">
      <div class="qa_tags" v-if="!isSmall">
        <router-link to="#tag" v-for="tag in question.tags" :key="tag" @click="handleTagClick">{{tag}}</router-link>
      </div>

      <span class="qaCard_title">{{question.questionTitle}}</span>
    </div>

    <div class="qaCard_footer">
      <router-link :to="{name: 'qa-single', params: {slug: question.id+''}}" class="qaCard_answers" :class="{'qaCard_answers-success': question.answers.success}" v-if="question.answers.count">{{$t('{count} answer ::: {count} answers', {count: question.answers.count}, question.answers.count)}}</router-link>
      <router-link :to="{name: 'qa-single', params: {slug: question.id+''}}" class="qaCard_answers" v-if="!question.answers.count">{{$t('no answers')}}</router-link>
      <ul class="qaCard_details" v-if="!isSmall">
        <li>{{question.createdAt | moment('D MMMM')}}</li>
        <li>{{$t('{count} view ::: {count} views', {count: question.views}, question.views)}}</li>
        <li>{{$t('{count} subscriber ::: {count} subscribers', {count: question.subscribers}, question.subscribers)}}</li>
      </ul>

      <div class="qaCard_author avatar" :title="question.author.full_name">
        <img :src="question.author.avatar_src" alt="">
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
