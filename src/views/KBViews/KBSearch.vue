<template>
    <div class="wrap">
        <button class="bSearch_filters_toggle button button-block button-outline button-primary button-icon button-icon-left button-icon-filter">Параметры поиска</button>

        <div class="bSearch">
            <form class="bSearch_filters">
                <div class="bSearch_filters_section">
                    <div class="textfield textfield-block">
                        <input type="text" class="qa_search_field textfield_input" placeholder=" ">
                        <label class="textfield_label">Поиск по названию</label>
                    </div>
                </div>

                <div class="bSearch_filters_section">
                    <div class="bSearch_filters_title caption">Тема</div>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Старт бизнеса</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Операционка</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Персонал</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Финансы</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Маркетинг</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Продажи</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Личная эффективность</span>
                    </label>
                </div>

                <div class="bSearch_filters_section">
                    <div class="bSearch_filters_title caption">Формат</div>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Видео</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="checkbox" name="" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">Текст</span>
                    </label>
                </div>

                <div class="bSearch_filters_section">
                    <div class="bSearch_filters_title caption">Сортировка</div>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="radio" name="sort" value="" checked>
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">По рейтингу</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="radio" name="sort" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">По просмотрам</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="radio" name="sort" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">По дате добавления</span>
                    </label>

                    <label class="checkbox checkbox-nowrap checkbox-block">
                        <input type="radio" name="sort" value="">
                        <span class="checkbox_icon"></span>
                        <span class="checkbox_label">По комментариям</span>
                    </label>
                </div>

                <div class="bSearch_filters_section">
                    <button type="submit" class="bSearch_filters_submit button button-primary button-block">Применить</button>

                    <label class="bSearch_filters_thumbler">
						<span class="checkbox">
							<input type="checkbox" name="" value="" checked="">
							<span class="checkbox_toggle"></span>
						</span>
                        <span>
							Показывать рекомендованные материалы со сторонних ресурсов
						</span>
                    </label>
                </div>
            </form>
            <div class="overlay"></div>

            <main class="bSearch_results blog_grid-static">
                <template v-if="status==='loading'">
                    <grid-loader color="#e3e3e3" style="text-align: center; margin: 1rem auto"/>
                </template>
                <blog-card v-for="(article, index) in articles" v-bind="article" :key="index" horizontal/>
                <scroll-loader :loader-enable="status==='success' && totalCount > articles.length" :loader-method="debounce(scrollLoaderMethod, 1000)"/>
            </main>
        </div>
    </div>
</template>

<script>
    import kbService from "../../_services/kb.service";
    import BlogCard from "../../components/KBComponents/BlogCard";
    import _ from "lodash";
    import GridLoader from "vue-spinner/src/GridLoader";

    export default {
      components: {GridLoader, BlogCard},
      data() {
        return {
          articles: [],
          status: 'clean',
          totalCount: 0,
          perPage: 10,
          activePage: 1,
        }
      },
      methods: {
        debounce:_.debounce,
        scrollLoaderMethod() {
          if (this.totalCount <= this.articles.length) return;
          console.log(this.totalCount, this.articles.length);
          this.activePage += 1;
        },
        loadArticles(page=this.activePage, per_page=this.perPage) {
          this.status = 'loading';
          console.log(page);
          kbService.loadArticles(page, per_page).then(({articles, totalCount}) => {
            console.log(articles);
            this.status = 'success';
            this.articles.push(...articles);
            this.totalCount = totalCount;
          }).catch(err => {
            console.log(err);
            this.status = 'error';
            this.$notyf.error({
              message: 'Произошла ошибка при загрузке данных',
            });
          });
        },
      },
      watch: {
        activePage() {
          this.loadArticles();
        },
      },
      mounted() {
        this.loadArticles();
      },
    }
</script>
