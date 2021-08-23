import Vuelidate from 'vuelidate'
// import VuelidateErrorExtractor from 'vuelidate-error-extractor'

/* We need messages for validation */
// const messages = {
//   required: '{attribute} é obrigatório',
//   email: '{attribute} é inválido.',
//   minValue: '{attribute} deve ser maior que {min}'
// }

// const mapNames = {
//   email: 'E-mail',
//   name: 'Nome',
//   nome: 'Nome',
//   username: 'Usuário'
// }

export default ({
  Vue
}) => {
  Vue.use(Vuelidate)
  // Vue.use(VuelidateErrorExtractor, {
  //   messages,
  //   attributes: mapNames
  // })
}
