<template>
  <div>
    <q-infinite-scroll
      :disable="!listaEvolucoes.length || (scrollEvolucoes.length >= listaEvolucoes.length)"
      @load="onLoadScroll"
    >
      <template v-for="evolucao in cEvolucoes">
        <!-- <div
          :key="`key-${evolucao.CD_EVOLUCAO}`"
          :id="`evolucao-${evolucao.CD_EVOLUCAO}`"
        /> -->
        <q-card
          flat
          bordered
          :key="evolucao.CD_EVOLUCAO"
          class="shadow-1 q-my-md q-mx-md"
        >
          <!-- :style="`border-left: 2px solid ${corIconeEvolucao(evolucao.IE_TIPO_EVOLUCAO).hexa}`" -->
          <div :id="`evolucao-${evolucao.CD_EVOLUCAO}`" />
          <q-item
            dense
            class="q-px-sm"
            :class="{pulseIdentications: identificar == `evolucao-${evolucao.CD_EVOLUCAO}` }"
          >
            <q-item-section
              style="margin-top: 2px; align-items: flex-end;"
              class="text-right absolute-top-right q-pa-none q-ma-none"
              avatar
            >
              <q-avatar dense>
                <q-icon
                  size="24px"
                  :color="corIconeEvolucao(evolucao.IE_TIPO_EVOLUCAO).cor"
                  :name="corIconeEvolucao(evolucao.IE_TIPO_EVOLUCAO).icon"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold text-primary">{{ evolucao.NM_MEDICO }} </q-item-label>
              <q-item-label>
                {{ evolucao.NM_USUARIO }} | <q-badge
                  align="middle"
                  :color="corIconeEvolucao(evolucao.IE_TIPO_EVOLUCAO).cor"
                > {{ evolucao.DS_TIPO_EVOLUCAO }} </q-badge>
              </q-item-label>
              <q-item-label caption>
                {{ evolucao.DT_EVOLUCAO }}
                <span class="float-right">
                  {{ evolucao.DS_SUBTIPO_EVOLUCAO }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator
            inset
            spaced
          />
          <q-card-section ref="redalgo">
            <!-- <pre>{{ evolucao.DS_EVOLUCAO }}</pre> -->
            <read-more
              :link="`evolucao-${evolucao.CD_EVOLUCAO}`"
              :maxChars="500"
              :text="evolucao.DS_EVOLUCAO"
              :renderPre="evolucao.IE_EVOLUCAO_CLINICA == 'RA'"
              @read-more:focar-ref="elementoFocado"
            >
            </read-more>
          </q-card-section>
        </q-card>
      </template>
    </q-infinite-scroll>
    <!-- <q-timeline
      id="timelineEvolucoes"
      layout="dense"
      side="left"
      color="primary"
      class="q-pr-sm q-pl-sm full-height"
    >
      <q-infinite-scroll
        :disable="!listaEvolucoes.length || (scrollEvolucoes.length >= listaEvolucoes.length)"
        @load="onLoadScroll"
      >
        <template v-for="(evolucao, index) in cEvolucoes">
          <div
            :key="`key-${evolucao.CD_EVOLUCAO}`"
            :id="`evolucao-${evolucao.CD_EVOLUCAO}`"
          ></div>

          <q-timeline-entry
            style="padding-right: 16px"
            class="shadow-2 q-mb-md q-pa-sm q-pr-sm"
            :title="evolucao.DT_EVOLUCAO"
            :subtitle="evolucao.NM_USUARIO"
            :icon="corIconeEvolucao(evolucao.IE_TIPO_EVOLUCAO).icon"
            :color="corIconeEvolucao(evolucao.IE_TIPO_EVOLUCAO).cor"
            :key="index"
            :class="{pulseIdentications: identificar == `evolucao-${evolucao.CD_EVOLUCAO}` }"
          >
            <q-card class="text-left  full-width no-box-shadow">
              <q-card-section class="bg-grey-11 q-pa-xs">
                <div>
                  <span class="text-subtitle1"> {{ evolucao.NM_MEDICO }} <q-badge
                      align="middle"
                      class="text-bold"
                      :color="corIconeEvolucao(evolucao.IE_TIPO_EVOLUCAO).cor"
                    > {{ evolucao.DS_TIPO_EVOLUCAO }} </q-badge></span>
                  <br>
                  <span class="text-caption">&nbsp; {{ evolucao.DS_CRM_PROF }} </span>
                  <span class="float-right">
                    {{ evolucao.DS_SUBTIPO_EVOLUCAO }}
                  </span>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section
                ref="redalgo"
                class="no-padding"
              >
                <read-more
                  :link="`evolucao-${evolucao.CD_EVOLUCAO}`"
                  :maxChars="500"
                  :text="evolucao.DS_EVOLUCAO"
                  :renderPre="evolucao.IE_EVOLUCAO_CLINICA == 'RA'"
                  @read-more:focar-ref="elementoFocado"
                >
                </read-more>
              </q-card-section>
            </q-card>
          </q-timeline-entry>
        </template>
        <template v-slot:loading>
          <div
            class="row justify-center absolute-bottom q-my-md"
            v-if="loading"
          >
            <q-spinner-dots
              color="info"
              size="70px"
            />
          </div>
        </template>
      </q-infinite-scroll>
    </q-timeline> -->
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[0, 10]"
    >
      <q-btn
        dense
        fab
        icon="keyboard_arrow_up"
        color="primary"
      />
    </q-page-scroller>
  </div>
</template>
<script>
import { ListarEvolucoes } from '../../../services//evolucao'
import ReadMore from './ReadMore'
export default {
  name: 'EvolucaoPaciente',
  components: { ReadMore },
  props: {
    paciente: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      loading: false,
      listaEvolucoes: [],
      scrollEvolucoes: [],
      identificar: null,
      resumoCaracteres: 400,
      ellipsesTexto: '...',
      corIcone: {
        '1': { tipo: 'Médico', icon: 'mdi-heart', cor: 'green', hexa: '#4caf50' },
        '12': { tipo: 'Fonoaudiólogo', icon: 'mdi-stethoscope', cor: 'indigo-5', hexa: '#5c6bc0' },
        '13': { tipo: 'Técnico de Enfermagem', icon: 'mdi-needle', cor: 'green-10', hexa: '#1b5e20' },
        '14': { tipo: 'Assitente Social', icon: 'mdi-charity', cor: 'light-blue-5', hexa: '' },
        '3': { tipo: 'Enfermeiro', icon: 'mdi-doctor', cor: 'green-13', hexa: '#00e676' },
        '4': { tipo: 'Nutricionista', icon: 'mdi-scale', cor: 'deep-purple-5', hexa: '#7e57c2' },
        '5': { tipo: 'Psicólogo', icon: 'mdi-comment-account', cor: 'purple-5', hexa: '#ab47bc' },
        '8': { tipo: 'Farmacêutico', icon: 'mdi-pill', cor: 'teal-7', hexa: '#00897b' },
        '10': { tipo: 'Fisioterapeuta', icon: 'mdi-human-handsup', cor: 'light-blue-9', hexa: '#0277bd' }
      }
    }
  },
  computed: {
    cEvolucoes () {
      return this.scrollEvolucoes
    }
  },
  methods: {
    corIconeEvolucao (codigo) {
      const padrao = { tipo: 'Fisioterapeuta', icon: 'mdi-hospital', cor: 'green-10' }
      return this.corIcone[codigo] || padrao
    },
    elementoFocado (id) {
      this.identificar = id
      this.$nextTick(() => {
        const elem = document.getElementById(id)
        elem.scrollIntoView()
      })
      setTimeout(() => {
        this.identificar = null
      }, 5000)
    },
    listarEvolucoes () {
      const params = {
        nr_atendimento: this.paciente.NR_ATENDIMENTO,
        cd_pessoa_fisica: this.paciente.CD_PESSOA_FISICA
      }
      ListarEvolucoes(params)
        .then(res => {
          this.listaEvolucoes = res.data
          const load = this.listaEvolucoes.slice(0, 20)
          load.map(obj => this.scrollEvolucoes.push(obj))
          // this.scrollEvolucoes.concat(this.scrollEvolucoes, load)
          // const scroll = this.scrollEvolucoes.concat(this.scrollEvolucoes, load)
          // this.scrollEvolucoes = scroll
        })
    },
    onLoadScroll (index, done) {
      this.loading = true
      let indexInicio = this.scrollEvolucoes.length
      let indexFim = this.scrollEvolucoes.length + 20
      const load = this.listaEvolucoes.slice(indexInicio, indexFim)
      setTimeout(() => {
        load.map(obj => this.scrollEvolucoes.push(obj))
        done()
        this.loading = false
      }, 1000)
    }
  },
  mounted () {
    this.listarEvolucoes()
  }
}
</script>
<style scoped>
.page {
  background: white;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
}
.page-A4 {
  width: 21cm;
  height: 29.7cm;
}

.pulseIdentications {
  transition: border-width 1s linear;
  animation: shadow-pulse 1s 2;
  box-shadow: 0 3px 5px -1px rgba(255, 177, 66, 2),
    0 5px 8px rgba(255, 177, 66, 0.14), 0 1px 14px rgba(255, 177, 66, 0.12);
}

@keyframes shadow-pulse {
  0% {
    /* box-shadow: 0 0 0 1.5px rgba(255, 177, 66, 0.7); */
    box-shadow: 0 5px 7px -3px rgba(255, 177, 66, 2),
      0 7px 10px rgba(255, 177, 66, 0.14), 0 3px 16px rgba(255, 177, 66, 0.12);
  }

  100% {
    /* box-shadow: 0 0 0 2.5px rgba(255, 177, 66, 0); */
    box-shadow: 0 6px 8px -4px rgba(255, 177, 66, 2),
      0 8px 11px rgba(255, 177, 66, 0.14), 0 4px 17px rgba(255, 177, 66, 0.12);
  }
}
</style>
