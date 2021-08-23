import { register } from 'register-service-worker'
import { Notify } from 'quasar'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready () {
  },

  registered (registration) {
  },

  cached (registration) {
  },

  updatefound (registration) {
  },

  updated (registration) {
    Notify.create({
      color: 'green',
      textColor: 'white',
      message: `Existe uma nova versão!`,
      icon: 'cloud_download',
      position: 'center',
      timeout: 5000,
      actions: [{
        label: 'Aualizar',
        icon: 'refresh',
        color: 'white',
        handler: async () => {
          console.error('Registration', registration) // eslint-disable-line no-console
          registration.waiting.postMessage({ type: 'SKIP_WAITING' })
          await registration.update()
          window.location = '/'
          window.location.reload(true)
        }
      }]
      // onDismiss: () => {
      //   location.reload(true)
      // }
    })
  },

  offline () {
    Notify.create({
      color: 'orange',
      textColor: 'white',
      message: `Sem conexão com a internet. ${process.env.APP_NAME} irá tentar funcionar no modo Offline.`,
      icon: 'cloud_off',
      position: 'center',
      timeout: 2500
    })
  },

  error () {

  }
})
