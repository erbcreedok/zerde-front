<template>
    <div class="page wrap">
        <main class="login_wrap">
            <section class="login_section login_section-secondary">
                Войти через
                <a href="#" class="login_socbutton login_socbutton-vk"></a>
                <a href="#" class="login_socbutton login_socbutton-fb"></a>
            </section>

            <form class="login_section login_form form">
                <div class="textfield textfield-block form_field">
                    <input type="text" class="textfield_input" placeholder=" ">
                    <div class="textfield_label">Эл. почта</div>
                </div>

                <div class="textfield textfield-block form_field">
                    <input type="password" class="textfield_input" placeholder=" ">
                    <div class="textfield_label">Пароль</div>
                </div>

                <button type="submit" class="button button-primary button-block form_button">Войти</button>

                <div class="form_sublinks"><router-link :to="{name: 'forgot-password'}">Восстановить пароль</router-link></div>
            </form>

            <section class="login_section login_section-secondary">
                <p>Еще не зарегистрированы?</p>
                <router-link :to="{name: 'signup'}" class="login_subbuton button button-small button-primary button-outline">Создать аккаунт</router-link>
            </section>
        </main>
    </div>
</template>
