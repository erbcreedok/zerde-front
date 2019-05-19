import Vue from 'vue';
import store from '../store';
import vuexI18n from 'vuex-i18n';
import {locales} from "../_configs/i18n";
import i18nService from "../_services/i18n.service";
import vueMoment from 'vue-moment';
import moment from 'moment';


Vue.use(vuexI18n.plugin, store);

locales.forEach(locale => {
  Vue.i18n.add(locale.code, locale.dictionary);
});

Vue.i18n.set(i18nService.getCurrentLocale());

Vue.use(vueMoment, {moment});
