<template>
    <header>
        <div class="header">
            <div class="wrap header_wrap">
                <div class="header_brand">
                    <a href="/" class="header_logo"></a>
                </div>

                <ul class="mainmenu" :class="{'mainmenu-visible': mainMenuVisible}">
                    <li class="mainmenu_item"><router-link to="/faq" class="mainmenu_link">Вопросы и ответы</router-link></li>
                    <li class="mainmenu_item"><router-link to="/blogs" class="mainmenu_link">Знания</router-link></li>
                </ul>
                <div class="overlay" @click="mainMenuVisible = false"></div>

                <div class="header_controls">
                    <a href="#" class="header_language button button-small button-inverse button-outline">Қазақ тілінде</a>

                    <template v-if="!authorized">
                     <router-link :to="{name: 'signin'}" class="button button-small button-primary button-inverse button-icon button-icon-left button-icon-user header_user_button">Личный кабинет</router-link>
                    </template>
                    <template v-else>
                        <div class="dropdown header_user">
                            <button class="dropdown_toggle header_user_button button button-small button-primary button-inverse button-icon button-icon-left button-icon-user" @click="openDropdown">Юрий</button>
                            <div v-if="dropDownVisible" class="dropdown_window dropdown_window-right dropdown_window-visible" v-click-outside="closeDropdown">
                                <div class="dropdown_menu">
                                    <a @click="logout" href="#" class="dropdown_menu_item dropdown_menu_item-exit">Выйти</a>
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
      },
      methods: {
        openDropdown() {
          if (!this.dropDownVisible) {
            setTimeout(() => {
              this.dropDownVisible = true;
            }, 10);
          } else {
            this.closeDropdown();
          }

        },
        closeDropdown() {
          this.dropDownVisible = !this.dropDownVisible;
        },
        logout() {
          authService.logout()
        },
      }
    }
</script>
