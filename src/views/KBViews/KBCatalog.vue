<template>
    <div class="catalog">

        <div class="wrap">
            <kb-tags :tags="themes"/>
        </div>

        <div class="wrap">
            <template v-if="status==='loading'">
                <grid-loader color="#e3e3e3" style="text-align: center; margin: 1rem auto"/>
            </template>
            <div class="blog_section blog_grid blog_grid-static">
                <template v-for="(article, index) in articles">
                    <blog-card :key="index" v-bind="article" :size="index < 2 ? 'wide': ''" inverse/>
                </template>
            </div>
        </div>

        <section class="blog_section blog_section-hl">
            <div class="wrap">
                <h3 class="blog_subtitle blog_subtitle-icon blog_subtitle-icon-best">Лучшее за март-апрель</h3>
                <div class="blog_grid blog_grid-slider">
                    <swiper ref="mySwiper" :options="swiperOptions">
                        <swiper-slide v-for="(article, index) in articles" :key="index">
                            <blog-card  v-bind="article" inverse/>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </section>

        <!--<div class="wrap">-->
            <!--<section class="blog_section">-->
                <!--<h3 class="blog_subtitle blog_subtitle-icon blog_subtitle-icon-questions">Отвечаем на ваши вопросы</h3>-->
                <!--<div class="blog_grid blog_grid-static">-->
                <!--</div>-->
            <!--</section>-->
        <!--</div>-->
    </div>
</template>
<script>
  import KbTags from "../../components/KBComponents/KBTags";
  import kbService from "../../_services/kb.service";
  import BlogCard from "../../components/KBComponents/BlogCard";
  import {blogsSwiperOptions} from "../../_helpers/swiperOptions";
  import GridLoader from "vue-spinner/src/GridLoader";
  export default {
    components: {GridLoader, BlogCard, KbTags},
    data() {
      return {
        themes: [],
        status: 'clean',
        articles: [],
        swiperOptions: blogsSwiperOptions
      }
    },
    methods: {
      loadArticles() {
        this.status = 'loading';
        kbService.loadArticles(1, 6).then(({articles}) => {
          console.log(articles);
          this.status = 'success';
          this.articles = articles;
        })
      },
      loadThemes() {
        kbService.loadThemes().then(themes => {
          this.themes = themes;
        })
      }
    },
    mounted() {
      this.loadArticles();
      this.loadThemes();
    }
  }
</script>
