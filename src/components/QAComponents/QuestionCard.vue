<template>
  <article class="qaCard" :class="{'qaCard-small': isSmall}">
    <div class="qaCard_wrap">
      <div class="qa_tags" v-if="!isSmall">
        <a href="#" v-for="tag in question.tags" :key="tag">{{tag}}</a>
      </div>

      <router-link :to="{name: 'qa-single', params: {slug: question.id+''}}" class="qaCard_title">{{question.questionTitle}}</router-link>
    </div>

    <div class="qaCard_footer">
      <div class="qaCard_answers" :class="{'qaCard_answers-success': question.answers.success}" v-if="question.answers.count">{{$t('{count} answer ::: {count} answers', {count: question.answers.count}, question.answers.count)}}</div>
      <div class="qaCard_answers" v-if="!question.answers.count">{{$t('no answers')}}</div>
      <ul class="qaCard_details" v-if="!isSmall">
        <li>{{question.createdAt | moment('D MMMM')}}</li>
        <li>{{$t('{count} view ::: {count} views', {count: question.views}, question.views)}}</li>
        <li>{{$t('{count} subscriber ::: {count} subscribers', {count: question.subscribers}, question.subscribers)}}</li>
      </ul>

      <div class="qaCard_author avatar" :title="question.author.full_name">
        <img :src="question.author.avatar_src" alt="">
      </div>
    </div>
  </article>
</template>

<script>

  export default {
    props: {
      isSmall: Boolean,
      question: {
        type: Object,
        required: true
      }
    }
  }
</script>