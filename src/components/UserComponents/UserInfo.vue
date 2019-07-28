<template>
<div class="description">
        <div>
            <span>Телефон</span>
            <span>+{{user.phone}}</span>
        </div>
        <div>
            <span>Эл.почта</span>
            <span>{{user.email}}</span>
        </div>
        <div>
            <span>Социальные сети</span>
            <span >-</span>
        </div>
        <div>
            <span>Город</span>
            <span>Астана</span>
        </div>
        <div>
            <span>Дата рождения</span>
            <span>{{$moment(user.birth_date).format('DD.MM.YYYY')+' ('+ this.$moment().diff(user.birth_date,'years')+' год)'}}</span>
        </div>
        <div>
            <span>Дата регистрации</span>
            <span>{{$moment(user.registration_date).format('DD.MM.YYYY')}}</span>
        </div>
        <div>
            <span>Последняя активность</span>
            <span>{{$moment(user.last_seen).startOf('hour').fromNow()}}</span>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default{
    props:['userId'],
    data(){
        return{
            keys:[],
            user:{}
        }
    },
    methods:{
    },
    
    created(){
        axios.get('http://academy-back.tk/api/statistics/users/info/'+this.userId).then(
            response=>{
                this.user=response.data.data
                console.log('response is',response)
            }
        )
        /*       
        for(var k in JSON.parse(this.user.contacts)) this.keys.push(k);
        console.log(this.keys)
        */
    }
    
}
</script>
