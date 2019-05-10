import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading);

let loader;

const VueLoadingDirective = {
  update(el, binding) {
    if (binding.value) {
      loader = Vue.$loading.show({
        container: el,
      });
    } else if(loader) {
      loader.hide();
    }
  }
};

export default VueLoadingDirective;