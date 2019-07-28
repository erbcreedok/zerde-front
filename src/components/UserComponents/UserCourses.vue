<template>

<div class="courses" >
        <article class="qaCard" v-for="course in courses">
            <div class="qaCard_wrap">
                <span>{{course.course_name}}</span>
                <div class="caption">{{course.course_themes[0].name}}</div>
                <div class="description">
                    <div>
                        <span>Дата начала</span>
                        <span>{{$moment(course.started_date).format('DD.MM.YYYY')}}</span>
                    </div>
                    <div>
                        <span>Дата завершения</span>
                        <span>{{$moment(course.finished_date).format('DD.MM.YYYY')}}</span>
                    </div>
                    <div>
                        <span>Последняя активность</span>
                        <span>{{$moment(course.last_activity_date).startOf('hour').fromNow()}}</span>
                    </div>
                    <div>
                        <span>Оценка занятий</span>
                        <span>{{course.tests_result}}</span>
                    </div>
                    <div>
                        <span>Ср. результаты тестирований</span>
                        <span>{{course.avg_lessons_rate}}</span>
                    </div>
                </div>
                <article class="usercourse">
                    <div class="usercourse_controls">
                        <div class="course_progress">
                            <div class="circleProgress">
                                <div class="circleProgress_value">{{getPercentage(course.passed_lessons_count,course.total_lessons_count)}}</div>
                                <svg class="circleProgress_ring">
                                    <circle stroke="#EEEEEE"></circle>
                                    <circle stroke="#304ffe" class="circleProgress_circle"></circle>
                                </svg>
                            </div>
                            <div class="course_progress_stats">
                                <div class="course_progress_lessons">Пройдено {{course.passed_lessons_count}} из {{course.total_lessons_count}} занятий</div>
                                <div class="course_author_description">Заработано 32 из 125 очков</div>
                            </div>
                        </div>
                        <button class="button button-primary button-outline button-icon button-icon-checkmark button-icon-left">Занятия</button>
                    </div>
                </article>

            </div>
        </article>
    
    </div>
</template>
<script>
import axios from 'axios'
export default{
    props:['userId'],
    data(){
        return{
            courses:[]
        }   
    },
    created(){
        axios.get('http://academy-back.tk/api/statistics/users/courses/'+this.userId).then(
            response=>{
                this.courses=response.data.data
            }
        )
    },
    methods:{
        getPercentage(passed,total){
            return passed*100/total;
        }
    }
}
</script>
<style scoped>
.courses .qaCard {
    width: 50% !important;
}
</style>