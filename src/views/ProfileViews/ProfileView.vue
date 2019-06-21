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
          <ui-description-icon title="Что такое баллы?" body='Баллы – внутренний показатель пользователей сайта, которые зачисляются за большинство действий внутри сайта: ежедневный вход, завершение занятия, публикация комментария и т.д.<br/><br/>На данный момент баллы влияют только на позицию пользователя и рейтинг его региона в разделе "Сообщество".<br/><br/>Возможно, в будущем пользователям будет доступна возможность разблокировать определенный функционал или контент при условии достаточного количества набранных баллов.'/>
        </div>

        <div class="profile_menu menu menu-tabletStacked">
          <router-link :to="{name: 'profile-main'}" class="menu_item menu_item-user">
            Профиль
          </router-link>

          <router-link :to="{name: 'profile-qa'}" class="menu_item menu_item-ask-question">
            Вопросы и ответы
            <span class="menu_counter">{{user.qa_count}}</span>
          </router-link>

          <router-link :to="{name: 'profile-comments'}" class="menu_item menu_item-comments">
            Комментарии
            <span class="menu_counter">{{user.cm_count}}</span>
          </router-link>
          <a href="#" class="menu_item menu_item-course" v-if="false">
            Обучение
          </a>

          <a href="#" class="menu_item menu_item-rules" v-if="false">
            Публикации
          </a>

          <router-link :to="{name: 'profile-bookmarks'}" class="menu_item menu_item-bookmark" v-if="isOwnProfile">
            Закладки
          </router-link>

          <a href="#" class="menu_item menu_item-warranty" v-if="false">
            Значки
          </a>

          <router-link :to="{name: 'profile-settings', params: {userId: this.userId}}" class="menu_item menu_item-settings" v-if="isOwnProfile">
            Настройки
          </router-link>
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
        <router-view :user="user" @updateProfile="handleUpdate"/>
      </main>
    </template>
  </div>
</template>

<script>
  import userService from '../../_services/user.service'
  import moment from 'moment';
  import UiDescriptionIcon from '../../components/ui/UiDescriptionIcon'

  export default {
    components: {UiDescriptionIcon},
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
        if (this.isOwnProfile) {
          userService.getMyProfile().then(user => {
            this.userState = 'success';
            this.user = user;
            console.log(user);
          });
        } else {
          userService.getUserProfile(id).then(user => {
            this.userState = 'success';
            this.user = user;
          });
        }
      },
      handleUpdate() {
        this.loadUser();
      }
    },
  }
</script>
