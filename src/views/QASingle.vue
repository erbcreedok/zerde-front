<template>
  <div class="page wrap">
    <div style="height: 200px" v-loading="true" v-if="status==='loading'"></div>
    <div class="qa_grid">
      <div class="qa_main" v-if="question">
        <main class="qa_question">
          <header class="qa_question_header">
            <div class="qa_question_author user">
              <div class="user_photo avatar">
                <img :src="question.author.avatar_src" alt="">
              </div>

              <a href="#" class="user_name">{{question.author.full_name}}</a>
            </div>

            <div class="qa_question_date">{{ question.createdAt | moment('D MMMM YYYY')}}</div>
          </header>

          <div class="qa_question_body">
            <div class="qa_tags">
              <a href="#" v-for="(tag, index) in question.tags" :key="index">{{tag}}</a>
            </div>

            <h1 class="qa_question_title">{{question.questionTitle}}</h1>

            <div class="qa_question_text" v-html="question.questionBody"></div>
          </div>

          <footer class="qa_question_footer">
            <div class="qa_question_controls">
              <button class="qa_question_control qa_question_control-sub" v-if="!question.subscribed" @click="setSubscription(true)">подписаться</button>
              <button class="qa_question_control qa_question_control-sub qa_question_control-sub-active hover-provider" v-if="question.subscribed" @click="setSubscription(false)"><span class="inline-no-hover none-on-hover ">подписан</span><span class="none-no-hover inline-on-hover">отписаться</span></button>
              <button class="qa_question_control qa_question_control-share">поделиться</button>
            </div>

            <ui-rating class="qa_question_rating" :rate="question.likes" :rated="question.liked" @change="putLike"/>
          </footer>
        </main>

        <qa-answers v-if="question" :question="question"/>
      </div>

      <aside class="qa_sidebar" v-if="question">
        <div class="qa_sidesection qa_stats">
          <div class="qa_stats_item">
            <div class="qa_stats_title">Просмотры</div>
            <div class="qa_stats_value qa_stats_value-views">{{question.views}}</div>
          </div>

          <div class="qa_stats_item">
            <div class="qa_stats_title">Подписчики</div>
            <div class="qa_stats_value qa_stats_value-favs">{{question.subscribers + question.subscribed}}</div>
          </div>

          <div class="qa_stats_item">
            <div class="qa_stats_title">Ответы</div>
            <div class="qa_stats_value qa_stats_value-answers">{{question.answers.count}}</div>
          </div>

          <div class="qa_stats_item">
            <div class="qa_stats_title">Комментарии</div>
            <div class="qa_stats_value qa_stats_value-comments">{{question.commentsCount}}</div>
          </div>
        </div>

        <div class="qa_sidesection" v-if="question.similars">
          <h3 class="qa_sidesection_title caption">Похожие вопросы</h3>

          <question-card is-small v-for="(similar, index) in question.similars" :key="index" :question="similar"/>
        </div>
      </aside>
    </div>

  </div>
</template>

<script>
  import qaService from '../_services/qa.service'
  import QuestionCard from '../components/QAComponents/QuestionCard'
  import QaAnswers from '../components/QAComponents/QAAnswers'
  import UiRating from "../components/ui/UIRating";

  export default {
    components: {UiRating, QaAnswers, QuestionCard},
    props: {
      slug: {
        required: true,
        type: String,
      }
    },
    data() {
      return {
        status: 'clean',
        question: null,
      }
    },
    watch: {
      slug(to) {
        this.loadQuestion(to)
      }
    },
    mounted() {
      this.loadQuestion();
    },
    methods: {
      loadQuestion(slug=this.slug) {
        this.status = 'loading';
        this.question = null;
        return qaService.getQuestion(slug).then(data => {
          this.status = 'success';
          this.question = data;
          return data;
        }).catch(err => {
          console.log(err);
          this.status = 'error';
          throw err;
        })
      },
      putLike(value) {
        qaService.setLikeToQuestion(this.question.id, value).then(question => {
          this.question.liked = question.liked;
        })
      },
      setSubscription(value) {
        qaService.subscribeToQuestion(this.question.id, value).then(question => {
          this.question.subscribed = question.subscribed;
        })
      },
    }
  }
</script>
