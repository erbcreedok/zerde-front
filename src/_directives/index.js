import Vue from "vue";
import {VueMaskDirective} from "v-mask";
import ClickOutside from "vue-click-outside";
import VueLoadingDirective from "./v-loading";

Vue.directive('mask', VueMaskDirective);
Vue.directive('click-outside', ClickOutside);
Vue.directive('loading', VueLoadingDirective);
