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
                <div class="alert alert-danger form_alert">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, esse.</div>

                <div class="textfield textfield-required textfield-block form_field">
                    <input type="text" class="textfield_input" placeholder=" ">
                    <div class="textfield_label">Эл. почта</div>
                </div>

                <div class="textfield textfield-required textfield-block form_field">
                    <input type="password" class="textfield_input" placeholder=" ">
                    <div class="textfield_label">Пароль</div>
                </div>

                <div class="textfield textfield-required textfield-block form_field">
                    <input type="text" class="textfield_input" placeholder=" ">
                    <div class="textfield_label">Имя</div>
                </div>

                <div class="textfield textfield-required textfield-block form_field">
                    <input type="text" class="textfield_input" placeholder=" ">
                    <div class="textfield_label">Фамилия</div>
                </div>

                <button type="submit" class="button button-primary button-block form_button">Зарегистрироваться</button>
            </form>

            <section class="login_section login_section-secondary">
                <p>Уже зарегистрированы?</p>
                <router-link :to="{name: 'signin'}" class="login_subbuton button button-small button-primary button-outline">Войти в аккаунт</router-link>
            </section>
        </main>
    </div>
</template>
