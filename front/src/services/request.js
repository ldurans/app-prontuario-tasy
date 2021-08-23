import axios from 'axios'
import {
  Notify
} from 'quasar'
import Router from '../router/index'
import loading from '../utils/loading'
import store from '../store/index'

const service = axios.create({
  baseURL: process.env.API,
  timeout: 200000
})
service.interceptors.request.use(
  config => {
    loading.show(config)
    let token = store().state.usuario.token
    if (token) {
      config.headers.Authorization = 'JWT ' + token
    }
    return config
  },
  error => {
    loading.hide()

    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    loading.hide()
    const res = response
    const status = res.status
    if (status.toString().substr(0, 1) !== '2') {
      Notify.create({
        message: 'Retornou algum erro.'
      })
      return Promise.reject('error')
    } else {
      return response
    }
  },
  error => {
    loading.hide()
    if (error.response && error.response.status === 401) {
      // removeToken()
      Notify.create({
        color: 'warning',
        message: 'Necessário realizar novo login.'
      })
      store().commit('RESET_TOKEN')
      store().commit('RESET_USUARIO_TASY')
      setTimeout(() => {
        Router.push({
          name: 'login'
        })
      }, 1000)
    } else if (error.response && error.response.status === 500) {
      Notify.create({
        message: 'Ocorreu um erro no sistema. Atualize a página.',
        position: 'bottom-right'
      })
    } else if (error.message.indexOf('timeout') > -1) {
      Notify.create({
        message: 'Esperamos muito tempo por uma resposta. Tente novamente.',
        position: 'bottom-right'
      })
    } else {
      // Notify.create({
      //   message: 'Ocorreu algum erro de rede.',
      //   position: 'bottom-right'
      // })
    }
    return Promise.reject(error.response)
  }
)

export default service
