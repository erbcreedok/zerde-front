<template>
    <div class="page wrap">
        <main class="login_wrap">
            <section class="login_section login_section-secondary">
                Войти через
                <a href="#" class="login_socbutton login_socbutton-vk"></a>
                <a href="#" class="login_socbutton login_socbutton-fb"></a>
            </section>

            <form class="login_section login_form form" @submit.prevent="submitForm">

                <ui-input class="textfield-block form_field" name="email" label="Эл. Почта" placeholder="Введите почту" v-model="email"/>

                <ui-input class="textfield-block form_field" name="password" label="Пароль" placeholder="Введите пароль" type="password" v-model="password"/>

                <ui-button type="submit" color="primary" class="button-block form_button">Войти</ui-button>

                <div class="form_sublinks"><router-link :to="{name: 'forgot-password'}">Восстановить пароль</router-link></div>
            </form>

            <section class="login_section login_section-secondary">
                <p>Еще не зарегистрированы?</p>
                <router-link :to="{name: 'signup'}" class="login_subbuton button button-small button-primary button-outline">Создать аккаунт</router-link>
            </section>
        </main>
    </div>
</template>
<script>
  import UiButton from '../components/ui/UiButton'
  import UiInput from '../components/ui/UiInput'
  import authService from '../services/auth.service'
  export default {
    components: {UiInput, UiButton},
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      submitForm() {
        authService.login(this.email, this.password)
          .then(data => {
            console.log(data);
          })
      }
    }
  }
</script>