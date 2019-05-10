import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueMaskDirective } from 'v-mask'
import './assets/css/main.css'
import './_directives/v-loading'
import VueLoadingDirective from './_directives/v-loading'

Vue.config.productionTip = false;

Vue.directive('mask', VueMaskDirective);
Vue.directive('loading', VueLoadingDirective);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
