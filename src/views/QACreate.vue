<template>
    <form class="" @submit.prevent="handleSubmit" v-loading="status==='loading'">
        <div class="page wrap">
            <h1 class="title qa_title qa_add_title">Задать вопрос сообществу</h1>

            <div class="qa_grid form">
                <div class="qa_main">
                    <ui-input class="textfield-block form_field" v-model="data.questionTitle" label="Конкретный вопрос" placeholder="Напишите сюда загаловок вашего вопроса"/>

                    <ui-textarea class="textfield-block form_field" v-model="data.questionBody" label="Подробное пояснение вопроса" placeholder="Старайтесь описать вашу проблему как можно подробнее" rows="7"/>
                </div>

                <div class="qa_sidebar">
                    <div class="caption qa_sidesection_title">Тема вопроса</div>

                    <ul class="qa_threads">
                        <li class="qa_threads_item qa_threads_item-selected" v-for="tag in data.tags" :key="tag" @click="toggleTag(tag)">
                            <span class="qa_threads_link">{{tag}}</span>
                        </li>
                    </ul>

                    <button data-modal="themes" @click="modalVisible = true" class="button button-small button-primary button-outline button-icon button-icon-left button-icon-dots">Выбрать тему</button>
                </div>
            </div>
        </div>

        <div class="qa_similar">
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

        <div class="modal" id="themes" :class="{'modal-visible': modalVisible}">
            <div class="modal_header">
                <div class="modal_title">Выберите тему вопроса</div>
                <button class="modal_close" @click="modalVisible = false"></button>
            </div>

            <div class="modal_wrap">
                <div class="modal_body">
                    <ul class="qa_threads">
                        <li class="qa_threads_item" v-for="tag in allTags" :key="tag.value" :class="{'qa_threads_item-selected': tag.selected}" @click="toggleTag(tag.value)">
                            <a href="#" class="qa_threads_link">{{tag.value}}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="overlay" @click="modalVisible = false"></div>
    </form>
</template>

<script>
    import qaMock from "../_mock/qa.mock";
    import QuestionCard from "../components/QAComponents/QuestionCard";
    import UiInput from "../components/ui/UiInput";
    import UiTextarea from "../components/ui/UiTextarea";
    import {tags} from "../_mock/questions.mock";
    import qaService from "../_services/qa.service";

    export default {
      name: 'qa-create',
      components: {UiTextarea, UiInput, QuestionCard},
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
          similars: qaMock.getQAs().slice(0,4),
          tags,
          status: 'clean',
          data: {
            questionTitle: '',
            questionBody: '',
            tags: [...tags.slice(0,1)],
          },
          modalVisible: false,
        }
      },
      computed: {
        swiper() {
          return this.$refs.mySwiper.swiper
        },
        isValid() {
          return this.data.questionTitle.trim() !== '' && this.data.questionBody.trim() !== '';
        },
        allTags() {
          return this.tags.map(t => ({value: t, selected: this.data.tags.indexOf(t)!==-1}))
        }
      },
      methods: {
        handleSubmit() {
          if(!this.isValid) return;
          this.status = 'loading';
          qaService.sendQuestion({...this.data}).then(data => {
            this.status = 'success';
            this.$router.push({name: 'qa-single', params: {slug: data.id}});
            console.log(data);
          });
        },
        toggleTag(tag) {
          const i = this.data.tags.indexOf(tag);
          if (i !== -1) {
            this.data.tags.splice(i, 1);
          } else {
            this.data.tags.push(tag);
          }

        },
      },
      mounted() {
        this.swiper.slideTo(0, 1000, false);
      },
    }
</script>
