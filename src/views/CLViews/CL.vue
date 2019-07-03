<template>
    <div class="page wrap">
        <h1 class="title courses_title">Бесплатные онлайн-курсы</h1>

        <main class="courses_grid">
            <article class="coursecard" v-for="course in courses" :key="course.id">
                <div class="coursecard_cover">
                    <img :src="course.img_preview" alt="">
                </div>

                <div class="coursecard_content">
                    <a href="#" class="coursecard_title">{{course.title}}</a>

                    <ul class="coursecard_details">
                        <li class="coursecard_detail coursecard_detail-icon coursecard_detail-lessons">{{course.lessons_amount}} занятий</li>
                        <li class="coursecard_detail coursecard_detail-icon coursecard_detail-users">132</li>
                        <li class="coursecard_detail">
                            <div class="coursecard_author user">
                                <div class="user_photo avatar"><img src="https://thispersondoesnotexist.com/image" alt=""></div>
                                <div class="user_name">Жанибек Сарсембаев</div>
                            </div>
                        </li>
                    </ul>

                    <div class="coursecard_brief">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>

                    <div class="coursecard_controls">
                        <a href="#" class="button button-primary">Начать</a>
                        <a href="#" class="button button-outline">Подробнее</a>
                    </div>

                    <div class="coursecard_progress">Ваш прогресс: 0%</div>
                </div>
            </article>

            <article class="coursecard">
                <div class="coursecard_cover">
                    <img src="https://thispersondoesnotexist.com/image" alt="">
                </div>

                <div class="coursecard_content">
                    <a href="#" class="coursecard_title">Как открыть свой цех, занимаясь рукоделием</a>

                    <ul class="coursecard_details">
                        <li class="coursecard_detail coursecard_detail-icon coursecard_detail-lessons">8 занятий</li>
                        <li class="coursecard_detail coursecard_detail-icon coursecard_detail-users">132</li>
                        <li class="coursecard_detail">
                            <div class="coursecard_author user">
                                <div class="user_photo avatar"><img src="https://thispersondoesnotexist.com/image" alt=""></div>
                                <div class="user_name">Жанибек Сарсембаев</div>
                            </div>
                        </li>
                    </ul>

                    <div class="coursecard_brief"></div>

                    <div class="coursecard_controls">
                        <a href="#" class="button button-primary">Начать</a>
                        <a href="#" class="button button-outline">Подробнее</a>
                    </div>

                    <div class="coursecard_progress">Ваш прогресс: 0%</div>
                </div>
            </article>
        </main>
    </div>
</template>

<script>
    import clService from "../../_services/cl.service";

    export default {
      data() {
        return {
          requestStatus: 'clean',
          courses: [],
        }
      },
      methods: {
        loadCourses() {
          this.requestStatus = 'loading';
          clService.loadCourses().then(({courses}) => {
            this.courses = courses;
            this.requestStatus = 'success';
          });
        },
      },
      mounted() {
        this.loadCourses();
      }
    }
</script>
