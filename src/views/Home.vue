<template>
    <div class="home">
        <hero/>
        <div class="wrap">
            <section class="hp_section" v-if="courses.length">
                <div class="hp_title">Курсы</div>
                <course-card v-for="course of courses" :key="course.id" v-bind="course"/>
            </section>
            <section class="hp_section" v-if="articles.length">
                <div class="hp_title">Материалы</div>

                <form class="hp_search textfield textfield-block" @submit.prevent="handleSubmit">
                    <input type="text" class="qa_search_field textfield_input" v-model="search" placeholder=" ">
                    <label class="textfield_label">Ищите ответы на свои вопросы или интересующие материалы</label>
                    <button type="submit" class="textfield_button textfield_button-search"></button>
                </form>

                <div class="hp_content blog_grid blog_grid-static">
                    <blog-card v-for="(article, index) in articles" :key="article.id" v-bind="article" inverse :wide="index===2 || index===3" :stacked="index>0" :highlight="index===2"/>
                </div>

                <router-link :to="{name: 'kb-all'}" class="hp_section_button button button-primary button-outline button-icon button-icon-right button-icon-arrow-right">Все материалы</router-link>
            </section>
            <section class="hp_section" v-if="questions.length">
                <div class="hp_title">Ответы на вопросы сообщества</div>
                <div class="hp_questions">
                    <question-card v-for="question in questions" :key="question.id" :question="question" is-small/>
                </div>
                <router-link :to="{name: 'qa'}" class="hp_section_button button button-primary button-outline button-icon button-icon-right button-icon-arrow-right">Все вопросы</router-link>
            </section>
        </div>
    </div>
</template>

<script>
  import Hero from '../components/Hero'
  import clService from '../_services/cl.service'
  import kbService from '../_services/kb.service'
  import CourseCard from '../components/CLComponents/CourseCard'
  import BlogCard from '../components/KBComponents/BlogCard'
  import qaService from '../_services/qa.service'
  import QuestionCard from '../components/QAComponents/QuestionCard'
  import {setDocumentTitle} from '../_helpers'

  export default {
      components: {QuestionCard, BlogCard, CourseCard, Hero},
      data() {
        return {
          courses: [],
          articles: [],
          questions: [],
          coursesStatus: 'loading',
          articlesStatus: 'loading',
          questionsStatus: 'loading',
          search: '',
        }
      },
      methods: {
        loadCourses() {
          this.coursesStatus = 'loading';
          clService.loadCourses(1, 3).then(({courses}) => {
            this.courses = courses;
            this.coursesStatus = 'success';
          });
        },
        loadArticles() {
          this.articlesStatus = 'loading';
          kbService.loadArticles(1, 6, {orderBy: 'rating'}).then(({articles}) => {
            this.articlesStatus = 'success';
            this.articles = articles;
          });
        },
        loadQuestions() {
          this.questionsStatus = 'loading';
          qaService.getQuestions(1, 6, {orderBy: 'rating'}).then(({questions}) => {
            this.questionsStatus = 'success';
            this.questions = questions;
          });
        },
        handleSubmit() {
          this.$router.push({
            name: 'kb-search',
            query: {search: this.search},
          });
        }
      },
      mounted() {
        this.loadCourses();
        this.loadArticles();
        this.loadQuestions();
        setDocumentTitle('home');
      },
      beforeDestroy() {
        setDocumentTitle();
      }
    }
</script>
