import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
// import Util from '../utils/util'
import initRoutes from './routes'

import Prontuario from '../pages/prontuario/router'
import Setores from '../pages/setores/routes'

const routes = [...initRoutes, Prontuario, Setores]

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

const Router = new VueRouter({
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  // Leave these as is and change from quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  routes
})

const whiteList = ['/login', '/403', '/404'] // 设置白名单，避免死循环

// function hasPermission (router, accessMenu) {
//   if (whiteList.indexOf(router.path) !== -1) {
//     return true
//   }
//   let menu = Util.getMenuByName(router.name, accessMenu)
//   if (menu.name) {
//     return true
//   }
//   // return false
//   return true
// }

Router.beforeEach(async (to, from, next) => {
  let token = store().state.usuario.token
  if (token) {
    let usuario = store().state.usuario.usuarioTasy
    if (!usuario.NM_USUARIO) {
      if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
      } else {
        next({
          name: 'login',
          replace: true
        })
      }
    } else {
      if (to.path === '/login') {
        next({
          name: 'lista-setores'
        })
      } else {
        if (to.path === '/') {
          next({
            name: 'lista-setores',
            replace: true
          })
        } else {
          next()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next({
        name: 'login',
        replace: true
      })
    }
  }
  // let menu = Util.getMenuByName(to.name, store.getters.accessMenu)
  // Util.title(menu.title)
})

// Router.beforeEach((to, from, next) => {
//   let token = store().state.usuario.token
//   if (token) {
//     if (to.path === '/login') {
//       next({
//         name: 'setores'
//       })
//     } else {
//       next()
//     }
//   } else {
//     if (to.path !== '/login') {
//       next({
//         name: 'login'
//       })
//     } else {
//       next()
//     }
//   }
// })

Router.afterEach((to) => {
  window.scrollTo(0, 0)
})

export default Router
