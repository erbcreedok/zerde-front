import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { VueMaskDirective } from 'v-mask'
import './assets/css/main.css'
import './_directives/v-loading'
import VueLoadingDirective from './_directives/v-loading'
import ClickOutside from 'vue-click-outside'

Vue.config.productionTip = false;

Vue.directive('mask', VueMaskDirective);
Vue.directive('click-outside', ClickOutside);
Vue.directive('loading', VueLoadingDirective);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
