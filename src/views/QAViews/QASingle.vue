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

              <router-link :to="{name: 'user', params: {userId: question.user_id}}" class="user_name">{{question.author.firstname}} {{question.author.lastname}}</router-link>
            </div>

            <div class="qa_question_date">{{ question.created_at | moment('D MMMM YYYY')}}</div>
          </header>

          <div class="qa_question_body">
            <div class="qa_tags">
              <a :href="'#' + theme.id" v-for="theme in question.themes" :key="theme.id">{{theme.name}}</a>
            </div>

            <h1 class="qa_question_title">{{question.title}}</h1>

            <div class="qa_question_text" v-html="question.body"></div>
          </div>

          <footer class="qa_question_footer">
            <div class="qa_question_controls">
              <template v-if="!isOwnQuestion">
                <button class="qa_question_control qa_question_control-sub" v-if="!question.user_favorite" @click="setSubscription(true)">подписаться</button>
                <button class="qa_question_control qa_question_control-sub qa_question_control-sub-active hover-provider" v-if="question.user_favorite" @click="setSubscription(false)"><span class="inline-no-hover none-on-hover ">подписан</span><span class="none-no-hover inline-on-hover">отписаться</span></button>
              </template>
              <button class="qa_question_control qa_question_control-share" @click="sharePost">поделиться</button>
            </div>

            <ui-rating :loading="ratingStatus==='loading'" class="qa_question_rating" :rate="question.rating" :rated="question.user_rate" @change="putLike"/>
          </footer>
        </main>

        <qa-answers v-if="question" :question="question" :is-own-question="isOwnQuestion"/>
      </div>

      <aside class="qa_sidebar" v-if="question">
        <div class="qa_sidesection qa_stats">
          <div class="qa_stats_item">
            <div class="qa_stats_title">Просмотры</div>
            <div class="qa_stats_value qa_stats_value-views">{{question.views}}</div>
          </div>

          <div class="qa_stats_item">
            <div class="qa_stats_title">Подписчики</div>
            <div class="qa_stats_value qa_stats_value-favs">{{question.fav_count}}</div>
          </div>

          <div class="qa_stats_item">
            <div class="qa_stats_title">Ответы</div>
            <div class="qa_stats_value qa_stats_value-answers">{{question.answers.length}}</div>
          </div>

          <div class="qa_stats_item">
            <div class="qa_stats_title">Комментарии</div>
            <div class="qa_stats_value qa_stats_value-comments">{{question.answers.length}}</div>
          </div>
        </div>

        <div class="qa_sidesection" v-if="similars.length">
          <h3 class="qa_sidesection_title caption">Похожие вопросы</h3>

          <question-card is-small v-for="(similar, index) in similars" :key="index" :question="similar"/>
        </div>
      </aside>
    </div>

  </div>
</template>

<script>
  import qaService from '../../_services/qa.service'
  import QuestionCard from '../../components/QAComponents/QuestionCard'
  import QaAnswers from '../../components/QAComponents/QAAnswers'
  import UiRating from "../../components/ui/UIRating";
  import copyToClipboard from '../../_helpers/copyToClipboard'
  import {capitalize} from '../../_filters/capitalize'

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
        ratingStatus: 'clean',
        subscriptionStatus: 'clean',
        question: null,
        similars: [],
      }
    },
    watch: {
      slug(to) {
        this.loadQuestion(to)
      }
    },
    mounted() {
      this.loadQuestion();
      this.loadSimilars();
    },
    computed: {
      isAuthorised() {
        return this.$store.state.auth.authorized;
      },
      isOwnQuestion() {
        return this.isAuthorised && this.question.user_id === this.$store.state.user.user.id
      },
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
      loadSimilars(slug=this.slug) {
        qaService.getQuestionSimilars(slug).then(questions => this.similars = questions);
      },
      putLike(value) {
        if (this.isOwnQuestion) {
          this.$notyf.error({
            message: capitalize(this.$t('you can\'t rate own material'))
          });
          return;
        }
        this.ratingStatus = 'loading';
        qaService.setLikeToQuestion(this.question.id, value).then(total => {
          this.question.rating = total;
          this.question.user_rate = value;
          this.ratingStatus = 'success';
        }).catch(() => {
          this.ratingStatus = 'error';
        });
      },
      setSubscription(value) {
        if (this.isOwnQuestion) {
          this.$notyf.error({
            message: capitalize(this.$t('you can\'t subscribe to own material'))
          });
          return;
        }
        this.subscriptionStatus = 'loading'
        qaService.subscribeToQuestion(this.question.id, value).then(() => {
          this.question = {...this.question, user_favorite: value};
          this.subscriptionStatus = 'success';
        }).catch(() => {
          this.subscriptionStatus = 'error';
        });
      },
      sharePost() {
        const url = window.location.href;
        copyToClipboard(url);
        this.$notyf.success({
          message: capitalize(this.$t('link saved to clipboard')),
        });
      },
    }
  }
</script>
