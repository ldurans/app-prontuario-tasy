<template>
  <div>
    <div class="row q-py-md q-px-sm">
      <div class="col">
        <div class="flex flex-center">
          <ItemPaciente
            style="width: 100%; min-width: 20em; max-width: 20em; min-height: 9em; height: 100%; max-height: 9em; padding: 1.2em"
            :style="{minWidth:  $q.screen.xs ? '98%' : ''}"
            v-for="paciente in pacientes"
            :paciente="paciente"
            :key="paciente.NR_ATENDIMENTO"
            @itemPaciente:click="paciente => paciente.NR_ATENDIMENTO ? pacienteSelecionado(paciente) : ''"
          />

          <!-- <q-btn
            square
            push
            no-caps
            :ripple="{ center: true }"
            class="q-ma-md shadow-5 cursor-pointer text-white no-padding bg-teal-7"
            style="width: 100%; max-width: 24em; min-height: 9em; height: 100%; max-height: 9em; padding: 1.3em"
            v-for="paciente in pacientes"
            :key="paciente.NR_ATENDIMENTO"
            :disable="!paciente.NR_ATENDIMENTO"
            :class="{cardSemPaciente: !paciente.NR_ATENDIMENTO}"
            @click="pacienteSelecionado(paciente)"
          >
            <q-item
              class="text-left text-white absolute-top-left q-ma-xs "
              style="width: 290px "
              v-if="paciente.NR_ATENDIMENTO"
            >
              <q-item-section>
                <q-item-label
                  :lines="2"
                  style="font-size: 16px;"
                >{{paciente.NM_PESSOA_FISICA_REAL}}
                </q-item-label>
                <q-item-label
                  caption
                  class=" text-white"
                >
                  Nasc: {{ paciente.DT_NASCIMENTO }}
                </q-item-label>
                <q-item-label
                  caption
                  class=" text-white"
                >
                  Internação: {{ formataData(paciente.DT_ENTRADA, 'DD/MM/YYYY HH:MM') }}
                </q-item-label>
                <q-item-label
                  caption
                  class=" text-white"
                >
                  Atendimento: {{ paciente.NR_ATENDIMENTO }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <p
              class="text-center q-mt-sm text-caption"
              v-else
            >Leito/Apartamento vazio</p>
            <q-chip
              dense
              style="cursor: grab; font-size: 16px;"
              class="q-ml-sm bg-teal-10 text-bold text-white absolute-right q-ma-sm q-mt-md"
            >
              {{ paciente.CD_UNIDADE_BASICA }}
            </q-chip>
          </q-btn> -->
        </div>
      </div>

    </div>
    <div class="row q-mx-lg q-pa-sm">
      <div class="col text-left">
      </div>
    </div>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        ripple
        fab
        flat
        class="bg-padrao"
        color="info"
        icon="arrow_back"
        @click="$router.push({name: 'lista-setores'})"
      />
    </q-page-sticky>

  </div>
</template>
<script>
import moment from 'moment'
import { ListarPacientesSetor } from '../../services/setores'
import ItemPaciente from './ItemPaciente.vue'

export default {
  name: 'PacientesSetor',
  components: { ItemPaciente },
  data () {
    return {
      imgError: false,
      setor: this.$store.state.admissao.setorSelecionado,
      pacientes: []
    }
  },
  methods: {
    iniciaisNome (nomecompleto) {
      nomecompleto = nomecompleto.replace(/\s(de|da|dos|das)\s/g, ' ') // Remove os de,da, dos,das.
      const iniciais = nomecompleto.match(/\b(\w)/gi) // Iniciais de cada parte do nome.
      // var nome = nomecompleto.split(' ')[0].toLowerCase() // Primeiro nome.
      const sobrenomes = iniciais
        .splice(1, iniciais.length - 1)
        .join('')
        .toLowerCase() // Iniciais
      const iniciaisNome = iniciais + sobrenomes
      return iniciaisNome.toUpperCase()
    },
    formataData (data, f) {
      if (data == null) {
        return ''
      } else {
        return moment(data).format(f)
      }
    },
    listarPacientesSetor () {
      ListarPacientesSetor(this.setor)
        .then(res => {
          this.pacientes = res.data
        })
    },
    pacienteSelecionado (paciente) {
      this.$store.commit('SET_PACIENTES_SELECIONADO', paciente)
      this.$router.push({ name: 'round' })
    }
  },
  mounted () {
    this.listarPacientesSetor()
  }
}
</script>
<style scoped>
.cardSemPaciente {
  border-top: 4px solid #f39c12;
}
</style>
