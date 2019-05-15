import Vue from 'vue'
import Router from 'vue-router'
import routes from "./routes";
import {checkLocale} from "./router-guards";
import Localizer from "../components/Localizer";
import i18nService from "../_services/i18n.service";

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: `/${i18nService.getCurrentLocale()}`,
    },
    {
      path: '/:locale',
      component: Localizer,
      beforeEnter: checkLocale,
      children: [...routes]
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {selector: to.hash, offset: {x:0, y: 150}}
    }
    return { x: 0, y: 0 };
  }
});

export default router;
