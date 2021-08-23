<template>
  <div>
    <cc-table
      :data="cListaLaudos"
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"
      selection="single"
      :actions="actions"
      class="q-pa-sm"
      title="Laudos"
      :colorStatus="colorStatus"
      :headerLastColumFix="true"
      @cc-visualizar-laudo="visualizarLaudo"
    />

    <q-dialog
      v-model="abrirModalLaudo"
      persistent
      @hide="
        abrirModalLaudo = false;
        laudoEmVisualizacao = {};
      "
    >
      <q-card style="min-width: 90vw; min-height: 80vh; max-width: 90vw; max-height: 80vh">
        <q-card-section class="items-center bg-info text-white">
          <div
            class="col text-bold"
            style="font-size: 1.4rem"
          >
            Laudo:
            <span class="text-weight-regular">
              {{ laudoEmVisualizacao.DS_TITULO_LAUDO }}
            </span>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-8 text-bold">
              Desc. Complementar:
              <span class="text-weight-regular">
                {{ laudoEmVisualizacao.DS_PROCS_ADIC }}
              </span>
            </div>
            <div class="col-xs-8 col-sm-4 text-bold">
              Data:
              <span class="text-weight-regular">
                {{
                  formatarData(laudoEmVisualizacao.DT_LAUDO, "DD/MM/YYYY HH:mm")
                }}
              </span>
            </div>
            <div class="col-xs-12 text-bold">
              Médico:
              <span class="text-weight-regular">
                {{ laudoEmVisualizacao.NM_MEDICO_CRM }}
              </span>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="scroll ajusteAlturaSection">
          <div v-html="laudoEmVisualizacao.DS_TEXTO"></div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            class="bg-padrao q-px-md"
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
import { ListarLaudos } from '../../../services/laudos'
import ccTable from '../../../components/ccTable'
export default {
  name: 'LaudosIndex',
  components: { ccTable },
  props: {
    paciente: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      listaLaudos: [],
      abrirModalLaudo: false,
      laudoEmVisualizacao: {},
      actions: [
        {
          name: '',
          event: 'cc-visualizar-laudo',
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
          name: 'DS_TITULO_LAUDO',
          field: 'DS_TITULO_LAUDO',
          label: 'Título',
          align: 'left'
        },
        {
          name: 'DT_LAUDO',
          field: 'DT_LAUDO',
          label: 'Data',
          align: 'center',
          format: value => this.formatarData(value, 'DD/MM/YYYY HH:mm')
        },
        {
          name: 'DS_PROCS_ADIC',
          field: 'DS_PROCS_ADIC',
          label: 'Desc. Complementar',
          align: 'left'
        },
        {
          name: 'NM_MEDICO_CRM',
          field: 'NM_MEDICO_CRM',
          label: 'Médico',
          align: 'left'
        },
        {
          name: 'NM_MEDICO_SOLIC_CRM',
          field: 'NM_MEDICO_SOLIC_CRM',
          label: 'Solicitante',
          align: 'left'
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
          name: 'NR_SEQUENCIA',
          field: 'NR_SEQUENCIA',
          label: 'Seq. Laudo',
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
    cListaLaudos () {
      let laudos = this.listaLaudos
      laudos.map(l => {
        l.DS_TEXTO = l.DS_TEXTO.replace(
          /<(\w+)\b(?:\s+[\w\-.:]+(?:\s*=\s*(?:"[^"]*"|"[^"]*"|[\w\-.:]+))?)*\s*\/?>\s*<\/\1\s*>/gim,
          ''
        )
        l.DS_TEXTO = l.DS_TEXTO.replace(/<p/g, '<p class="formatP" ')
        l.DS_TEXTO = l.DS_TEXTO.replace(/(\r\n|\n|\r)/g, '')
        l.DS_TEXTO = l.DS_TEXTO.replace(/<br>/g, '')
      })
      return this.listaLaudos
    }
  },
  methods: {
    formatarData (data, formato = 'DD/MM/YYYY HH:mm') {
      return moment(data).format(formato)
    },
    listarLaudos () {
      const params = {
        cd_pessoa_fisica: this.paciente.CD_PESSOA_FISICA,
        nr_atendimento: this.paciente.NR_ATENDIMENTO
      }
      ListarLaudos(params)
        .then(res => {
          this.listaLaudos = res.data
          this.pagination = {
            page: 1,
            total_pages: 1,
            count: this.listaLaudos.length,
            size_per_page: this.listaLaudos.length
          }
        })
    },
    visualizarLaudo (laudo) {
      this.laudoEmVisualizacao = laudo
      this.abrirModalLaudo = true
    }
  },
  mounted () {
    this.listarLaudos()
  }
}
</script>

<style lang="stylus">
.formatP
  text-align justify
  white-space pre-wrap !important /* css-3 */
  white-space -moz-pre-wrap !important /* Mozilla, since 1999 */
  white-space -pre-wrap !important /* Opera 4-6 */
  white-space -o-pre-wrap !important /* Opera 7 */
  word-wrap break-word !important /* Internet Explorer 5.5+ */

// .formatP {
// line-height: 24px;
// }
.ajusteAlturaSection
  height 60vh
</style>
