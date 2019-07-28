
<template>
<div class="users-details page wrap">
    <router-link :to="{path:'us'}">
    <button class="button button-outline backUsers" >
        <img src="../../assets/img/icons/arrow-left.svg" alt="">
        Пользователи
    </button>
    </router-link>

    <div class="users-info">
        <div class="users-info-block d-flex">
            <img :src="user.avatar_src" alt="">
            <div class="text">
                <span class="profile_name">{{user.firstname}} {{user.surname}}</span>
                <div>
                    <div>
                        <div class="points profile_activity_points">{{user.achievement_points}}</div>
                    </div>
                    <div class="level-block">
                        <button class="button button-outline button-primary">5</button>
                        <div class="type">
                            <span class="blogcard_category">Прокрастинатор</span>
                            <div class="comm_table_col comm_table_col-rating">
                                <div class="progressBar">
                                    <div style="width: 74%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="users-buttons">
            <button class="button button-outline">
                <img src="../../assets/img/icons/settings.svg" alt="">
                Настройки
            </button>
            <button class="button button-danger">
                <img src="../../assets/img/icons/multiply-white.svg" alt="" style="width:17px;">
                Деактивировать
            </button>
        </div>
    </div>

    <section class="users-tabs tabs">
        <div class="tabs_list">
            <a href="javascript:void(0)" @click='page="user_info"'  :class="page=='user_info' ? 'tabs_item tabs_item-active' : 'tabs_item'">Данные</a>
            <a href="javascript:void(0)"  @click='page="statistcs"' :class="page=='statistcs' ? 'tabs_item tabs_item-active' : 'tabs_item'">Статистика</a>
            <a href="javascript:void(0)"  @click='page="courses"' :class="page=='courses' ? 'tabs_item tabs_item-active' : 'tabs_item'">
                Курсы
                <span class="tabs_counter">{{courseCount}}</span>
            </a>
            <a href="#" class="tabs_item">
                Комментарии
                <span class="tabs_counter">3</span>
            </a>
            <a href="#" class="tabs_item">
                Значки
                <span class="tabs_counter">3</span>
            </a>
        </div>
    </section>
    <keep-alive>
    <user-info v-if="page=='user_info'" :userId='user.id'></user-info>
    <user-statistics v-if="page=='statistcs'" :userId='user.id'></user-statistics>
    <user-courses v-if="page=='courses'" :userId='user.id'></user-courses>
    </keep-alive>
</div>
</template>
<script>
import UserInfo from '../../components/UserComponents/UserInfo'
import UserStatistics from '../../components/UserComponents/UserStatistics'
import UserCourses from '../../components/UserComponents/UserCourses'
import axios from 'axios';
export default{
    data(){
        return {
            page:'user_info',
            userId:null,
            user:null,
            courseCount:0
        }
    },
    created(){
        this.userId=this.$route.params.userId
        console.log('user id is',this.userId)
        
        axios.get('http://academy-back.tk/api/statistics/users/info/'+this.userId).then(
            response=>{
                this.user=response.data.data
                console.log('response is',response)
            }
        )
        axios.get('http://academy-back.tk/api/statistics/users/courses/'+this.userId).then(
            response=>{
                this.courseCount=Object.keys(response.data.data).length
                
            }
        )
        
        //console.log('xaxa',this.$route.params.userDetail)
    },
    components:{
        'user-info':UserInfo,
        'user-statistics':UserStatistics,
        'user-courses':UserCourses
    }
}
</script>
