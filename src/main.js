// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
import App from './App'
import router from './router'
import VueCookies from 'vue-cookies'
import '@/mixins/general'
import "@/assets/css/global.css"
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapIcon from '@dvuckovic/vue-bootstrap-icons';

Vue.config.productionTip = false
Vue.use(VueChatScroll);
Vue.use(VueCookies);

// set default config
Vue.$cookies.config('7d');

Vue.component('BootstrapIcon', BootstrapIcon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
