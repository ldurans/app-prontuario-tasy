<template>
  <q-layout view="hHh LpR fFf">
    <q-header
      elevated
      bordered
      class="print-hide bg-rdsl-blue text-white"
    >
      <q-toolbar class="text-bold">
        <q-btn
          v-if="$q.screen.lt.md"
          flat
          @click="menuBurguer"
          round
          dense
          icon="menu"
        />
        <q-toolbar-title>
          <b>UDI</b> Hospital
        </q-toolbar-title>
        <q-space />
        <div> {{ cUsuario.NM_USUARIO }} </div>
        <div>
          <q-btn
            class="q-ml-md bg-padrao"
            round
            flat
            dense
            icon="exit_to_app"
            color="red"
            @click="userLogout"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      ref="drawerProntuario"
      v-model="drawer"
      show-if-above
      :breakpoint="768"
      bordered
    >
      <q-scroll-area class="fit">
        <q-list
          bordered
          padding
          separator
          class="text-primary"
        >
          <template v-for="menu in cMenuList">
            <q-item
              :active="active === menu.routeName"
              active-class="menu-link-active bg-blue-1"
              :class="{'menu-link-active': active === menu.routeName}"
              clickable
              v-ripple
              class="text-primary"
              :to="{name: menu.routeName}"
              :key="menu.routeName"
              @click="active=menu.routeName"
            >
              <q-item-section avatar>
                <q-icon
                  color="black"
                  :name="menu.icon"
                  :size="menu.iconSize"
                >
                </q-icon>
                <!-- <div
                  v-if="miniState"
                  class="absolute-bottom"
                  style="font-size: 0.5rem"
                >{{ menu.name }}</div> -->
              </q-item-section>
              <q-item-section>
                {{ menu.name }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
      <div
        class="absolute full-width text-center"
        style="bottom: 0px;"
      >
        <q-btn
          ripple
          color="info"
          flat
          class="full-width text-bold bg-padrao no-border-radius"
          @click="$router.push({name: 'pacientes-setor'})"
          label="Pacientes"
          icon="mdi-arrow-left"
        />
      </div>

    </q-drawer>

    <q-page-container>
      <q-card class="text-primary q-ma-md border-card-paciente">
        <q-card-section class="row items-center q-pa-xs">
          <div class="text-left">
            <q-btn
              ripple
              flat
              round
              class="bg-padrao"
              @click="$router.push({name: 'pacientes-setor'})"
              icon="mdi-arrow-left"
            />
          </div>
          <div class="col q-ml-lg q-py-sm">
            <div class="row">
              <div class="col"><b>Paciente:</b> {{ paciente.NM_PESSOA_FISICA_REAL}}</div>
            </div>
            <div class="row">
              <span class="col-xs-7 col-sm-6 col-md-4 col-lg-3"> <b>Nascimento:</b> {{ paciente.DT_NASCIMENTO }} </span>
              <span class="col-xs-5 col-sm-4 col-lg-3"> <b>Atend.:</b> {{ paciente.NR_ATENDIMENTO }} </span>
            </div>
            <div
              class="row"
              style="font-size: 0.8rem"
            >
              <div class="col-xs-6 col-sm-6 col-lg-3 q-pl-sm-md"><b>Internação:</b> {{ formataData(paciente.DT_ENTRADA) }} </div>
              <div
                :class="{'q-pl-sm':  $q.screen.lt.sm}"
                class="col-xs-6 col-sm-6 col-lg-3 q-pl-sm-md"
              ><b>Unidade:</b> {{ formataData(paciente.DT_ENTRADA_UNIDADE) }} </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card
        flat
        class="text-primary q-ma-md"
      >
        <q-card-section class="row items-center q-pa-xs">
          <q-scroll-area
            visible
            class="full-width q-ma-sm scrollProntuario"
          >
            <keep-alive
              :exclude="['PlanoTerapeutico']"
              max="5"
            >
              <router-view :paciente="paciente" />
            </keep-alive>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script>
import PlanoTerapeuticoMethodsMixin from './roundUTI/PlanoTerapeuticoMethodsMixin'
import menu from './menu'

export default {
  name: 'IndexProntuario',
  mixins: [PlanoTerapeuticoMethodsMixin],
  data () {
    return {
      paciente: this.$store.state.admissao.pacienteSelecionado,
      drawer: false,
      miniState: false,
      active: null
    }
  },

  computed: {
    cUsuario () {
      return this.$store.state.usuario.usuarioTasy
    },
    cMenuList () {
      return menu
    },
    cBehavior () {
      return this.miniState ? 'desktop' : this.$q.screen.lt.md ? 'mobile' : 'desktop'
    }
  },
  methods: {
    setMiniState () {
      this.miniState = !this.miniState
      setTimeout(() => { this.$refs.drawerProntuario.show() }, 100)
    },
    drawerClick (e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    },
    menuBurguer () {
      this.miniState ? setTimeout(() => { this.drawer = true }, 100) : this.drawer = !this.drawer; this.miniState = false
    },
    userLogout () {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente fazer logout?`,
        ok: {
          label: `Confirmar`,
          color: 'positive'
        },
        cancel: {
          label: 'Cancelar',
          color: 'warning'
        },
        persistent: true
      }).onOk(() => {
        this.$store.commit('RESET_TOKEN')
        this.$store.commit('RESET_USUARIO_TASY')
        this.$router.push({ name: 'login' })
      })
    }
  },
  mounted () {
    this.miniState = true
    // this.$store.commit('RESET_BACKGROUND_COLOR')
  }
}
</script>
<style lang="sass">
.scrollProntuario
  height: calc(100vh - 210px)

.menu-link-active
  color: $primary
  // border-bottom: 1px solid $positive
  border-left: 4px solid $info
  position: relative
  font-size: 1rem
  font-weight: bolder
  height: 100%
  .q-icon
    // color: white !important
.router-link-active
  color: white

.border-card-paciente
  border-left: 5px solid $info
</style>
