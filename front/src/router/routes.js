const routes = []
const loginRouter = {
  path: '/login',
  name: 'login',
  component: () => import('pages/Login')
}

routes.push(loginRouter)

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
