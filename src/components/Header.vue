<template>
    <header>
        <div class="header">
            <div class="wrap header_wrap">
                <div class="header_brand">
                    <a href="/" class="header_logo"></a>
                </div>

                <ul class="mainmenu" :class="{'mainmenu-visible': mainMenuVisible}" @click="mainMenuVisible = false">
                    <li class="mainmenu_item"><router-link :to="{name: 'qa'}" class="mainmenu_link">{{ 'questions and answers' | translate | capitalize }}</router-link></li>
                    <li class="mainmenu_item"><router-link :to="{name: 'kb'}" class="mainmenu_link">{{ 'knowledge' | translate | capitalize }}</router-link></li>
                </ul>
                <div class="overlay" @click="mainMenuVisible = false"></div>
                <div class="header_controls">
                    <router-link :to="{...$route, params: {...$route.params, locale: 'kk'}}" v-if="$route.params.locale === 'ru'" class="header_language button button-small button-inverse button-outline">Қазақ тілінде</router-link>
                    <router-link :to="{...$route, params: {...$route.params, locale: 'ru'}}" v-if="$route.params.locale === 'kk'" class="header_language button button-small button-inverse button-outline">На русском</router-link>

                    <template v-if="!authorized">
                     <router-link :to="{name: 'signin'}" class="button button-small button-primary button-inverse button-icon button-icon-left button-icon-user header_user_button">{{ 'cabinet' | translate | capitalize }}</router-link>
                    </template>
                    <template v-else>
                        <div class="dropdown header_user">
                            <button class="dropdown_toggle header_user_button button button-small button-primary button-inverse button-icon button-icon-left button-icon-user" @click="openDropdown">{{username}}</button>
                            <div :class="{'dropdown_window-visible': dropDownVisible}" class="dropdown_window dropdown_window-right">
                                <div v-if="dropDownVisible" class="dropdown-overlay"  v-click-outside="closeDropdown">
                                    <div class="dropdown_menu">
                                        <router-link :to="{name: 'user', params: {userId}}" class="dropdown_menu_item dropdown_menu_item-user">{{ 'my profile' | translate | capitalize }}</router-link>
                                    </div>
                                    <div class="dropdown_menu">
                                        <a @click="logout" href="#" class="dropdown_menu_item dropdown_menu_item-exit">{{ 'signout' | translate | capitalize }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>

                <div class="mainmenu_toggle" @click="mainMenuVisible = true"></div>
            </div>
        </div>
    </header>
</template>

<script>
    import authService from '../_services/auth.service'
    import {USER} from '../_types/store-types'

    export default {
      data() {
        return {
          mainMenuVisible: false,
          dropDownVisible: false,
        }
      },
      computed: {
        authorized() {
          return this.$store.state.auth.authorized;
        },
        username() {
          if (this.authorized) {
            return this.$store.getters[USER + 'getUserName'];
          }
          return 'not authorised';
        },
        userId() {
          if (this.authorized) {
            return this.$store.getters[USER + 'getUserId'];
          }
          return false;
        }
      },
      watch: {
        $route() {
          this.closeDropdown();
        }
      },
      methods: {
        openDropdown() {
          if (!this.dropDownVisible) {
            setTimeout(() => {
              this.dropDownVisible = true;
            }, 10)
          } else {
            this.dropDownVisible = false;
          }
        },
        closeDropdown() {
          this.dropDownVisible = false;
        },
        logout() {
          authService.logout()
        },
      }
    }
</script>
