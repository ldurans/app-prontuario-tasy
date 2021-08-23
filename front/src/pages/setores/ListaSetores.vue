<template>
  <div class="container row q-pa-sm q-ma-sm">
    <q-card
      bordered
      flat
      class="full-width bg-grey-1"
    >
      <div class="text-h6 row justify-start">
        <span class="bg-padrao rounded-borders q-px-md text-weight-bolder text-grey-10">
          UTI's
        </span>
      </div>
      <q-card-section class="q-pa-md">
        <div class="row items-center justify-center q-gutter-md q-mb-md">
          <q-btn
            rounded
            ripple
            v-for="setor in cUTI"
            :key="setor.CD_SETOR"
            flat
            dense
            color="blue"
            class="bg-btn-setores shadow-1 cursor-pointer"
            style="width: 100%; max-width: 300px; padding: 1.2em"
            :style="{ minWidth: $q.screen.xs ? '98%' : '' }"
            @click="setorSelecionado(setor.CD_SETOR)"
          >
            <div class="text-h6">{{ setor.DS_SETOR }}</div>
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
    <q-card
      bordered
      flat
      class="full-width q-mt-md bg-grey-1"
    >
      <div class="text-h6 row justify-start">
        <span class="bg-padrao rounded-borders q-px-md text-weight-bolder text-grey-10">
          UI's
        </span>
      </div>
      <q-card-section class="q-pa-md">
        <div class="row items-center justify-center q-mb-md q-gutter-md">
          <q-btn
            rounded
            v-for="setor in cInternacao"
            :key="setor.CD_SETOR"
            flat
            dense
            color="positive"
            class="bg-btn-setores text-bold shadow-1 cursor-pointer "
            style="width: 100%; max-width: 300px; padding: 1.2em"
            :style="{ minWidth: $q.screen.xs ? '98%' : '' }"
            @click="setorSelecionado(setor.CD_SETOR)"
          >
            <div class="text-h6">{{ setor.DS_SETOR }}</div>
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { ListarSetores } from '../../services/setores'
export default {
  name: 'ListaSetores',
  data () {
    return {
      setores: []

    }
  },
  computed: {
    cUTI () {
      return this.setores.filter(obj => obj.CD_CLASSIFICACAO === '4')
    },
    cInternacao () {
      return this.setores.filter(obj => obj.CD_CLASSIFICACAO === '3')
    }
  },
  methods: {
    listarSetores () {
      ListarSetores()
        .then(res => {
          this.setores = res.data
        })
    },
    setorSelecionado (setor) {
      this.$store.commit('SET_SETOR_PACIENTES', setor)
      this.$router.push({ name: 'pacientes-setor' })
    }

  },
  mounted () {
    this.listarSetores()
  }
}
</script>
<style lang="scss">
</style>
