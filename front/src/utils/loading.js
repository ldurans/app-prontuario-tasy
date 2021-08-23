import {
  Loading,
  QSpinnerBars,
  QSpinnerPuff
} from 'quasar'

let loading = {}
let lastRequest = new Date()

loading.show = function (config) {
  // if (config && config.loading) {
  let now = new Date()
  let ms = now - lastRequest
  lastRequest = now
  if (ms > 2000) {
    if (config.loading === 'gears') {
      Loading.show({
        spinner: QSpinnerBars,
        message: '',
        messageColor: 'white',
        spinnerSize: 100,
        spinnerColor: 'white',
        customClass: ''
      })
    } else if (config.loading === 'hourglass') {
      Loading.show({
        spinner: QSpinnerBars,
        message: '',
        messageColor: 'white',
        spinnerSize: 100,
        spinnerColor: 'white',
        customClass: ''
      })
    } else {
      Loading.show({
        spinner: QSpinnerPuff,
        message: 'Estamos trabalhando...',
        messageColor: 'white',
        spinnerSize: 150,
        spinnerColor: 'white',
        customClass: ''
      })
    }
  }
  // }
}

loading.hide = function () {
  setTimeout(() => {
    Loading.hide()
    Loading.isActive = false
  }, 1000)
}

export default loading
