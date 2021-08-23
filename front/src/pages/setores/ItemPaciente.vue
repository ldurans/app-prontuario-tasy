<template>
  <q-card
    flat
    bordered
    class="text-grey-9 q-ma-xs q-pa-sm planner-item q-hoverable hovering-zoom"
    style="font-size: 16px"
    :class="{
      'leitoLivre  cursor-not-allowed': !paciente.NR_ATENDIMENTO
    }"
    @click="$emit('itemPaciente:click', paciente)"
  >
    <div class="row items-center justify-end no-wrap">
      <q-badge
        color="grey-3"
        text-color="grey-8"
        class="text-bold ellipsis-2-lines q-pa-sm q-mt-xs bg-padrao"
        style="font-size: 1.2rem; margin-top: -10px; margin-right: -5px"
        :label="paciente.CD_UNIDADE_BASICA"
      />
    </div>
    <div class="row items-center justify-start no-wrap">
      <div
        class="col"
        style="margin-left: -5px; max-width: 25px; min-width: 25px;"
      >
        <q-icon
          size="20px"
          name="mdi-clipboard-account-outline"
        />
      </div>
      <div
        v-if="paciente.NR_ATENDIMENTO"
        class="ellipsis col text-blue-9"
      >{{ paciente.NM_PESSOA_FISICA_REAL }}</div>
    </div>

    <div class="row items-center justify-start no-wrap">
      <div
        class="col"
        style="margin-left: -5px; max-width: 25px; min-width: 25px;"
      >
        <q-icon
          size="20px"
          name="mdi-calendar-blank"
        />
      </div>
      <div
        v-if="paciente.NR_ATENDIMENTO"
        class="ellipsis col"
        style="font-size: 13px"
      >{{paciente.DT_NASCIMENTO}}</div>
    </div>
    <div class="row items-center justify-start no-wrap">
      <div
        class="col"
        style="margin-left: -5px; max-width: 25px; min-width: 25px;"
      >
        <q-icon
          size="20px"
          name="mdi-calendar-import"
        />
      </div>
      <div
        v-if="paciente.NR_ATENDIMENTO"
        class="ellipsis col"
        style="font-size: 13px"
      >{{formataData(paciente.DT_ENTRADA, 'DD/MM/YYYY HH:MM')}}</div>
    </div>
    <div class="row items-center justify-start no-wrap">
      <div
        class="col"
        style="margin-left: -5px; max-width: 25px; min-width: 25px;"
      >
        <q-icon
          size="20px"
          name="mdi-hospital-building"
        />
      </div>
      <div
        v-if="paciente.NR_ATENDIMENTO"
        class="ellipsis col"
        style="font-size: 13px"
      >{{paciente.NR_ATENDIMENTO}}</div>
    </div>

    <!-- Inserir informações de status no futuro -->
    <!-- <template>
      <div
        v-for="item in [Constantes.statusAgenda.find(s => s.value == horario.cd_status)]"
        :key="`${horario.id}-${item.value}`"
        class="row items-center justify-start no-wrap"
      >
        <div
          class="col"
          style="margin-left: -5px; max-width: 25px; min-width: 25px;"
        >
          <q-icon
          size="20px"
            :name="item.icon"
            :style="{color: item.color}"
            @click.stop="() => ''"
          >
          </q-icon
          size="20px">
        </div>
        <div
          :style="{color: item.color, fontSize: '10px'}"
          class="ellipsis col"
        >
          {{ item.label }}
        </div>
      </div>
    </template> -->
  </q-card>

</template>
<script>
// import Constantes from '../atendimento/ccAgenda/Constantes'
import moment from 'moment'
export default {
  name: 'ItemPaciente',
  props: {
    value: Boolean,
    paciente: {
      type: Object,
      default: () => { }
    }
  },

  data () {
    return {
    }
  },
  methods: {
    formataData (data, f) {
      if (data == null) {
        return ''
      } else {
        return moment(data).format(f)
      }
    }

  }
}
</script>

<style lang="scss">
.cursor-not-allowed {
  cursor: not-allowed !important;
}

.leitoLivre {
  border-left: 3px solid green;
}

.planner-item:not(.disableCard):hover {
  cursor: pointer;
  transform: scale(1);
  z-index: 99;
  background-color: $grey-2;
  transition: color 0.3s, background-color 0.3s;
  // border: 1px solid $primary
}
</style>
