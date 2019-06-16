import store from '../store'
import i18nService from '../_services/i18n.service'

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