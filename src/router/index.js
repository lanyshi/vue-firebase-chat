import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Chat from '@/views/Chat'

Vue.use(Router)

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
        if (to.params.name) {
          next();
        } else {
          next({name: "Login"})
        }
      }
    }
  ]
})
