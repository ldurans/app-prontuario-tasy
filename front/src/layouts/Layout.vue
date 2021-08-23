<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout :view="'hHh LpR fff'">
    <q-header
      elevated
      bordered
      class="print-hide bg-rdsl-blue text-white"
    >
      <q-toolbar class="text-bold">
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
    <q-page-container>
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Layout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    cUsuario () {
      return this.$store.state.usuario.usuarioTasy
    }
  },
  methods: {
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
  }
}
</script>
