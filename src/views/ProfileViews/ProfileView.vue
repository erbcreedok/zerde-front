<template>
  <div class="page wrap profile" v-loading="userState === 'loading'">
    <template v-if="user">
      <aside class="profile_sidebar">
        <div class="profile_user">
          <div class="profile_photo avatar">
            <img :src="user.avatar_src" alt="">
          </div>
          <div class="profile_user_info">
            <div class="profile_name">{{user.fullname}}</div>
            <div class="profile_status">{{ $t('was online {val} ago', {val: lastActivity}) | capitalize }}</div>
          </div>
        </div>

        <div class="profile_activity">
          <div class="level profile_activity_level">
            <div class="level_pane">
              <div class="level_number">{{user.level}}</div>
              <div class="level_title">{{user.levelName}}</div>
            </div>
            <div class="level_pane level_pane-above" :style="{width: user.levelProgress+'%'}">
              <div class="level_number">{{user.level}}</div>
              <div class="level_title">{{user.levelName}}</div>
            </div>
          </div>

          <div class="points profile_activity_points">{{user.rating}}</div>
        </div>

        <div class="profile_menu menu menu-tabletStacked">
          <a href="#" class="menu_item menu_item-user menu_item-active">
            Профиль
          </a>

          <a href="#" class="menu_item menu_item-ask-question">
            Вопросы и ответы
            <span class="menu_counter">{{user.questionsCount}}</span>
          </a>

          <a href="#" class="menu_item menu_item-comments">
            Комментарии
            <span class="menu_counter">{{user.commentsCount}}</span>
          </a>

          <a href="#" class="menu_item menu_item-course">
            Обучение
          </a>

          <a href="#" class="menu_item menu_item-rules">
            Публикации
          </a>

          <a href="#" class="menu_item menu_item-bookmark" v-if="isOwnProfile">
            Закладки
          </a>

          <a href="#" class="menu_item menu_item-warranty">
            Значки
          </a>

          <a href="#" class="menu_item menu_item-settings" v-if="isOwnProfile">
            Настройки
          </a>
        </div>

        <div class="profile_tour" v-if="isOwnProfile">
          <div class="profile_tour_header">Заполните свой профиль</div>

          <div class="profile_tour_list">
            <div class="profile_tour_item profile_tour_item-done">
              Указать дату рождения
            </div>

            <div class="profile_tour_item">
              Написать текст о себе
              <div class="profile_tour_reward">+ 1000</div>
            </div>

            <div class="profile_tour_item">
              Указать контакты
              <div class="profile_tour_reward">+ 500</div>
            </div>
          </div>
        </div>
      </aside>

      <main class="profile_main">
        <div class="profile_stats" v-if="false">
          <div class="profile_stats_counter">
            65
          </div>
          <div class="profile_stats_description">
            просмотров профиля
            <br>за последние 7 дней
          </div>

          <div class="profile_stats_users">
            <a href="#" class="avatar"><img src="https://thispersondoesnotexist.com/image" alt=""></a>
            <a href="#" class="avatar"><img src="https://thispersondoesnotexist.com/image" alt=""></a>
            <a href="#" class="avatar"><img src="https://thispersondoesnotexist.com/image" alt=""></a>
          </div>

          <div class="profile_stats_chart">
            график
          </div>
        </div>

        <div class="profile_section">
          <div class="caption profile_subtitle">
            О себе
          </div>

          <div class="profile_about" v-html="user.about"></div>

          <!--<a href="#" rel="nofollow" class="profile_custombutton button button-small button-primary button-outline">Пользовательская кнопка</a>-->
        </div>

        <div class="profile_section">
          <div class="caption profile_subtitle">
            Основная информация
          </div>

          <div class="dtable dtable-justify">
            <div class="dtable_row">
              <div class="dtable_col dtable_col-muted dtable_col-4">День рождения</div>
              <div class="dtable_col dtable_col-4">{{user.birth_date | moment('DD.MM.YYYY')}} <span class="muted">({{$t('age {val}', {val: user.age},  user.age)}})</span></div>
            </div>

            <div class="dtable_row">
              <div class="dtable_col dtable_col-muted dtable_col-4">Город</div>
              <div class="dtable_col dtable_col-4">{{user.city}}</div>
            </div>
          </div>
        </div>

        <div class="profile_section">
          <div class="caption profile_subtitle">
            Работа
          </div>

          <div class="dtable dtable-justify" v-if="user.work_information">
            <div class="dtable_row" v-if="user.work_information.place">
              <div class="dtable_col dtable_col-muted dtable_col-4">Место работы</div>
              <div class="dtable_col dtable_col-4">{{user.work_information.place}}</div>
            </div>

            <div class="dtable_row" v-if="user.work_information.space">
              <div class="dtable_col dtable_col-muted dtable_col-4">Сфера</div>
              <div class="dtable_col dtable_col-4">{{user.work_information.space}}</div>
            </div>

            <div class="dtable_row" v-if="user.work_information.position">
              <div class="dtable_col dtable_col-muted dtable_col-4">Должность</div>
              <div class="dtable_col dtable_col-4">{{user.work_information.position}}</div>
            </div>

            <div class="dtable_row" v-if="user.work_information.since">
              <div class="dtable_col dtable_col-muted dtable_col-4">Начало работы</div>
              <div class="dtable_col dtable_col-4">{{user.work_information.since | moment('YYYY')}}</div>
            </div>

            <div class="dtable_row" v-if="user.work_information.site">
              <div class="dtable_col dtable_col-muted dtable_col-4">Сайт компании</div>
              <div class="dtable_col dtable_col-4"><a :href="user.work_information.site" target="_blank">{{user.work_information.site}}</a></div>
            </div>
          </div>
        </div>

        <div class="profile_section">
          <div class="caption profile_subtitle">
            Контакты
          </div>

          <div class="profile_contacts" v-if="user.contacts && user.contacts.length">
            <a v-for="contact in user.contacts" :key="contact.type" :href="contact.link" :class="contact.icon" target="_blank" class="profile_contact">{{contact.label}}</a>
          </div>
        </div>
      </main>
    </template>
  </div>
</template>

<script>
  import userService from '../../_services/user.service'
  import moment from 'moment';

  export default {
    props: {
      userId: {
        type: [String, Number],
        required: true,
      },
    },
    data() {
      return {
        user: null,
        userState: 'clean',
      }
    },
    mounted() {
      this.loadUser();
    },
    computed: {
      lastActivity() {
        if (this.user.lastActivity){
          const minutes = moment().diff(this.user.lastActivity, 'minutes');
          if (minutes < 1) {
            return true;
          }
          else if (minutes < 60) {
            return this.$t('{val} minute ::: {val} minutes', {val: minutes}, minutes);
          }
          else if (minutes < 60 * 24) {
            return this.$t('{val} hour ::: {val} hours', {val: minutes / 60}, minutes / 60);
          }
          else if (minutes < 60 * 24 * 10) {
            return this.$t('{val} day ::: {val} days', {val: minutes / 60 / 24}, minutes / 60 / 24);
          }
          else {
            return false;
          }
        }
        return false;
      },
      isAuthorised() {
        return this.$store.state.auth.authorized;
      },
      isOwnProfile() {
        return this.isAuthorised && this.userId-0 === this.$store.state.user.user.id
      },
    },
    watch: {
      userId(to, from) {
        if (to !== from) {
          this.loadUser(to);
        }
      }
    },
    methods: {
      loadUser(id = this.userId) {
        this.userState = 'loading';
        userService.getUserProfile(id).then(user => {
          this.userState = 'success';
          this.user = user;
        });
      }
    },
  }
</script>