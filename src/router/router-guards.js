import Vue from 'vue'
import store from '../store'
import i18nService from '../_services/i18n.service'
import {USER} from '../_types/store-types'
import {capitalize} from '../_filters/capitalize'

export const requireAuth = (to, from, next)  => {
  if (store.state.auth.authorized) {
    next()
  } else {
    console.log(from);
    next({name: 'signin', query: {from: to.name}})
  }
};

export const unrequireAuth = (to, from, next) => {
  if (store.state.auth.authorized) {
    next(from ? from : {name: 'home'})
  } else {
    next()
  }
};

export const checkLocale = (to, from, next) => {
  if (i18nService.isLocaleValid(to.params.locale)) {
    next();
  } else {
    next({...to, params: {...to.params, locale: i18nService.getCurrentLocale()}});
  }
};

export const requireOwnAuth = (to, from, next) => {
  console.log({to, from, next},store.getters[USER + 'getUserId']);
  if (to.params.userId+'' === store.getters[USER + 'getUserId']+'') {
    next();
  } else {
    if (!from.name) {
      next({name: 'home'});
    }
    Vue.prototype.$notyf.error({
      message: capitalize(Vue.prototype.$t('not enough rights'))
    });
  }
}