<template>
  <div class="index bg-rdsl-blue">
    <div id="indexLizi"></div>
    <div class="row justify-center self-center items-center text-white">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-img
              src="statics/logo.png"
              :ratio="16/9"
              style="height: 280px; max-width: 300px"
            />
          </div>
        </div>
        <div class="row justify-center self-center items-center text-white">
          <div
            class="col-6 justify-center"
            style="width:400px"
          >
            <div
              style="text-align:left"
              class="q-ma-md"
            >
              <q-input
                hide-bottom-space
                outlined
                bg-color="white"
                class="q-mb-md text-white"
                clearable
                v-model="form.username"
                label="Usuário"
                error-message="Informar usuário"
                :error="$v.form.username.$error"
                @blur="$v.form.username.$touch"
                :icon="{name: 'account_circle', size: '3rem'}"
              >
              </q-input>

              <q-input
                hide-bottom-space
                outlined
                label="Senha"
                bg-color="white"
                v-model="form.password"
                :error="$v.form.password.$error"
                error-message="Senha deve ser informada"
                @blur="$v.form.password.$touch"
                @keyup.enter="realizarLogin"
                :type="isPwd ? 'password' : 'text'"
                :icon="{name: 'vpn_key', size: '3rem'}"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </div>
        <div class="row q-mt-md justify-center">
          <div class="col-xs-6 col-sm-4 col-md-2">
            <q-btn
              class="full-width text-bold q-pa-xs bg-padrao"
              flat
              color="primary"
              ripple
              rounded
              dark-percentage
              :loading="loading"
              @click="realizarLogin"
            >
              Login
              <span slot="loading">
                <q-spinner-puff class="on-left" />Loading...
              </span>
            </q-btn>
          </div>
        </div>
      </div>
    </div>

    <div class="row absolute-bottom-right q-ma-md">
      <div class="col">
        <q-btn
          id="btnInstallAplication"
          color="positive"
          class="text-bold shadow-5 no-border-radius btnInstallAplicationClass"
          icon="mdi-monitor-cellphone-star"
          label="Instalar"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
// import { removeToken } from '../libs/auth'

export default {
  data () {
    return {
      form: {
        username: null,
        password: null
      },
      isPwd: true,
      loading: false
    }
  },
  validations: {
    form: {
      username: { required },
      password: { required }
    }
  },
  methods: {
    realizarLogin () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toast.error('<p>Informe usuário e senha.</p>', 'Ops!! Algo errado.')
        return
      }
      this.loading = true
      this.$store.dispatch('UserLogin', this.form)
        .then(res => {
          this.loading = false
          this.$router.push({ name: 'lista-setores' })
        })
        .catch(err => {
          this.loading = false
          if (err.data.non_field_errors) {
            this.$toast.error(`Usuário ou senha incorretos.`, 'Algo deu errado.', { timeout: 5000, messageSize: 16 })
            return
          }
          this.$toast.error(`${JSON.stringify(err.data)}`, 'Algo deu errado.', { timeout: 3000 })
        })
    },
    clear () {
      this.form.username = ''
      this.form.password = ''
      // this.$v.form.$reset()
    }
  },
  computed: {},
  mounted () {
    this.$toast.info('<p>Utilize sua credencial de Rede/Windows</p>', 'Lembre!', {
      messageSize: 16, timeout: 5000
    })
  }
}
</script>
<style lang="sass" scoped>
#login-app
  background: none

.btnInstallAplicationClass
  display: none

.index
  /* background: #00897b; */
  width: 100%
  position: absolute
  top: 0
  bottom: 0
  left: 0
  text-align: center
  background-repeat: no-repeat
  background-size: cover
  overflow: hidden
  & h1
    height: 150px

  & h1 img
    height: 100%

  & h2
    color: #666
    margin-bottom: 200px

  & h2 p
    margin: 0 0 50px

  & .ivu-row-flex
    height: 100%
</style>
