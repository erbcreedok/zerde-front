<template>
  <article class="qaCard">
    <div class="qaCard_wrap">
      <div class="qa_tags">
        <a href="#" v-for="tag in question.tags" :key="tag">{{tag}}</a>
      </div>

      <a href="/single-qa.html" class="qaCard_title">{{question.questionTitle}}</a>
    </div>

    <div class="qaCard_footer">
      <div class="qaCard_answers" v-if="question.answers.count">{{$t('{count} answers', {count: question.answers.count}, question.answers.count)}}</div>
      <div class="qaCard_answers" v-if="!question.answers.count">{{$t('no answers')}}</div>
      <ul class="qaCard_details">
        <li>{{question.createdAt | moment('D MMMM')}}</li>
        <li>{{$t('{count} views', {count: question.views}, question.views)}}</li>
        <li>{{$t('{count} subscribers', {count: question.subscribers}, question.subscribers)}}</li>
      </ul>

      <div class="qaCard_author avatar">
        <img :src="question.author.avatar_src" alt="">
      </div>
    </div>
  </article>
</template>

<script>

  export default {
    props: {

    },
    data() {
      return {
        question: {
          tags: [
            'Старт бизнеса',
          ],
          questionTitle: 'Как правильно выбрать торговую точку для магазина бижутерии?',
          answers: {
            count: 22,
            success: false,
          },
          createdAt: new Date(),
          views: 241,
          subscribers: 20,
          author: {
            id: 244,
            full_name: 'Some author',
            avatar_src: 'https://thispersondoesnotexist.com/image'
          }
        },

      }
    }
  }
</script>