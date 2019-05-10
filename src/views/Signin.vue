<template>
    <div class="page wrap">
        <main class="login_wrap">
            <section class="login_section login_section-secondary">
                Войти через
                <a href="#" class="login_socbutton login_socbutton-vk"></a>
                <a href="#" class="login_socbutton login_socbutton-fb"></a>
            </section>

            <form class="login_section login_form form" @submit.prevent="onSubmit" v-loading="status === 'loading'">
                <ui-input class="textfield-block form_field" name="email" label="Эл. Почта" placeholder="Введите почту" v-model="data.email"/>

                <!--<ui-input class="textfield-block form_field" name="phone" label="Телефон" placeholder="Введите номер телефона" v-model="data.phone" mask="+7(7##)###-##-##"/>-->

                <ui-input class="textfield-block form_field" name="password" label="Пароль" placeholder="Введите пароль" type="password" v-model="data.password"/>

                <ui-button type="submit" color="primary" class="button-block form_button" :disabled="status === 'loading'">Войти</ui-button>

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
  import authService from '../_services/auth.service'
  import 'vue-loading-overlay/dist/vue-loading.css'

  export default {
    components: {UiInput, UiButton},
    data() {
      return {
        data: {
          email: '',
          phone: '',
          password: '',
        },
        status: 'clear',
        errors: [],
      }
    },
    methods: {
      onSubmit() {
        this.status = 'loading';
        this.errors = [];
        authService.login(this.data.email, this.data.password)
          .then(data => {
            this.status = 'success';
            console.log(data);
          })
          .catch(err => {
            this.status = 'error';
            this.errors.push(err);
          })
      }
    }
  }
</script>