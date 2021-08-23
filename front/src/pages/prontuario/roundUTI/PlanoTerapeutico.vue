<template>
  <div id='printAvaliacao'>
    <div style="position: relative">
      <div class="q-ma-sm shadow-4 q-mb-lg">
        <q-card class="full-width no-border-radius q-pa-sm text-center text-bold bg-black text-white">
          AVALIAÇÃO DE RISCOS
        </q-card>

        <!-- Quadro Delírio -->
        <div class="row q-mt-md">
          <div
            class="col-12 q-pa-xs bg-grey-4 text-bold"
            style="font-size: 16px"
          >
            1 - Delirio <span class="float-right q-mr-lg text-caption">Orientações</span>
          </div>
          <div class="col-9">
            <q-option-group
              inline
              v-model="round.quadro_1_delirio.obj"
              :options="round.quadro_1_delirio.opt"
              color="primary"
              type="checkbox"
              @input="(v) => v.length ? round.quadro_1_delirio.acao = 'S' : round.quadro_1_delirio.acao = 'N' "
            />
            <q-input
              v-show="round.quadro_1_delirio.obj.includes('o')"
              square
              class="q-mx-sm"
              outlined
              dense
              v-model="round.quadro_1_delirio.input"
              label="Outros:"
            />
          </div>
          <div class="col-3 text-right q-pr-sm">
            <q-option-group
              inline
              disable
              v-model="round.quadro_1_delirio.acao"
              :options="[{label: 'Sim', value: 'S'}, {label: 'N/A', value: 'N'}]"
              color="primary"
            />
          </div>
        </div>

        <!-- Quadro Flebite -->
        <div class="row q-mt-md">
          <div
            class="col-12 q-pa-xs bg-grey-4 text-bold"
            style="font-size: 16px"
          >
            2 - Flebite <span class="float-right q-mr-lg text-caption">Orientações</span>
          </div>
          <div class="col-9">
            <q-option-group
              inline
              v-model="round.quadro_2_flebite.obj"
              :options="round.quadro_2_flebite.opt"
              color="primary"
              type="checkbox"
              @input="(v) => v.length ? round.quadro_2_flebite.acao = 'S' : round.quadro_2_flebite.acao = 'N' "
            />
            <q-input
              v-show="round.quadro_2_flebite.obj.includes('o')"
              square
              class="q-mx-sm"
              outlined
              dense
              v-model="round.quadro_2_flebite.input"
              label="Outros:"
            />
          </div>
          <div class="col-3 text-right q-pr-sm">
            <q-option-group
              inline
              disable
              v-model="round.quadro_2_flebite.acao"
              :options="[{label: 'Sim', value: 'S'}, {label: 'N/A', value: 'N'}]"
              color="primary"
            />
          </div>
        </div>

        <!-- Quadro Infecção -->
        <div class="row q-mt-md">
          <div
            class="col-12 q-pa-xs bg-grey-4 text-bold"
            style="font-size: 16px"
          >
            3 - Infecção relacionada à assistência à saúde <span class="float-right q-mr-lg text-caption">Orientações</span>
          </div>
          <div class="col-xs-9 col-sm-10">
            <q-option-group
              inline
              v-model="round.quadro_3_infeccao.obj"
              :options="cQuadro_3_infeccao"
              color="primary"
              type="checkbox"
            />
          </div>
          <div class="col-xs-3 col-sm-2 text-center">
            <q-checkbox
              keep-color
              disable
              true-value="S"
              false-value="N"
              v-model="round.quadro_3_infeccao.acao"
              label="Sim"
              color="warning"
            />
          </div>
        </div>

        <!-- Quadro Lesão -->
        <div class="row q-mt-md">
          <div
            class="col-12 q-pa-xs bg-grey-4 text-bold"
            style="font-size: 16px"
          >
            4 - Lesão por pressão <span class="text-caption">(Escala de Braden)</span>
            <span class="float-right q-mr-lg text-caption">Orientações</span>
          </div>
          <div class="col-9">
            <!-- <span class="float-left q-mt-sm text-overline">: </span> -->
            <q-option-group
              inline
              v-model="round.quadro_4_lesao.obj"
              :options="round.quadro_4_lesao.opt"
              color="primary"
              @input="(v) => !round.quadro_4_lesao.obj || round.quadro_4_lesao.obj == '18sr' ? round.quadro_4_lesao.acao = 'N' : round.quadro_4_lesao.acao = 'S' "
            />
          </div>
          <div class="col-3 text-right q-pr-sm">
            <q-option-group
              inline
              disable
              v-model="round.quadro_4_lesao.acao"
              :options="[{label: 'Sim', value: 'S'}, {label: 'N/A', value: 'N'}]"
              color="primary"
            />
          </div>
        </div>

        <!-- Quadro Queda -->
        <div class="row q-mt-md">
          <div
            class="col-12 q-pa-xs bg-grey-4 text-bold"
            style="font-size: 16px"
          >
            5 - Queda <span class="text-caption">(Escala de MORSE)</span> <span class="float-right q-mr-lg text-caption">Orientações</span>
          </div>
          <div class="col-9">
            <!-- <span class="float-left q-mt-sm text-overline">: </span> -->
            <q-option-group
              inline
              v-model="round.quadro_5_queda.obj"
              :options="round.quadro_5_queda.opt"
              color="primary"
              @input="(v) => !round.quadro_5_queda.obj || round.quadro_5_queda.obj == '024rb' ? round.quadro_5_queda.acao = 'N' : round.quadro_5_queda.acao = 'S' "
            />
          </div>
          <div class="col-3 text-right q-pr-sm">
            <q-option-group
              inline
              disable
              v-model="round.quadro_5_queda.acao"
              :options="[{label: 'Sim', value: 'S'}, {label: 'N/A', value: 'N'}]"
              color="primary"
            />
          </div>
        </div>

        <!-- Quadro Tromboembolismo -->
        <div class="row q-mt-md">
          <div
            class="col-12 q-pa-xs bg-grey-4 text-bold"
            style="font-size: 16px"
          >
            6 - Tromboembolismo venoso <span class="float-right q-mr-lg text-caption">Orientações</span>
          </div>
          <div class="col-9">
            <!-- <span class="float-left q-mt-sm text-overline">: </span> -->
            <q-option-group
              inline
              v-model="round.quadro_6_tromboembolismo.obj"
              :options="round.quadro_6_tromboembolismo.opt"
              color="primary"
              @input="(v) => !round.quadro_6_tromboembolismo.obj ? round.quadro_6_tromboembolismo.acao = 'N' : round.quadro_6_tromboembolismo.acao = 'S' "
            />
          </div>
          <div class="col-3 text-right q-pr-sm">
            <q-option-group
              inline
              disable
              v-model="round.quadro_6_tromboembolismo.acao"
              :options="[{label: 'Sim', value: 'S'}, {label: 'N/A', value: 'N'}]"
              color="primary"
            />
          </div>
        </div>

        <!-- Quadro Broncoaspiração -->
        <div class="row q-mt-md">
          <div
            class="col-12 q-pa-xs bg-grey-4 text-bold"
            style="font-size: 16px"
          >
            7 - Broncoaspiração <span class="float-right q-mr-lg text-caption">Orientações</span>
          </div>
          <div class="col-9">
            <!-- <span class="float-left q-mt-sm text-overline">: </span> -->
            <q-option-group
              inline
              v-model="round.quadro_7_broncoaspiracao.obj"
              :options="round.quadro_7_broncoaspiracao.opt"
              color="primary"
              type="checkbox"
              @input="(v) => v.length ? round.quadro_7_broncoaspiracao.acao = 'S' : round.quadro_7_broncoaspiracao.acao = 'N' "
            />
          </div>
          <div class="col-3 text-right q-pr-sm">
            <q-option-group
              inline
              disable
              v-model="round.quadro_7_broncoaspiracao.acao"
              :options="[{label: 'Sim', value: 'S'}, {label: 'N/A', value: 'N'}]"
              color="primary"
            />
          </div>
        </div>

        <!-- Quadro Medicamentos Potencialmente Perigosos -->
        <div class="row q-mt-md">
          <div
            class="col-12 q-pa-xs bg-grey-4 text-bold"
            style="font-size: 16px"
          >
            8 - Medicamentos Potencialmente Perigosos <span class="float-right q-mr-lg text-caption">Orientações</span>
          </div>
          <div class="col-9">
            <!-- <span class="float-left q-mt-sm text-overline">: </span> -->
            <q-option-group
              inline
              v-model="round.quadro_8_medicamentos.obj"
              :options="round.quadro_8_medicamentos.opt"
              color="primary"
              type="checkbox"
              @input="(v) => v.length ? round.quadro_8_medicamentos.acao = 'S' : round.quadro_8_medicamentos.acao = 'N' "
            />
          </div>
          <div class="col-3 text-right q-pr-sm">
            <q-option-group
              inline
              disable
              v-model="round.quadro_8_medicamentos.acao"
              :options="[{label: 'Sim', value: 'S'}, {label: 'N/A', value: 'N'}]"
              color="primary"
            />
          </div>
        </div>

        <!-- Quadro Social -->
        <div class="row q-mt-md">
          <div
            class="col-12 q-pa-xs bg-grey-4 text-bold"
            style="font-size: 16px"
          >
            9 - Social <span class="float-right q-mr-lg text-caption">Orientações</span>
          </div>
          <div class="col-9">
            <!-- <span class="float-left q-mt-sm text-overline">: </span> -->
            <q-option-group
              inline
              v-model="round.quadro_9_social.obj"
              :options="round.quadro_9_social.opt"
              color="primary"
              type="checkbox"
              @input="(v) => v.length ? round.quadro_9_social.acao = 'S' : round.quadro_9_social.acao = 'N' "
            />
            <q-input
              v-show="round.quadro_9_social.obj.includes('o')"
              square
              class="q-mx-sm"
              outlined
              dense
              v-model="round.quadro_9_social.input"
              label="Outros:"
            />
          </div>
          <div class="col-3 text-right q-pr-sm">
            <q-option-group
              inline
              disable
              v-model="round.quadro_9_social.acao"
              :options="[{label: 'Sim', value: 'S'}, {label: 'N/A', value: 'N'}]"
              color="primary"
            />
          </div>
        </div>

        <!-- Quadro Suicídio -->
        <div class="row q-mt-md">
          <div
            class="col-12 q-pa-xs bg-grey-4 text-bold"
            style="font-size: 16px"
          >
            10 - Suicídio <span class="text-caption">(Escala IRIS)</span> <span class="float-right q-mr-lg text-caption">Orientações</span>
          </div>
          <div class="col-9">
            <!-- <span class="float-left q-mt-sm text-overline">: </span> -->
            <q-option-group
              inline
              v-model="round.quadro_10_suicidio.obj"
              :options="round.quadro_10_suicidio.opt"
              color="primary"
              @input="(v) => !round.quadro_10_suicidio.obj || round.quadro_10_suicidio.obj == '5rb'  ? round.quadro_10_suicidio.acao = 'N' : round.quadro_10_suicidio.acao = 'S' "
            />
          </div>
          <div class="col-3 text-right q-pr-sm">
            <q-option-group
              inline
              disable
              v-model="round.quadro_10_suicidio.acao"
              :options="[{label: 'Sim', value: 'S'}, {label: 'N/A', value: 'N'}]"
              color="primary"
            />
          </div>
        </div>

        <!-- Quadro Nutricional -->
        <div class="row q-mt-md">
          <div
            class="col-12 q-pa-xs bg-grey-4 text-bold"
            style="font-size: 16px"
          >
            11 - Nutricional <span class="text-caption">(Escala NRS 2002)</span> <span class="float-right q-mr-lg text-caption">Orientações</span>
          </div>
          <div class="col-9">
            <!-- <span class="float-left q-mt-sm text-overline">: </span> -->
            <q-option-group
              inline
              v-model="round.quadro_11_nutricional.obj"
              :options="round.quadro_11_nutricional.opt"
              color="primary"
              @input="(v) => !round.quadro_11_nutricional.obj || round.quadro_11_nutricional.obj == '0sr'  ? round.quadro_11_nutricional.acao = 'N' : round.quadro_11_nutricional.acao = 'S' "
            />
          </div>
          <div class="col-3 text-right q-pr-sm">
            <q-option-group
              inline
              disable
              v-model="round.quadro_11_nutricional.acao"
              :options="[{label: 'Sim', value: 'S'}, {label: 'N/A', value: 'N'}]"
              color="primary"
            />
          </div>
        </div>

        <!-- Quadro Dependência Funcional - Exibir somente na UTI -->
        <div
          class="row q-mt-md"
          v-if="paciente.CD_CLASSIF_SETOR !== 3"
        >
          <div
            class="col-12 q-pa-xs bg-grey-4 text-bold"
            style="font-size: 16px"
          >
            12 - Dependência Funcional <span class="text-caption">(Escala CPAX)</span> <span class="float-right q-mr-lg text-caption">Orientações</span>
          </div>
          <div class="col-9">
            <!-- <span class="float-left q-mt-sm text-overline">: </span> -->
            <q-option-group
              type="radio"
              inline
              v-model="round.quadro_12_dependencia.obj"
              :options="round.quadro_12_dependencia.opt"
              color="primary"
              @input="(v) => !round.quadro_12_dependencia.obj ? round.quadro_12_dependencia.acao = 'N' : round.quadro_12_dependencia.acao = 'S' "
            />
          </div>
          <div class="col-3 text-right q-pr-sm">
            <q-option-group
              inline
              disable
              v-model="round.quadro_12_dependencia.acao"
              :options="[{label: 'Sim', value: 'S'}, {label: 'N/A', value: 'N'}]"
              color="primary"
            />
          </div>
        </div>

        <!-- Quadro declínio Funcional - Exibir somente na UI -->
        <div
          class="row q-mt-md"
          v-if="paciente.CD_CLASSIF_SETOR === 3"
        >
          <div
            class="col-12 q-pa-xs bg-grey-4 text-bold"
            style="font-size: 16px"
          >
            12 - Declínio Funcional <span class="text-caption">(Escala IMS)</span> <span class="float-right q-mr-lg text-caption">Orientações</span>
          </div>
          <div class="col-9">
            <!-- <span class="float-left q-mt-sm text-overline">: </span> -->
            <q-option-group
              type="radio"
              inline
              v-model="round.quadro_12_declinio.obj"
              :options="round.quadro_12_declinio.opt"
              color="primary"
              @input="(v) => !round.quadro_12_declinio.obj ? round.quadro_12_declinio.acao = 'N' : round.quadro_12_declinio.acao = 'S' "
            />
          </div>
          <div class="col-3 text-right q-pr-sm">
            <q-option-group
              inline
              disable
              v-model="round.quadro_12_declinio.acao"
              :options="[{label: 'Sim', value: 'S'}, {label: 'N/A', value: 'N'}]"
              color="primary"
            />
          </div>
        </div>

        <!-- Quadro Longa Permanência - Exibir somente para paciente na UTI -->
        <div
          class="row q-mt-md"
          v-if="paciente.CD_CLASSIF_SETOR !== 3"
        >
          <div
            class="col-12 q-pa-xs bg-grey-4 text-bold"
            style="font-size: 16px"
          >
            13 - Longa Permanência <span class="float-right q-mr-lg text-caption">Orientações</span>
          </div>
          <div class="col-9">
            <!-- <span class="float-left q-mt-sm text-overline">: </span> -->
            <q-option-group
              type="radio"
              inline
              v-model="round.quadro_13_permanencia.obj"
              :options="round.quadro_13_permanencia.opt"
              color="primary"
              @input="(v) => {
                if (!round.quadro_13_permanencia.obj ||
                  round.quadro_13_permanencia.obj == 'b' ||
                  round.quadro_13_permanencia.obj == 'm') {
                    round.quadro_13_permanencia.acao = 'N'
                } else {
                  round.quadro_13_permanencia.acao = 'S'
                }
              }"
            />
          </div>
          <div class="col-3 text-right q-pr-sm">
            <q-option-group
              inline
              disable
              v-model="round.quadro_13_permanencia.acao"
              :options="[{label: 'Sim', value: 'S'}, {label: 'N/A', value: 'N'}]"
              color="primary"
            />
          </div>
        </div>

      </div>

      <!-- Papel do Paciente e Familia na Segurança -->
      <div class="q-ma-sm shadow-4 q-mb-lg">
        <q-card class="full-width no-border-radius q-pa-sm text-center text-bold bg-black text-white">
          PAPEL DO PACIENTE E FAMÍLIA NA SEGURANÇA
        </q-card>
        <div class="q-pa-sm">
          <p
            v-for="(orientacao, i) in cOrientacoes"
            :key="i"
          >
            {{orientacao}}
          </p>
        </div>

        <!-- Readback e Parentesco -->
        <div class="row q-pa-sm">
          <div class="col">
            <q-input
              square
              class="q-mx-sm"
              outlined
              dense
              v-model="round.dados_read_back.readback"
              label="Readback feito por"
            />
          </div>
          <div class="col">
            <q-select
              square
              class="q-mx-sm"
              outlined
              dense
              :options="cParentesco"
              v-model="round.dados_read_back.parentesco"
              label="Parentesco"
            />
          </div>
        </div>
      </div>

      <!-- RECONCILIAÇÃO MEDICAMENTOSA -->
      <div class="q-ma-sm shadow-4 q-mb-lg">
        <q-card class="full-width no-border-radius q-pa-sm text-center text-bold bg-black text-white">
          RECONCILIAÇÃO MEDICAMENTOSA
        </q-card>
        <div class="row items-center justify-between q-mt-md">
          <div class="col-xs-12 col-sm-6">
            <q-input
              square
              class="q-mx-sm"
              outlined
              dense
              v-model="dadosMedicamento.medicamento"
              label="Medicamento"
            />
          </div>
          <div class="col-xs-6 col-sm-3 q-pl-md q-pt-xs q-gutter-sm">
            <q-radio
              dense
              :keep-color="true"
              v-model="dadosMedicamento.reconciliado"
              val="Reconciliado"
              color="positive"
              label="Reconciliado"
              @input="$refs.inputMotivoNaoReconciliacao.resetValidation()"
            />
            <q-radio
              dense
              :keep-color="true"
              v-model="dadosMedicamento.reconciliado"
              val="Não Reconciliado"
              color="warning"
              label="Não Reconciliado"
            />
          </div>
          <div class="col-xs-3 col-sm-2 text-right q-px-md order-sm-last">
            <q-btn
              class="q-pa-xs"
              color="info"
              icon="add"
              no-caps
              @click="adicionarMedicamentoEmUso"
            />
          </div>
          <div class="col-xs-12 col-sm-9">
            <q-input
              ref="inputMotivoNaoReconciliacao"
              v-show="dadosMedicamento.reconciliado == 'Não Reconciliado'"
              square
              filled
              hide-bottom-space
              class="q-mt-md q-mx-sm"
              dense
              v-model="dadosMedicamento.motivo"
              label="Motivo da não reconciliação"
              :rules="[
                val => dadosMedicamento.reconciliado == 'Não Reconciliado' && !!val || 'Obrigatório!'
              ]"
            />
          </div>
        </div>
        <q-separator class="q-my-md" />
        <ol>
          <li
            v-for="(item, idx) in round.dados_medicamentos_em_uso"
            :key="idx"
          >
            <q-item>
              <q-item-section>
                <q-item-label>{{ item.medicamento }} </q-item-label>
                <q-item-label :class="{
                    'text-positive text-bold': item.reconciliado == 'Reconciliado',
                    'text-warning text-bold': item.reconciliado == 'Não Reconciliado'

                    }"> {{ item.reconciliado }} </q-item-label>
                <q-item-label
                  caption
                  v-show="item.reconciliado == 'Não Reconciliado'"
                >Motivo: {{ item.motivo }}</q-item-label>
              </q-item-section>
              <q-item-section
                top
                side
              >
                <q-btn
                  class="bg-grey-3"
                  color="negative"
                  size="12px"
                  flat
                  dense
                  round
                  icon="delete"
                  @click="removerMedicamentoEmUso(idx)"
                />
              </q-item-section>
            </q-item>
            <q-separator spaced />
          </li>
        </ol>

      </div>

      <!-- O QUE IMPORTA PARA VOCÊ? -->
      <div class="q-ma-sm shadow-4 q-mb-lg">
        <q-card class="full-width no-border-radius q-pa-sm text-center text-bold bg-black text-white">
          O QUE IMPORTA PARA VOCÊ?
        </q-card>
        <div class="row q-pa-sm">
          <div class="col">
            <q-input
              class="q-mt-md"
              v-model="round.dados_o_que_importa.importaTextArea"
              outlined
              autogrow
              label="O que importa?"
              type="textarea"
            />
          </div>
        </div>
        <div class="row q-mt-sm q-pa-sm">
          <div class="col">
            <div class="row">
              <div class="col-12 text-bold q-mt-sm">
                Necessita de Assistência Especial:
              </div>
              <div class="col-12">
                <q-option-group
                  inline
                  v-model="round.dados_o_que_importa.assistenciaEspecial"
                  :options="optAssistenciaEspecial"
                  color="primary"
                  type="checkbox"
                />
              </div>
            </div>
          </div>
          <q-separator vertical />
          <div class="col q-ml-sm">
            <div class="row q-pa-sm q-gutter-md q-mr-sm">
              <div class="col-12 text-bold"> Pessoa indicada para tomar decisões em seu nome, caso necessário. </div>
              <div class="col-12">
                <q-input
                  :clearable="true"
                  square
                  outlined
                  dense
                  v-model="round.dados_o_que_importa.pessoaIndicadaDecisoes.nome"
                  label="Nome"
                />
              </div>
              <div class="col-12">
                <q-select
                  square
                  outlined
                  dense
                  :options="cParentesco"
                  v-model="round.dados_o_que_importa.pessoaIndicadaDecisoes.parentesco"
                  label="Parentesco"
                />
              </div>
            </div>
          </div>
        </div>
        <q-separator spaced />
        <div class="row q-mt-sm justify-end q-mb-lg">
          <div class="col-xs-7">
            <q-input
              square
              outlined
              dense
              :clearable="true"
              v-model="pessoaBloquear"
              label="Pessoa que não deseja receber"
            />
          </div>
          <div class="col-xs-4">
            <q-btn
              dense
              class="q-ml-md q-pa-xs q-px-sm"
              color="info"
              icon="add"
              no-caps
              @click="adicionarPessoaBloqueada"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <ol>
              <li
                v-for="(pessoa, idx) in round.dados_o_que_importa.pessoasBloqueadas"
                :key="idx"
              >
                <q-item>
                  <q-item-section>
                    <q-item-label>{{ pessoa }} </q-item-label>
                  </q-item-section>
                  <q-item-section
                    top
                    side
                  >
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn
                        class="gt-xs"
                        color="negative"
                        size="12px"
                        flat
                        dense
                        round
                        icon="delete"
                        @click="removerPessoaBloqueada(idx)"
                      />
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator spaced />
              </li>
            </ol>
          </div>
        </div>

      </div>

      <!-- PLANO TERAPÊUTICO -->
      <div class="q-ma-sm shadow-4 q-mb-lg">
        <q-card class="full-width no-border-radius q-pa-sm text-center text-bold bg-black text-white">
          PLANO TERAPÊUTICO
        </q-card>
        <div class="row q-mt-sm q-pa-sm q-gutter-sm justify-start items-center">
          <div class="col-4">
            Previsão de Alta:
          </div>
          <div class="col-xs-7 col-sm-3">
            <q-input
              dense
              v-model="round.dados_plano_terapeutico.previsaoAlta"
              square
              outlined
              type="date"
            />
          </div>
        </div>
        <div class="row q-mt-sm q-pa-sm q-gutter-sm justify-start items-center">
          <div class="col-4">
            Decisão sobre acesso venoso (Magic®):
          </div>
          <div class="col-7">
            <q-option-group
              inline
              v-model="round.dados_plano_terapeutico.acessoVenosoMagic"
              :options="optAcessoVenoso"
              color="primary"
              type="checkbox"
            />
          </div>
        </div>
        <div class="row q-mt-sm q-pa-sm q-gutter-sm justify-start items-center">
          <div class="col-4">
            Preferência por horário de banho:
          </div>
          <div class="col-7">
            <q-option-group
              inline
              v-model="round.dados_plano_terapeutico.horarioBanho"
              :options="optHorarioBanho"
              color="primary"
            />
          </div>
        </div>
        <div class="row q-pa-sm">
          <div class="col">

            <fieldset
              class="q-pa-sm"
              style="border: 4px ridge #ececec; font-family: Arial, sans-serif; padding: lOpx;"
            >
              <legend class="text-bold q-ma-sm">ORIENTAÇÕES</legend>
              <div class="q-pa-sm">
                <p
                  v-for="(orientacaoTec, i) in cOrientacoesTecnicas"
                  :key="i"
                  v-html="formataQuebra(orientacaoTec)"
                >
                  <!-- <div v-html="formataQuebra(orientacaoTec)" /> -->
                </p>
                <q-input
                  class="q-mt-md"
                  v-model="round.dados_plano_terapeutico.textPlanoComplementar"
                  filled
                  autogrow
                  label="Orientações Complementares"
                  type="textarea"
                />
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div
        :class="{'blockOverlayDiv': avaliacaoSalva}"
        class="print-hide"
      >
      </div>
    </div>
    <div class="row q-mx-lg q-pa-sm">
      <div class="col text-left">
        <q-btn
          ripple
          push
          flat
          color="negative"
          class="bg-padrao"
          icon="arrow_back"
          label="Voltar"
          @click="$router.go(-1)"
        />
      </div>

      <!-- Retirado impressão em funçao da incompatibilidade com o mobile.
          Desenhar geração do pdf pelo backend e exibição no front. -->
      <!-- <div class="col text-right">
            <q-btn
              ripple
              push
              color="secondary"
              icon="print"
              label="Imprimir"
              @click="ImprimirAvaliacao"
            />
          </div> -->

      <div class="col text-right">
        <q-btn
          ripple
          push
          color="positive"
          icon="save"
          label="Salvar"
          @click="salvarPlanoTerapeutico"
        />
      </div>
    </div>

    <PrintModel
      v-if="montarRelatorioModelo"
      id="PrintAvaliacao"
      :corpo="dadosImpressao"
      :imprimirRelatorio.sync="imprimirRelatorio"
    />

  </div>
</template>
<script>

import { SalvarPlanoTerapeuticoPaciente } from '../../../services/roundUTI'
import PlanoTerapeuticoDataMixin from './PlanoTerapeuticoDataMixin'
import PlanoTerapeuticoMethodsMixin from './PlanoTerapeuticoMethodsMixin'
import PlanoTerapeuticoComputedMixin from './PlanoTerapeuticoComputedMixin'
import PrintModel from './PrintModel'

export default {
  name: 'PlanoTerapeutico',
  components: { PrintModel },
  mixins: [PlanoTerapeuticoDataMixin, PlanoTerapeuticoMethodsMixin, PlanoTerapeuticoComputedMixin],
  data () {
    return {
      montarRelatorioModelo: false,
      imprimirRelatorio: false,
      dadosImpressao: ''
    }
  },
  methods: {
    montarTextoEvolucao () {
      const evolucao = `
      ${this.retornarTextoPlano()} \n\n
      ${this.textoPapelPacienteFamilia()} \n\n
      ${this.textoReconciliacaoMedicamentosa()} \n\n
      ${this.textoImportaPraVoce()} \n\n
      ${this.textoPlanoTerapéutico()} \n\n

      `
      return evolucao
    },
    salvarPlanoTerapeutico () {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente salvar? Confirme se todos os campos estão preenchidos, não existe possibilidade de edição.`,
        ok: {
          label: `Confirmar`,
          color: 'positive'
        },
        cancel: {
          label: 'Cancelar',
          color: 'negative',
          class: 'bg-padrao'
        },
        persistent: true
      }).onOk(() => {
        const round = { ...this.round }
        const evolucao = this.montarTextoEvolucao()
        const planoTerapeutico = this.textoPlanoTerapéutico()
        const data = {
          ...this.paciente,
          nm_usuario: this.$store.state.usuario.usuarioTasy.NM_USUARIO,
          cd_medico: this.$store.state.usuario.usuarioTasy.CD_PESSOA_FISICA,
          round,
          evolucao,
          planoTerapeutico
        }

        SalvarPlanoTerapeuticoPaciente(data)
          .then(res => {
            this.avaliacaoSalva = true
            this.$toast.success(`<p>Evolução criada: ${res.data.evolucao_tasy}</p>`, 'Sucesso!')
          })
          .catch(err => {
            this.$toast.error(`<p>${JSON.stringify(err.response)}</p>`,
              'Ops! Encontramos algum erro...')
          })
      })
    },
    ImprimirAvaliacao () {
      this.dadosImpressao = this.montarTextoEvolucao()
      this.imprimirRelatorio = !this.imprimirRelatorio
    }
  },
  mounted () {
    this.montarRelatorioModelo = true
  }

}
</script>
<style scoped>
.blockOverlayDiv {
  position: absolute;
  width: calc(100% - 20px);
  left: 10px;
  height: 100%;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 500;
  cursor: pointer;
}
@media print {
  .blockOverlayDiv {
    display: none;
  }
}
</style>
