<template>
  <footer class="footer">
    <div class="wrap footer_wrap">
      <ul class="footer_menu">
        <li class="footer_menu_link"><router-link :to="{name: 'home'}" class="mainmenu_link">{{ 'home' | translate | capitalize }}</router-link></li>
        <li class="footer_menu_link"><router-link :to="{name: 'cl'}" class="mainmenu_link">{{ 'courses' | translate | capitalize }}</router-link></li>
        <li class="footer_menu_link"><router-link :to="{name: 'qa'}" class="mainmenu_link">{{ 'questions and answers' | translate | capitalize }}</router-link></li>
        <li class="footer_menu_link"><router-link :to="{name: 'kb'}" class="mainmenu_link">{{ 'knowledge' | translate | capitalize }}</router-link></li>
      </ul>

      <div class="footer_text">
        Компьютеры коренным образом изменили жизнь каждого человека. Несколько десятилетий назад люди даже не знали ничего об этих электронных устройствах, тогда как в наши дни даже маленький ребенок может управлять этой машиной. Почти все современные технологии зависит от компьютеров, которые используются для.
      </div>

      <ul class="footer_socialmedia">
        <li><a href="https://t.me/Atamekenacademy" target="_blank" class="smbutton smbutton-telegram">Канал Telegram</a></li>
        <li><a href="https://www.instagram.com/atameken.academy" target="_blank" class="smbutton smbutton-instagram">Страница Instagram</a></li>
      </ul>
    </div>

    <div class="footer_links">
      <div class="wrap footer_links_wrap">
        <a href="#" target="_blank" class="footer_links_item">Пользовательское соглашение</a>
        <a href="#" target="_blank" class="footer_links_item">Политика конфиденциальности</a>
        <a href="mailto: inbox@atameken.co" target="_blank" class="footer_links_item footer_links_item-right">inbox@atameken.co</a>
      </div>
    </div>
  </footer>
</template>