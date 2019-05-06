<template>
    <header class="header">
        <div class="wrap header_wrap">
            <div class="header_brand">
                <a href="/" class="header_logo"></a>
            </div>

            <ul class="mainmenu">
                <li class="mainmenu_item"><a href="/archive-qa.html" class="mainmenu_link">Вопросы и ответы</a></li>
                <li class="mainmenu_item"><a href="/archive-blog.html" class="mainmenu_link">Знания</a></li>
            </ul>
            <div class="overlay"></div>

            <div class="header_controls">
                <a href="#" class="header_language button button-small button-inverse button-outline">Қаз<span>ақ тілінде</span></a>
                <!-- <a href="login.html" class="button button-small button-primary button-inverse button-icon button-icon-left button-icon-user header_user_button">Личный кабинет</a> -->

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
            </div>

            <div class="mainmenu_toggle"></div>
        </div>
    </header>
</template>
