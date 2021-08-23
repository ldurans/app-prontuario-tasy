import VueScrollTo from 'vue-scrollto'

const config = {
  duration: 1000,
  easing: 'ease',
  offset: -150,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
}

export default ({
  Vue
}) => {
  Vue.use(VueScrollTo, config)
}
