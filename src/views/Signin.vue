<template>
    <div class="page wrap">
        <main class="login_wrap">
            <section class="login_section login_section-secondary" v-html="$t('sign by', {links})">
            </section>

            <form class="login_section login_form form" @submit.prevent="onSubmit" v-loading="status === 'loading'">

                <template v-if="errors.length">
                    <div v-for="(error, i) in errors" class="alert alert-danger form_alert" :key="error.status + ' ' + i">{{error.message}}</div>
                </template>

                <ui-input class="textfield-block form_field" name="email" :label="capitalize($t('email'))" :placeholder="capitalize($t('enter email'))" v-model="data.email"/>

                <!--<ui-input class="textfield-block form_field" name="phone" label="Телефон" placeholder="Введите номер телефона" v-model="data.phone" mask="+7(7##)###-##-##"/>-->

                <ui-input class="textfield-block form_field" name="password" :label="capitalize($t('password'))" :placeholder="capitalize($t('enter password'))"  type="password" v-model="data.password"/>

                <ui-button type="submit" color="primary" class="button-block form_button" :disabled="status === 'loading'">{{'signin' | translate | capitalize }}</ui-button>

                <div class="form_sublinks"><router-link :to="{name: 'forgot-password'}">{{'restore password' | translate | capitalize }}</router-link></div>
            </form>

            <section class="login_section login_section-secondary">
                <p>{{'don\'t have an account?' | translate | capitalize }}</p>
                <router-link :to="{name: 'signup'}" class="login_subbuton button button-small button-primary button-outline">{{'create account' | translate | capitalize }}</router-link>
            </section>
        </main>
    </div>
</template>
<script>
  import UiButton from '../components/ui/UiButton'
  import UiInput from '../components/ui/UiInput'
  import authService from '../_services/auth.service'
  import 'vue-loading-overlay/dist/vue-loading.css'
  import {capitalize} from "../_filters/capitalize";

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
        links: `<a href="#" class="login_socbutton login_socbutton-vk"></a><a href="#" class="login_socbutton login_socbutton-fb"></a>`,
      }
    },
    methods: {
      capitalize,
      onSubmit() {
        this.status = 'loading';
        authService.login(this.data.email, this.data.password)
          .then(() => {
            this.status = 'success';
            this.errors = [];
            this.$router.push({name: 'home'});
          })
          .catch(err => {
            this.status = 'error';
            this.errors = err;
          })
      }
    }
  }
</script>
