import {
  Login
} from '../../services/login'
// import * as token from '../../utils/auth'

const usuario = {
  state: {
    token: '',
    usuarioTasy: {
      NM_USUARIO: null,
      DS_USUARIO: null,
      CD_PESSOA_FISICA: null,
      CD_FUNCAO: null,
      IE_PROFISSIONAL: null,
      DS_LOGIN: null,
      NR_CRM: null,
      NM_PESSOA_FISICA: null,
      NM_GUERRA: null,
      UF_CRM: null
    },
    resetUsuarioTasy: {
      NM_USUARIO: null,
      DS_USUARIO: null,
      CD_PESSOA_FISICA: null,
      CD_FUNCAO: null,
      IE_PROFISSIONAL: null,
      DS_LOGIN: null,
      NR_CRM: null,
      NM_PESSOA_FISICA: null,
      NM_GUERRA: null,
      UF_CRM: null
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    RESET_TOKEN (state) {
      state.token = null
    },
    SET_USUARIO_TASY (state, usuarioTasy) {
      state.usuarioTasy = usuarioTasy
    },
    RESET_USUARIO_TASY (state) {
      state.usuarioTasy = state.resetUsuarioTasy
    }
  },
  actions: {
    UserLogin ({
      commit,
      dispatch
    }, login) {
      const username = login.username.trim()
      return new Promise((resolve, reject) => {
        const data = {
          username,
          password: login.password
        }
        Login(data)
          .then(res => {
            commit('SET_TOKEN', res.data.token)
            commit('SET_USUARIO_TASY', res.data.usuario_tasy)
            return resolve()
          })
          .catch(err => reject(err))
      })
    },
    UserLogout ({
      commit
    }, state) {
      return new Promise((resolve, reject) => {
        commit('RESET_TOKEN')
        commit('RESET_USUARIO_TASY')
        this.$router.push({
          name: 'login'
        })
        resolve()
      })
    }
  }
}

export default usuario
