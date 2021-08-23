<template>
  <div>
    <cc-table
      :data="cListaPrescricoes"
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"
      selection="single"
      title="Prescrições"
      class="q-pa-sm"
      :actions="actions"
      :colorStatus="colorStatus"
      :headerLastColumFix="true"
      @cc-visualizar-prescricao="visualizarPrescricao"
    />

    <q-dialog
      v-model="abrirModalPrescricao"
      persistent
      @hide="
        abrirModalPrescricao = false;
        prescricaoEmVisualizacao = {};
      "
    >
      <q-card style="min-width: 90vw; min-height: 90vh; max-width: 90vw; max-height: 90vh">
        <q-card-section class="items-center bg-info text-white">
          <div class="row">

            <div
              class="col-xs-12 col-sm-6 text-bold"
              style="font-size: 1.4rem"
            >
              Prescrição:
              <span class="text-weight-regular">
                {{ prescricaoEmVisualizacao.NR_PRESCRICAO }}
              </span>
            </div>
            <div
              class="col-xs-12 col-sm-6 text-bold"
              style="font-size: 1.4rem"
            >
              Data:
              <span class="text-weight-regular q-pl-md ">
                {{ formatarData(prescricaoEmVisualizacao.DT_PRESCRICAO,  'DD/MM/YYYY HH:mm') }}
              </span>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-6 text-bold">
              <span class="text-weight-regular">
                Prescritor: {{ prescricaoEmVisualizacao.NM_MEDICO }}
              </span>
            </div>
            <div class="col-xs-6 text-bold">
              <span class="text-weight-regular">
                Validade: {{ formatarData(prescricaoEmVisualizacao.DT_PRESCRICAO, 'DD/MM/YYYY HH:mm') }}
              </span>
            </div>

            <div class="col-xs-6 text-bold">
              <span class="text-weight-regular">
                Função Prescritor: {{ prescricaoEmVisualizacao.DS_FUNCAO_PRESCRITOR }}
              </span>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="scroll ajusteAlturaSection">
          <div v-html="prescricaoEmVisualizacao.DS_RESUMO"></div>
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
import { ListarPrescricoes, BuscarPrescricao } from '../../../services/prescricoes'

export default {
  name: 'PrescricoesIndex',
  components: { ccTable },
  props: {
    paciente: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      listaPrescricoes: [],
      abrirModalPrescricao: false,
      prescricaoEmVisualizacao: {},
      actions: [
        {
          name: '',
          event: 'cc-visualizar-prescricao',
          icon: 'mdi-eye',
          color: 'info'
        }
      ],
      colorStatus: {
        bl_ativo: {
          false: 'rgb(255, 205, 210)'
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
        {
          name: 'NR_PRESCRICAO',
          field: 'NR_PRESCRICAO',
          label: 'Prescrição',
          align: 'left'
        },
        {
          name: 'DT_PRESCRICAO',
          field: 'DT_PRESCRICAO',
          label: 'Data',
          align: 'center',
          format: value => this.formatarData(value, 'DD/MM/YYYY HH:mm')
        },
        {
          name: 'DT_VALIDADE_PRESCR',
          field: 'DT_VALIDADE_PRESCR',
          label: 'Validade',
          align: 'center',
          format: value => this.formatarData(value, 'DD/MM/YYYY HH:mm')
        },
        {
          name: 'NM_MEDICO',
          field: 'NM_MEDICO',
          label: 'Prescritor',
          align: 'left'
        },
        {
          name: 'DS_FUNCAO_PRESCRITOR',
          field: 'DS_FUNCAO_PRESCRITOR',
          label: 'Função Usuário',
          align: 'left'
        },
        {
          name: 'DS_ITEM',
          field: 'DS_ITEM',
          label: 'Desc. Itens',
          align: 'left'
        },
        {
          name: 'DT_LIBERACAO',
          field: 'DT_LIBERACAO',
          label: 'Data',
          align: 'center',
          format: value => this.formatarData(value, 'DD/MM/YYYY HH:mm')
        },
        {
          name: 'NM_USUARIO',
          field: 'NM_USUARIO',
          label: 'Usuário',
          align: 'left'
        },
        {
          name: 'NR_ATENDIMENTO',
          field: 'NR_ATENDIMENTO',
          label: 'Atendimento',
          align: 'left'
        },
        {
          name: 'btnsActions',
          field: 'btnsActions',
          label: '',
          align: 'center',
          style: 'width: 30px'
        }
      ]
    }
  },
  computed: {
    cListaPrescricoes () {
      return this.listaPrescricoes
    }
  },
  methods: {
    formatarData (data, formato = 'DD/MM/YYYY HH:mm') {
      return moment(data).format(formato)
    },
    listarPrescricoes () {
      const params = {
        cd_pessoa_fisica: this.paciente.CD_PESSOA_FISICA,
        nr_atendimento: this.paciente.NR_ATENDIMENTO
      }
      ListarPrescricoes(params)
        .then(res => {
          this.listaPrescricoes = res.data
          this.pagination = {
            page: 1,
            total_pages: 1,
            count: this.listaPrescricoes.length,
            size_per_page: this.listaPrescricoes.length
          }
        })
    },
    visualizarPrescricao (prescricao) {
      this.prescricaoEmVisualizacao = prescricao
      if (!prescricao.DS_RESUMO) {
        const params = {
          cd_pessoa_fisica: this.paciente.CD_PESSOA_FISICA,
          nr_atendimento: this.paciente.NR_ATENDIMENTO,
          nr_prescricao: prescricao.NR_PRESCRICAO
        }
        BuscarPrescricao(params)
          .then(res => {
            const data = res.data[0]
            this.listaPrescricoes = this.listaPrescricoes.map(obj => {
              if (obj.NR_PRESCRICAO === data.NR_PRESCRICAO) {
                obj = data
              }
            })
            this.prescricaoEmVisualizacao = data
          })
      }

      this.abrirModalPrescricao = true
    }
  },
  mounted () {
    this.listarPrescricoes()
  }
}
</script>

<style lang="sass" scoped>
.ajusteAlturaSection
  height: 68vh
</style>
