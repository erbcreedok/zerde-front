import Vue from "vue";
import {LS_LOCALE} from "../_types";
import {defaultLocale, locales} from "../_configs/i18n";

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
    localStorage.setItem(LS_LOCALE, locale);
  }
};

export default i18nService;
