import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading);

let loader;

function drawLoading(el, binding) {
  if (binding.value) {
    el.style.position = 'relative';
    loader = Vue.$loading.show({
      container: el,
    });
  } else if(loader) {
    el.style.position = '';
    loader.hide();
    setTimeout(loader.hide, 10);
  }
}

const VueLoadingDirective = {
  bind: drawLoading,
  update: drawLoading,
};

export default VueLoadingDirective;