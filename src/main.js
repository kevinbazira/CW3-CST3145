import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';

/*
Be sure to use VeeValidate 2.1.5
Source: https://github.com/logaretm/vee-validate/issues/2234#issuecomment-524634867
*/
Vue.use(VeeValidate);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
