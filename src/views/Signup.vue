<template>
    <div class="page wrap">
        <main class="login_wrap">
            <section class="login_section login_section-secondary">
                Регистрация через
                <div class="login_socbuttons">
                    <a href="#" class="login_socbutton login_socbutton-vk"></a>
                    <a href="#" class="login_socbutton login_socbutton-fb"></a>
                </div>
            </section>

            <form class="login_section login_form form" @submit.prevent="onSubmit">
                <template v-if="globalErrors.length">
                    <div v-for="error in globalErrors" class="alert alert-danger form_alert" :key="error.code">{{error.message}}</div>
                </template>
                <ui-input class="textfield-block form_field"
                          v-validate="'required|email'"
                          :error="fields.email && fields.email.dirty && fields.email.touched ? errors.first('email') : ''"
                          name="email"
                          type="email"
                          v-model="data.email"
                          required
                          label="Эл. Почта"
                          placeholder="Введите почту"
                />
                <ui-input class="textfield-block form_field"
                          v-validate="'required|min:8'"
                          :error="fields.password && fields.password.dirty && fields.password.touched ? errors.first('password') : ''"
                          name="password"
                          v-model="data.password"
                          type="password"
                          required
                          label="Пароль"
                          placeholder="Введите пароль"
                />
                <blockquote v-if="fields">
                    {{fields}}
                </blockquote>
                <ui-input class="textfield-block form_field" name="name" v-model="data.name" required label="Имя" placeholder="Введите ваше имя" />
                <ui-input class="textfield-block form_field" name="surname" v-model="data.surname" required label="Фамилия" placeholder="Введите вашу фамилию" />

                <ui-button type="submit" color="primary" class="button-block form_button">Зарегистрироваться</ui-button>
            </form>

            <section class="login_section login_section-secondary">
                <p>Уже зарегистрированы?</p>
                <router-link :to="{name: 'signin'}" class="login_subbuton button button-small button-primary button-outline">Войти в аккаунт</router-link>
            </section>
        </main>
    </div>
</template>
<script>
  import UiInput from '../components/ui/UiInput'
  import UiButton from '../components/ui/UiButton'
  import authService from '../_services/auth.service'
  import Vue from 'vue'
  import VeeValidate, { Validator } from 'vee-validate'
  import dictionary from "../_validators/dictionary";

  Vue.use(VeeValidate);

  Validator.localize(dictionary);
  Validator.localize('kz');

  export default {
    components: {UiButton, UiInput},
    data() {
      return {
        data: {
          email: '',
          password: '',
          name: '',
          surname: '',
        },
        globalErrors: [],

      }
    },
    methods: {
      onSubmit() {
        authService.register(this.data).then(data => {
          console.log(data);
        })
      }
    }
  }
</script>
