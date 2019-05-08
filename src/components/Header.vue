<template>
    <header class="header">
        <div class="wrap header_wrap">
            <div class="header_brand">
                <a href="/" class="header_logo"></a>
            </div>

            <ul class="mainmenu">
                <li class="mainmenu_item"><router-link to="/faq" class="mainmenu_link">Вопросы и ответы</router-link></li>
                <li class="mainmenu_item"><router-link to="/blogs" class="mainmenu_link">Знания</router-link></li>
            </ul>
            <div class="overlay"></div>

            <div class="header_controls">
                <a href="#" class="header_language button button-small button-inverse button-outline">Қазақ тілінде</a>

                <template v-if="!authorized">
                 <router-link :to="{name: 'signin'}" class="button button-small button-primary button-inverse button-icon button-icon-left button-icon-user header_user_button">Личный кабинет</router-link>
                </template>
                <template v-else>
                    <div class="dropdown header_user">
                        <button class="dropdown_toggle header_user_button button button-small button-primary button-inverse button-icon button-icon-left button-icon-user">Юрий</button>


                        <div class="dropdown_window dropdown_window-right">
                            <div class="dropdown_menu">
                                <a href="#" class="dropdown_menu_item dropdown_menu_item-exit">Выйти</a>
                                <a href="#" class="dropdown_menu_item dropdown_menu_item-exit">Выйти</a>
                                <a href="#" class="dropdown_menu_item dropdown_menu_item-exit">Выйти</a>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <div class="mainmenu_toggle"></div>
        </div>
    </header>
</template>

<script>
    export default {
      data() {
        return {
          authorized: false
        }
      }
    }
</script>
