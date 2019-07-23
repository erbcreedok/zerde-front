import Vue from "vue";
import {LS_LOCALE} from "../_types";
import {defaultLocale, locales} from "../_configs/i18n";
import {Validator} from "vee-validate";
import _validators from "../_dictionaries/_validators";
import 'moment/locale/kk';
import 'moment/locale/ru';
import client from '../_api'

Validator.localize(_validators);

const i18nService = {
  getCurrentLocale() {
    const locale = localStorage.getItem(LS_LOCALE) ? localStorage.getItem(LS_LOCALE) : defaultLocale;
    return this.isLocaleValid(locale) ? locale : defaultLocale;
  },
  isLocaleValid(locale) {
    return !!locales.find(l => l.code === locale);
  },
  setCurrentLocale(locale) {
    if (!this.isLocaleValid(locale)) return false;
    Vue.i18n.set(locale);
    Validator.localize(_validators);
    Validator.localize(locale);
    localStorage.setItem(LS_LOCALE, locale);
    client.defaults.headers['X-Localization'] = locale;
  }
};

export default i18nService;
