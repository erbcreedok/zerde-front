<template>
<div class="users page wrap">
        <div class="users-navigation">
            <div>
                <h1 class="title lesson_title">Пользователи</h1>
                <span>1324 пользователей</span>
            </div>
            <div class="users-navigation-search">
                <form class="user-search textfield textfield-block">
                    <input type="text" class="qa_search_field textfield_input" placeholder="" v-model="search">
                    <label class="textfield_label">Поиск по имени</label>
                    <button type="submit" class="textfield_button textfield_button-search"></button>
                </form>
                <!--
                <div class="select select-multiple select-inline" data-placeholder="Выберите фильтры" data-labels='[{"1": "опции", "2": "опций"}]'>
                        <button class="select_toggle button button-small button-icon button-icon-right button-icon-angle-down">
                            <div class="select_value">
                                <img src="../../assets/img/icons/filter.svg" alt="">
                                Фильтрация
                            </div>
                        </button>
                        <div class="select_wrap">
                            <ul class="select_list">
                                <li class="select_item">
                                    <label class="checkbox">
                                        <input type="checkbox" name="select" value="">
                                        <span class="checkbox_icon"></span>
                                        <span class="checkbox_label select_item_value">Название фильтра</span>
                                    </label>
                                </li>
                                <li class="select_item">
                                    <label class="checkbox">
                                        <input type="checkbox" name="select" value="">
                                        <span class="checkbox_icon"></span>
                                        <span class="checkbox_label select_item_value">Название фильтра</span>
                                    </label>
                                </li>
                                <li class="select_item">
                                    <label class="checkbox">
                                        <input type="checkbox" name="select" value="">
                                        <span class="checkbox_icon"></span>
                                        <span class="checkbox_label select_item_value">Название фильтра</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    -->
            </div>
        </div>

        <div class="comm_table users_table wrap">
            <div class="comm_table_row comm_table_row-heading">
                <div class="comm_table_col comm_table_col-title">Имя и фамилия</div>
                <div class="comm_table_col comm_table_col-rating">Уровень</div>
                <div class="comm_table_col comm_table_col-points">Баллы</div>
                <div class="comm_table_col comm_table_col-users">Регистрация</div>
                <div class="comm_table_col comm_table_col-users">Посл.активность</div>
            </div>

            <div class="comm_table_body">
                <div class="comm_table_row" v-for='(user,index) in users' :key='index'>
                    <div class="comm_table_col comm_table_col-title" @click="userDetails(user)" style="cursor:pointer">
                        <div>
                            <img :src="user.avatar_src" alt="" style="width:32px;height:32px;">
                            <span>{{user.firstname}} {{user.surname}}</span>
                        </div>
                    </div>
                    <div class="comm_table_col comm_table_col-rating">
                        <button class="button button-primary button-outline">5</button>
                        <div class="rating-block">
                            <span class="blogcard_category">Простой</span>
                            <div class="comm_table_col comm_table_col-rating">
                                <div class="progressBar">
                                    <div style="width: 74%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="comm_table_col comm_table_col-points">
                        <div>
                            <div class="points profile_activity_points">{{user.achievement_points}}</div>
                        </div>
                    </div>
                    <div class="comm_table_col comm_table_col-users">{{$moment(user.registration_date).format('Do MMMM YYYY')}}</div>
                    <div class="comm_table_col comm_table_col-users">{{$moment(user.last_seen).startOf('hour').fromNow()}}</div>
                </div>



            </div>
        </div>

	</div>

</template>
<script>
import axios from 'axios';
export default{
    data(){
        return{
            search:'',
            users:[]
        }
    },
    created(){
        axios.get('http://academy-back.tk/api/statistics/users/index').then(response=>{
            this.users=response.data.data.data   
        }

        )
    },
    watch:{
        search:function (val){
            axios.get('http://academy-back.tk/api/statistics/users/index?search='+val).then(response=>{
                this.users=response.data.data.data   
                console.log("searching",response)
            })
        }
    },
    methods:{
        userDetails(user){
            this.$router.push({name:'userDetail',params:{userId:user.id}})
        }
    }
}
</script>
