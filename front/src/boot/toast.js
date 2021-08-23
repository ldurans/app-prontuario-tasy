import VueIziToast from 'vue-izitoast'

import 'izitoast/dist/css/iziToast.min.css'

const iziOptions = {
  timeout: 2500,
  close: true,
  position: 'topRight',
  maxWidth: '400px',
  balloon: true

  // overlay: true,
}

export default ({ Vue }) => {
  Vue.use(VueIziToast, iziOptions)
}
