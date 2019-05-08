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

            <form class="login_section login_form form">
                <template v-if="errors.length">
                    <div v-for="error in errors" class="alert alert-danger form_alert" :key="error.code">{{error.message}}</div>
                </template>

                <ui-input class="textfield-block form_field" name="email" v-model="email" required label="Эл. Почта" placeholder="Введите почту" />
                <ui-input class="textfield-block form_field" name="password" v-model="password" type="password" required label="Пароль" placeholder="Введите пароль" />
                <ui-input class="textfield-block form_field" name="name" v-model="name" required label="Имя" placeholder="Введите ваше имя" />
                <ui-input class="textfield-block form_field" name="surname" v-model="surname" required label="Фамилия" placeholder="Введите вашу фамилию" />

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
  export default {
    components: {UiButton, UiInput},
    data() {
      return {
        email: '',
        password: '',
        name: '',
        surname: '',
        errors: [
        ],
      }
    }
  }
</script>