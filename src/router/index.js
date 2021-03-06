import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Chat from '@/components/Chat'
import PrivateChatLogin from '@/components/PrivateChatLogin'
import PrivateChat from '@/components/PrivateChat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/public-chat/:channel',
      name: 'Chat',
      component: Chat,
      props: true,
      beforeEnter: (to, from, next) => {
        var user = $cookies.get('users').names[$cookies.get('users').names.length - 1];
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
        var user = $cookies.get('users').names[$cookies.get('users').names.length - 1];
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
        var user = $cookies.get('users').names[$cookies.get('users').names.length - 1];
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
