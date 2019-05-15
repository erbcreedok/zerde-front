import Vue from 'vue';
import {capitalize, capitalizeEach} from "./capitalize";

Vue.filter('capitalize', capitalize);
Vue.filter('capitalizeEach', capitalizeEach);
