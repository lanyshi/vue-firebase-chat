import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
import Login from '@/components/Login'
import Chat from '@/components/Chat'

Vue.use(Router)
Vue.use(VueCookies);

// set default config
Vue.$cookies.config('7d');
if(!$cookies.get('cookieAccepted')) {
  $cookies.remove('user');
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/chat/:channel',
      name: 'Chat',
      component: Chat,
      props: true,
      beforeEnter: (to, from, next) => {
        var user = $cookies.get('user');
        if (to.params.name || (user != 'undefined' && user != null)) {
          next();
        } else {
          next({name: "Login"});
        }
      }
    }
  ]
})
