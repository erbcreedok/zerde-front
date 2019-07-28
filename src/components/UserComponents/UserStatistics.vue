<template>
    <div>
    <div class="statistic-graph">
        <article class="qaCard">
            <div class="qaCard_wrap">
                <a href="javascript:void(0)" class="qaCard_title">Активность</a>
            <div v-for="(act,index) in active" :key="index"> Дата:{{act.date}} ,осталось(achievments) {{act.achieve}}</div>
            </div>
        </article>
    </div>

    <div class="statistic">
        <article class="qaCard">
            <div class="qaCard_wrap">
                <a href="javascript:void(0)" class="qaCard_title">Часов проведено в системе</a>
                <span>{{user.user.progress_in_system}}</span>
            </div>
        </article>
        <article class="qaCard">
            <div class="qaCard_wrap">
                <a href="javascript:void(0)" class="qaCard_title">Средняя оценка занятий</a>
                <span>{{parseInt(user.external_statistics.lessons_rate_avg)}} %</span>
            </div>
        </article>
        <article class="qaCard">
            <div class="qaCard_wrap">
                <a href="javascript:void(0)" class="qaCard_title">Начато курсов</a>
                <span>{{user.external_statistics.started_courses_count}}</span>
            </div>
        </article>
        <article class="qaCard">
            <div class="qaCard_wrap">
                <a href="javascript:void(0)" class="qaCard_title">Завершено курсов</a>
                <span>{{user.external_statistics.finished_courses_count}}</span>
            </div>
        </article>
        <article class="qaCard">
            <div class="qaCard_wrap">
                <a href="javascript:void(0)" class="qaCard_title">Просмотры статей и видео</a>
                <span>{{user.external_statistics.articles_views_count}}</span>
            </div>
        </article>
        <article class="qaCard" style="opacity: 0;">

        </article>
    </div>
</div>
</template>
<script>
function userActive (date,achieve) {
    this.date = date;
    this.achieve = achieve;
}
import axios from 'axios'
export default{
    props:['userId'],
    data(){
        return{
            user:{},
            active:[]
        }   
    },
    created(){
        axios.get('http://academy-back.tk/api/statistics/users/statistics/'+this.userId).then(
            response=>{
                this.user=response.data.data
                for(var i in this.user.external_statistics.user_actions){
                    this.active.push(new userActive(i,this.user.external_statistics.user_actions[i]))
                }            
            }
        )
        
                
    },
    methods:{
        
    },
    computed :{
        
    }
}
</script>
