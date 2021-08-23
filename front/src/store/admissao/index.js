const admissao = {
  state: {
    setorSelecionado: null,
    resetPacienteSelecionado: {
      CD_PESSOA_FISICA: null,
      CD_UNIDADE: null,
      CD_UNIDADE_BASICA: null,
      CD_UNIDADE_COMPL: null,
      CD_CLASSIF_SETOR: null,
      DS_STATUS_UNIDADE: null,
      DT_ENTRADA: null,
      DT_ENTRADA_UNIDADE: null,
      DT_NASCIMENTO: null,
      DT_PREVISTO_ALTA: null,
      IE_ALTA_MEDICA: null,
      IE_STATUS_UNIDADE: null,
      NM_COLAB_RESP: null,
      NM_GUERRA: null,
      NM_MEDICO_RESP: null,
      NM_PESSOA_FISICA: null,
      NM_PESSOA_FISICA_REAL: null,
      NR_ATENDIMENTO: null,
      QT_PONTUACAO_MEWS: null
    },
    pacienteSelecionado: {
      CD_PESSOA_FISICA: null,
      CD_UNIDADE: null,
      CD_UNIDADE_BASICA: null,
      CD_UNIDADE_COMPL: null,
      CD_CLASSIF_SETOR: null,
      DS_STATUS_UNIDADE: null,
      DT_ENTRADA: null,
      DT_ENTRADA_UNIDADE: null,
      DT_NASCIMENTO: null,
      DT_PREVISTO_ALTA: null,
      IE_ALTA_MEDICA: null,
      IE_STATUS_UNIDADE: null,
      NM_COLAB_RESP: null,
      NM_GUERRA: null,
      NM_MEDICO_RESP: null,
      NM_PESSOA_FISICA: null,
      NM_PESSOA_FISICA_REAL: null,
      NR_ATENDIMENTO: null,
      QT_PONTUACAO_MEWS: null
    }
  },
  mutations: {
    SET_SETOR_PACIENTES (state, setor) {
      state.setorSelecionado = setor
    },
    RESET_SETOR_PACIENTES (state) {
      state.setorSelecionado = null
    },
    SET_PACIENTES_SELECIONADO (state, paciente) {
      state.pacienteSelecionado = paciente
    },
    RESET_PACIENTES_SELECIONADO (state) {
      state.pacienteSelecionado = state.resetPacienteSelecionado
    }
  }
}

export default admissao
