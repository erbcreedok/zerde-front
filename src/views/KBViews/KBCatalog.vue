<template>
    <div class="catalog">
        <div class="wrap">
            <kb-tags :tags="themes"/>
        </div>

        <div class="wrap">
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
  export default {
    components: {BlogCard, KbTags},
    data() {
      return {
        themes: [],
        articles: [],
        swiperOptions: {
          slidesPerView: 4,
          preventClicks: false,
          spaceBetween: 24,
          breakpoints: {
            600 : {
              slidesPerView: 'auto',
              spaceBetween: 0
            },

            1176 : {
              slidesPerView: 2,
              spaceBetween: 24
            }
          }
        },
      }
    },
    computed: {

    },
    methods: {
      loadArticles() {
        kbService.loadArticles().then(({articles}) => {
          console.log(articles);
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
