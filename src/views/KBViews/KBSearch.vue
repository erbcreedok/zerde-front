<template>
    <div class="wrap">
        <button class="bSearch_filters_toggle button button-block button-outline button-primary button-icon button-icon-left button-icon-filter" @click="searchVisible=true">Параметры поиска</button>

        <div class="bSearch">
            <form class="bSearch_filters" :class="{'bSearch_filters-visible': searchVisible}" @submit.prevent="submitFilters">
                <div class="bSearch_filters_section">
                    <ui-input-field v-model="search" class="textfield-block" label="Поиск по названию"/>
                </div>

                <div class="bSearch_filters_section">
                    <div class="bSearch_filters_title caption">Тема</div>
                    <ui-checkbox block nowrap v-for="theme in themes" :key="theme.id" :label="theme.name" :data="theme.id" v-model="checkedThemes"/>
                </div>

                <div class="bSearch_filters_section">
                    <div class="bSearch_filters_title caption">Формат</div>

                    <ui-checkbox label="Видео" block nowrap v-model="checkedTypes" data="video"/>
                    <ui-checkbox label="Текст" block nowrap v-model="checkedTypes" data="text"/>
                </div>

                <div class="bSearch_filters_section">
                    <div class="bSearch_filters_title caption">Сортировка</div>

                    <ui-checkbox label="По рейтингу" block nowrap type="radio" data="rating" v-model="checkedSort"/>
                    <ui-checkbox label="По просмотрам" block nowrap type="radio" data="views" v-model="checkedSort"/>
                    <ui-checkbox label="По дате добавления" block nowrap type="radio" data="created_at" v-model="checkedSort"/>
                    <ui-checkbox label="По комментариям" block nowrap type="radio" data="comments_count" v-model="checkedSort"/>
                </div>

                <div class="bSearch_filters_section">
                    <button type="submit" class="bSearch_filters_submit button button-primary button-block">Применить</button>
                    <ui-toggle label="Показывать рекомендованные материалы со сторонних ресурсов" class="bSearch_filters_thumbler" v-model="thirdPartyResources"/>
                </div>
            </form>
            <div class="overlay" @click="searchVisible=false"></div>

            <main class="bSearch_results blog_grid-static">
                <template v-if="status==='loading'">
                    <grid-loader color="#e3e3e3" style="text-align: center; margin: 1rem auto"/>
                </template>
                <template v-if="status==='success' && totalCount === 0">
                    <h2 class="muted" style="text-align: center; width: 100%; padding: 20px;">Результатов нет</h2>
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
    import UiCheckbox from "../../components/ui/UiCheckbox";
    import UiToggle from "../../components/ui/UiToggle";
    import UiInputField from "../../components/ui/UiInputField";
    import {setDocumentTitle} from '../../_helpers'

    export default {
      components: {UiInputField, UiToggle, UiCheckbox, GridLoader, BlogCard},
      data() {
        return {
          articles: [],
          themes: [],
          status: 'clean',
          totalCount: 0,
          perPage: 10,
          activePage: 1,
          searchVisible: false,
          checkedThemes: [],
          checkedTypes: [],
          checkedSort: null,
          thirdPartyResources: false,
          search: '',
          debounceLoading: _.debounce(this.loadArticles, 300),
        }
      },
      methods: {
        debounce:_.debounce,
        scrollLoaderMethod() {
          if (this.totalCount <= this.articles.length) return;
          this.activePage += 1;
        },
        loadArticles(page=this.activePage, per_page=this.perPage) {
          this.status = 'loading';
          const options = {
            search: this.typedSearch,
            themes: this.selectedThemes,
            // types: this.selectedTypes,
            orderBy: this.selectedSort,
          };
          kbService.loadArticles(page, per_page, options).then(({articles, totalCount}) => {
            this.status = 'success';
            this.articles.push(...articles);
            this.totalCount = totalCount;
          }).catch(() => {
            this.status = 'error';
            this.$notyf.error({
              message: 'Произошла ошибка при загрузке данных',
            });
          });
        },
        loadThemes() {
          kbService.loadThemes().then(themes => {
            this.themes = themes;
          })
        },
        submitFilters() {
          this.articles = [];
          this.$router.push({
            name: 'kb-search',
            query: {
              themes: JSON.stringify(this.checkedThemes),
              types: JSON.stringify(this.checkedTypes),
              search: this.search,
              sort: this.checkedSort,
            }
          });
        },
        setDocumentSearchTitle(w = this.search) {
          if (w && w.length) {
            setDocumentTitle(this.$t('search {w} in knowledge base', {w: `"${w}"`}));
          } else {
            setDocumentTitle('search in knowledge base');
          }
        },
      },
      computed: {
        typedSearch() {
          try {
            return this.$route.query['search'];
          } catch {
            return '';
          }
        },
        selectedThemes() {
          try {
            return JSON.parse(this.$route.query['themes'].toString())
          } catch {
            return [];
          }
        },
        selectedTypes() {
          try {
            return JSON.parse(this.$route.query['types'].toString())
          } catch {
            return [];
          }
        },
        selectedSort() {
          try {
            return this.$route.query['sort'];
          } catch {
            return null;
          }
        },
      },
      watch: {
        activePage() {
          this.loadArticles();
        },
        selectedThemes(to) {
          this.checkedThemes = to;
          this.debounceLoading();
        },
        selectedTypes(to) {
          this.checkedTypes = to;
          this.debounceLoading();
        },
        selectedSort(to) {
          this.checkedSort = to;
          this.debounceLoading();
        },
        typedSearch(to) {
          this.search = to;
          this.debounceLoading();
          this.setDocumentSearchTitle(to);
        }
      },
      mounted() {
        this.loadArticles();
        this.loadThemes();
        this.checkedThemes = this.selectedThemes;
        this.checkedTypes = this.selectedTypes;
        this.checkedSort = this.selectedSort;
        this.search = this.typedSearch;
        this.setDocumentSearchTitle();
      },
      beforeDestroy() {
        setDocumentTitle();
      }
    }
</script>
