import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
import Login from '@/components/Login'
import Chat from '@/components/Chat'
import PrivateChatLogin from '@/components/PrivateChatLogin'
import PrivateChat from '@/components/PrivateChat'

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
      path: '/chat/:channel',
      name: 'Chat',
      component: Chat,
      props: true,
      beforeEnter: (to, from, next) => {
        var user = $cookies.get('user');
        next();
        if (to.params.name || (user != 'undefined' && user != null)) {
          next();
        } else {
          next({name: "Login"});
        }
      }
    },
    {
      path: '/:action/private-chat/',
      name: 'PrivateChatLogin',
      component: PrivateChatLogin,
      beforeEnter: (to, from, next) => {
        var user = $cookies.get('user');
        next();
        if (to.params.name || (user != 'undefined' && user != null)) {
          next();
        } else {
          next({name: "Login"});
        }
      }
    },
    {
      path: '/private-chat/:channel',
      name: 'PrivateChat',
      component: PrivateChat,
      beforeEnter: (to, from, next) => {
        var user = $cookies.get('user');
        next();
        if (to.params.name || (user != 'undefined' && user != null)) {
          next();
        } else {
          next({name: "Login"});
        }
      }
    },
  ]
})
