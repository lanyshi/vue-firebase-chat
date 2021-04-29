import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
import Login from '@/views/Login'
import Chat from '@/views/Chat'

Vue.use(Router)
Vue.use(VueCookies);

// set default config
Vue.$cookies.config('7d');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.name || $cookies.get('user') != 'undefined') {
          console.log($cookies.get('user'));
          next();
        } else {
          next({name: "Login"})
        }
      }
    }
  ]
})
