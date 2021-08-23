<template>
  <div>
    <cc-table
      :data="cListaAvaliacoes"
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"
      selection='single'
      class="q-pa-sm"
      title="Avaliações"
      :actions="actions"
      :colorStatus="colorStatus"
      :headerLastColumFix="true"
      @cc-visualizar-avaliacao="visualizarAvaliacao"
    />

    <q-dialog
      v-model="abrirModalAvaliacao"
      persistent
      @hide="abrirModalAvaliacao=false; avaliacaoEmVisualizacao={}"
    >
      <q-card style="min-width: 90vw; min-height: 90vh; max-width: 90vw; max-height: 90vh">
        <q-card-section class="items-center bg-info text-white">
          <div
            class="col text-bold"
            style="font-size: 1.4rem"
          > Avaliação: <span class="text-weight-regular"> {{ avaliacaoEmVisualizacao.DS_TIPO_AVALIACAO }} </span> </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 text-bold"> Avaliador: <span class="text-weight-regular"> {{ avaliacaoEmVisualizacao.NM_MEDICO }} </span> </div>
            <div class="col-xs-6 col-sm-3 text-bold"> Função: <span class="text-weight-regular"> {{ avaliacaoEmVisualizacao.DS_FUNCAO_USUARIO }} </span> </div>
            <div class="col-xs-6 col-sm-3 text-bold"> Data: <span class="text-weight-regular"> {{ formatarData(avaliacaoEmVisualizacao.DT_AVALIACAO, 'DD/MM/YYYY HH:mm') }} </span> </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="scroll ajusteAlturaSection">
          <div v-html="avaliacaoEmVisualizacao.DS_TEXTO "></div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            class="bg-padrao q-px-md"
            flat
            label="Fechar"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import moment from 'moment'
import ccTable from '../../../components/ccTable'
import { ListarAvaliacoes } from '../../../services/avaliacoes'
export default {
  name: 'AvalicaoesIndex',
  components: { ccTable },
  props: {
    paciente: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      abrirModalAvaliacao: false,
      avaliacaoEmVisualizacao: {},
      listaAvalicoes: [],
      actions: [
        { name: '', event: 'cc-visualizar-avaliacao', icon: 'mdi-eye', color: 'info' }
      ],
      colorStatus: {
        'bl_ativo': {
          'false': 'rgb(255, 205, 210)'
        }
      },
      pagination: {
        page: 1,
        total_pages: 1,
        count: 1,
        size_per_page: 1
        // rowsPerPage: 50,
        // rowsNumber: null
      },
      columns: [
        { name: 'DS_TIPO_AVALIACAO', field: 'DS_TIPO_AVALIACAO', label: 'Avaliação', align: 'left' },
        { name: 'DT_AVALIACAO', field: 'DT_AVALIACAO', label: 'Data', align: 'center', format: (value) => this.formatarData(value, 'DD/MM/YYYY HH:mm') },
        { name: 'NM_MEDICO', field: 'NM_MEDICO', label: 'Avaliador', align: 'left' },
        { name: 'DS_FUNCAO_USUARIO', field: 'DS_FUNCAO_USUARIO', label: 'Função', align: 'left' },
        { name: 'NM_USUARIO', field: 'NM_USUARIO', label: 'Usuário', align: 'left' },
        { name: 'NR_ATENDIMENTO', field: 'NR_ATENDIMENTO', label: 'Atendimento', align: 'left' },
        { name: 'btnsActions', field: 'btnsActions', label: '', align: 'center', style: 'width: 30px' }
      ]
    }
  },
  computed: {
    cListaAvaliacoes () {
      return this.listaAvalicoes
    }
  },
  methods: {
    formatarData (data, formato = 'DD/MM/YYYY HH:mm') {
      return moment(data).format(formato)
    },
    listarAvaliacoes () {
      const params = {
        nr_atendimento: this.paciente.NR_ATENDIMENTO,
        cd_pessoa_fisica: this.paciente.CD_PESSOA_FISICA
      }
      ListarAvaliacoes(params)
        .then(res => {
          this.listaAvalicoes = res.data
          this.pagination = {
            page: 1,
            total_pages: 1,
            count: this.listaAvalicoes.length,
            size_per_page: this.listaAvalicoes.length
          }
        })
    },
    visualizarAvaliacao (avaliacao) {
      this.avaliacaoEmVisualizacao = avaliacao
      this.abrirModalAvaliacao = true
    }
  },
  mounted () {
    this.listarAvaliacoes()
  }
}
</script>

<style lang="sass">
.ajusteAlturaSection
  height: 68vh
</style>
