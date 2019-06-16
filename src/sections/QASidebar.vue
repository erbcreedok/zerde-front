<template>
  <aside class="qa_sidebar">
    <section class="qa_sidesection">
      <h3 class="qa_sidesection_title caption">Темы вопросов</h3>

      <div style="margin: 2rem 0" v-if="themesLoading">
        <beat-loader :loading="themesLoading" color="#aaa"/>
      </div>
      <transition-group name="flip-list" class="qa_threads" v-if="shortThemes.length" tag="ul">
        <li class="qa_threads_item" v-for="theme in shortThemes" :key="theme.id">
          <router-link :to="{name: 'qa', query: {theme: theme.id}}" class="qa_threads_link">{{theme.name}}</router-link>
          <button class="qa_threads_fav" :class="{'qa_threads_fav-selected': theme.user_favorite}" @click="addToFav(theme.id, !theme.user_favorite)"></button>
        </li>
      </transition-group>

      <button type="button" data-modal="themes" @click="showModal" class="button button-small button-primary button-outline button-icon button-icon-left button-icon-dots">Все темы</button>

      <modal-block :visible.sync="modalVisible" with-header title="Выберите тему вопроса" id="themes">
        <transition-group name="flip-list" class="qa_threads" v-if="allThemes.length" tag="ul">
          <li class="qa_threads_item" v-for="theme in allThemes" :key="theme.id" :class="{'qa_threads_item-selected': theme.selected}">
            <router-link :to="{name: 'qa', query: {theme: theme.id}}" class="qa_threads_link">{{theme.name}}</router-link>
            <button class="qa_threads_fav" :class="{'qa_threads_fav-selected': theme.user_favorite}" @click="addToFav(theme.id, !theme.user_favorite)"></button>
          </li>
        </transition-group>
      </modal-block>
    </section>
    <qa-leaders/>
  </aside>
</template>

<script>
  import QaLeaders from '../components/QAComponents/QALeaders'
  import qaService from '../_services/qa.service'
  import ModalBlock from '../components/ModalBlock'
  import {capitalize} from '../_filters/capitalize'
  import BeatLoader from 'vue-spinner/src/BeatLoader'

  export default {
    name: 'qa-sidebar',
    components: {BeatLoader, ModalBlock, QaLeaders},
    data() {
      return {
        themesStatus: 'clean',
        themes: [],
        modalVisible: false,
      }
    },
    computed: {
      themesLoading() {
        return this.themesStatus === 'loading';
      },
      shortThemes() {
        return this.allThemes.slice(0,5);
      },
      allThemes() {
        return [...this.themes].sort(t => t.user_favorite ? -1 : 1 );
      },
    },
    methods: {
      showModal() {
        this.modalVisible = true;
      },
      loadThemes() {
        this.themesStatus = 'loading';
        qaService.getThemes().then(themes => {
          this.themesStatus = 'success';
          this.themes = [...themes];
        }).catch(() => {
          this.themesStatus = 'error';
        });
      },
      addToFav(id, value) {
        qaService.addThemeToFav(id, value)
          .then(() => {
            const index = this.themes.findIndex(t => t.id === id);
            console.log(index);
            const themes = [...this.themes];
            themes[index].user_favorite = value;
            this.themes = themes;
          })
          .catch(err => {
            console.log('error', {err});
            this.$notyf.error({
              message: capitalize(this.$t(err.message))
            })
          })
      }
    },
    watch: {
      $route() {
        this.modalVisible = false;
      }
    },
    mounted() {
      this.loadThemes();
    }
  }
</script>
