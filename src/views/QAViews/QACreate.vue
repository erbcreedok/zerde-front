<template>
    <form class="" @submit.prevent="handleSubmit" v-loading="status==='loading'">
        <div class="page wrap">
            <h1 class="title qa_title qa_add_title">Задать вопрос сообществу</h1>

            <div class="qa_grid form">
                <div class="qa_main">
                    <ui-input required show-required @input="debounceInput" class="textfield-block form_field" v-model="data.questionTitle" label="Конкретный вопрос" placeholder="Напишите сюда загаловок вашего вопроса"/>

                    <ui-textarea class="textfield-block form_field" v-model="data.questionBody" label="Подробное пояснение вопроса" placeholder="Старайтесь описать вашу проблему как можно подробнее" rows="7"/>
                </div>

                <div class="qa_sidebar" v-loading="themesStatus==='loading'">
                    <template v-if="data.themes.length">
                        <div class="caption qa_sidesection_title">Тема вопроса</div>

                        <ul class="qa_threads">
                            <li class="qa_threads_item qa_threads_item-selected" v-for="theme in data.themes" :key="theme.id" @click="toggleTheme(theme)">
                                <span class="qa_threads_link">{{theme.name}}</span>
                            </li>
                        </ul>
                    </template>


                    <template v-if="!data.themes.length">
                        <div class="caption qa_sidesection_title">Выберите темы вопроса</div>
                        <p style="margin-bottom: 1rem">Тема не выбрана</p>
                    </template>

                    <button type="button" data-modal="themes" @click="showModal" class="button button-small button-primary button-outline button-icon button-icon-left button-icon-dots">Выбрать тему</button>
                </div>
            </div>
        </div>
        <div class="qa_similar" v-if="similars.length">
            <div class="wrap">
                <div class="qa_similar_title caption">Уже заданные похожие вопросы</div>

                <div class="qa_similar_grid">
                    <swiper class="swiper-wrapper" ref="mySwiper" :options="swiperOptions">
                        <swiper-slide class="swiper-slide qa_similar_item" v-for="question in similars" :key="question.id">
                            <question-card is-small :question="question"/>
                        </swiper-slide>

                    </swiper>
                </div>
            </div>
        </div>

        <div class="wrap qa_add_controls">
            <button class="button button-primary" type="submit" :disabled="!isValid">Опубликовать</button>
        </div>

        <modal-block :visible.sync="modalVisible" with-header title="Выберите тему вопроса" id="themes">
            <ul class="qa_threads">
                <li class="qa_threads_item" v-for="theme in allThemes" :key="theme.id" :class="{'qa_threads_item-selected': theme.selected}" @click="toggleTheme(theme)">
                    <a href="#" class="qa_threads_link">{{theme.name}}</a>
                </li>
            </ul>
        </modal-block>
    </form>
</template>

<script>
  import QuestionCard from '../../components/QAComponents/QuestionCard'
  import UiInput from '../../components/ui/UiInputField'
  import UiTextarea from '../../components/ui/UiTextarea'
  import qaService from '../../_services/qa.service'
  import ModalBlock from '../../components/ModalBlock'
  import _ from 'lodash'
  import {setDocumentTitle} from '../../_helpers'

  export default {
    name: 'qa-create',
    components: {ModalBlock, UiTextarea, UiInput, QuestionCard},
    data() {
      return {
        swiperOptions: {
          slidesPerView: 3,
          spaceBetween: 24,
          breakpoints: {
            600: {
              slidesPerView: 1,
              spaceBetween: 16
            },
            1176: {
              slidesPerView: 2,
              spaceBetween: 24
            },
          }
        },
        similars: [],
        themesStatus: 'clean',
        themes: [],
        status: 'clean',
        searchText: '',
        data: {
          questionTitle: '',
          questionBody: '',
          themes: [],
        },
        modalVisible: false,
      }
    },
    computed: {
      swiper() {
        if (this.$refs.mySwiper) {
          return this.$refs.mySwiper.swiper
        }
        return null;
      },
      isValid() {
        return this.data.questionTitle.trim() !== '';
      },
      allThemes() {
        return this.themes.map(theme => ({...theme, selected: this.data.themes.findIndex(t => t.id === theme.id)!==-1}))
      },
    },
    methods: {
      showModal() {
        this.modalVisible = true;
      },
      handleSubmit() {
        if(!this.isValid) return;
        this.status = 'loading';
        qaService.sendQuestion({...this.data}).then((question)=> {
          this.status = 'success';
          this.$router.push({name: 'qa-single', params: {slug: question.id.toString()}});
        });
      },
      toggleTheme(theme) {
        const i = this.data.themes.findIndex(t => t.id === theme.id);
        if (i !== -1) {
          this.data.themes.splice(i, 1);
        } else {
          this.data.themes.push(theme);
        }
      },
      loadThemes() {
        this.themesStatus = 'loading';
        qaService.getThemes().then(themes => {
          this.themesStatus = 'success';
          this.themes = themes;
        });
      },
      debounceInput: _.debounce(function(e) {
        this.searchText = e;
      }, 1000),
      loadSimilars(searchText=this.searchText) {
        if (searchText==='') {
          this.similars = [];
        }
        qaService.getQuestions(1,3,{searchText}).then(({questions}) => {
          this.similars = questions;
        });
      },
    },
    watch: {
      searchText(to, from) {
        if (to !== from) {
          const text = to.split(' ');
          this.loadSimilars(text[text.length - 1].trim());
        }
      }
    },
    mounted() {
      if (this.swiper) {
        this.swiper.slideTo(0, 1000, false);
      }
      this.loadThemes();
      setDocumentTitle('ask question');
    },
  }
</script>
