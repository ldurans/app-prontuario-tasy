import moment from 'moment'

export default {
  methods: {
    formataQuebra (texto) {
      let str = texto.toString()
      // eslint-disable-next-line no-control-regex
      return str.replace(new RegExp('\r?\n', 'g'), '<br />')
    },
    formataData (data, f = 'DD/MM/YYYY HH:mm') {
      if (data == null) {
        return ''
      } else {
        return moment(data).format(f)
      }
    },
    adicionarMedicamentoEmUso () {
      const item = {
        ...this.dadosMedicamento
      }
      if (item.reconciliado != 'Reconciliado' && !item.motivo) {
        this.$toast.error('Informe o motivo para o medicamento "NÃO RECONCILIADO".', 'Ops!')
        return
      }
      this.round.dados_medicamentos_em_uso.push(item)
      this.dadosMedicamento = {
        medicamento: null,
        reconciliado: 'Reconciliado',
        motivo: null
      }
    },
    removerMedicamentoEmUso (index) {
      this.$delete(this.round.dados_medicamentos_em_uso, index)
    },
    adicionarPessoaBloqueada () {
      this.round.dados_o_que_importa.pessoasBloqueadas.push(this.pessoaBloquear)
      this.pessoaBloquear = null
    },
    removerPessoaBloqueada (index) {
      this.$delete(this.round.dados_o_que_importa.pessoasBloqueadas, index)
    },
    textoOpt (opt, obj, input = null) {
      let texto = ''
      opt.map((e) => {
        try {
          if (obj.includes(e.value)) {
            if (e.value === 'o' && input) {
              texto += `(X) ${e.label}: ${input}\n`
            } else {
              texto += `(X) ${e.label}\n`
            }
          }
          if (!obj.includes(e.value)) {
            texto += `( ) ${e.label}\n`
          }
        } catch (error) {
          if (obj === e.value) {
            if (e.value === 'o' && input) {
              texto += `(X) ${e.label}: ${input}\n`
            } else {
              texto += `(X) ${e.label}\n`
            }
          }
          if (obj !== e.value) {
            texto += `( ) ${e.label}\n`
          }
        }
      })
      return texto
    },
    retornarTextoPlano () {
      this.textoPlano = ''
      const CD_CLASSIF_SETOR = this.$store.state.admissao.pacienteSelecionado.CD_CLASSIF_SETOR
      let keys = Object.keys({
        ...this.$data.round
      }).filter(obj => obj.substring(0, 6) === 'quadro')

      if (CD_CLASSIF_SETOR === 3) {
        keys = keys.filter(obj => (obj != 'quadro_12_dependencia' && obj != 'quadro_13_permanencia'))
      }

      if (CD_CLASSIF_SETOR !== 3) {
        keys = keys.filter(obj => obj != 'quadro_12_declinio')
      }

      keys.reduce((text, elem) => {
        const obj = this.$data.round[elem].obj
        let opt = this.$data.round[elem].opt
        const input = this.$data.round[elem].input
        const acao = this.$data.round[elem].acao
        const label = this.$data.round[elem].label
        const stAcao = acao === 'S' ? '(X) Sim ( ) N/A' : '( ) Sim (X) N/A \n'
        this.textoPlano += `\n ${label} --------------------------------------------- ${stAcao} \n`

        // retirar PAV quando paciente da UI
        if (elem == 'quadro_3_infeccao' && CD_CLASSIF_SETOR === 3) {
          opt = opt.filter(obj => obj.value != 'pav')
        }

        opt.map((e) => {
          try {
            if (obj.includes(e.value)) {
              if (e.value === 'o' && input) {
                this.textoPlano += `(X) ${e.label}: ${input}\n`
              } else {
                this.textoPlano += `(X) ${e.label}\n`
              }
            }
            if (!obj.includes(e.value)) {
              this.textoPlano += `( ) ${e.label}\n`
            }
          } catch (error) {
            if (obj === e.value) {
              if (e.value === 'o' && input) {
                this.textoPlano += `(X) ${e.label}: ${input}\n`
              } else {
                this.textoPlano += `(X) ${e.label}\n`
              }
            }
            if (obj !== e.value) {
              this.textoPlano += `( ) ${e.label}\n`
            }
          }
        })
        return this.textoPlano
      }, '')
      return this.textoPlano
    },
    textoPapelPacienteFamilia () {
      let textoPacienteFamilia = ''
      for (let i in this.cOrientacoes) {
        textoPacienteFamilia += this.cOrientacoes[i]
      }
      let texto = ' \n ------------------- PAPEL DO PACIENTE E FAMÍLIA NA SEGURANÇA ------------------- \n \n '
      texto += textoPacienteFamilia + ' \n \n '
      texto += 'Read back: ' + this.round.dados_read_back.readback + ' --------------- Grau Parentesco: ' + this.round.dados_read_back.parentesco.tratamento
      return texto
    },
    textoReconciliacaoMedicamentosa () {
      const medicamentosEmUso = this.round.dados_medicamentos_em_uso
      let texto = ' \n \n ------------------- RECONCILIAÇÃO MEDICAMENTOSA ------------------- \n \n '
      for (let i in medicamentosEmUso) {
        const motivo = !medicamentosEmUso[i].motivo ? ''
          : medicamentosEmUso[i].reconciliado !== 'Reconciliado' ? `Motivo: ${medicamentosEmUso[i].motivo} \n ` : ''
        texto += `-> Medicamento: ${medicamentosEmUso[i].medicamento} \n ` +
          `   ${medicamentosEmUso[i].reconciliado} \n ` + `   ${motivo} \n `
      }
      return texto
    },
    textoImportaPraVoce () {
      let texto = `\n ------------------- O QUE IMPORTA PARA VOCÊ ------------------- \n \n `
      const textImporta = !this.round.dados_o_que_importa.importaTextArea ? ' \n ' : `${this.round.dados_o_que_importa.importaTextArea} \n`
      texto += '-> O que importa? \n' + textImporta
      texto += `\n-> Necessita de Assistência Especial: \n` +
        `${this.textoOpt(this.optAssistenciaEspecial, this.round.dados_o_que_importa.assistenciaEspecial)} \n`

      texto += `\n-> Pessoa indicada para tomar decisões em seu nome, caso necessário.\n` +
        `   - Nome: ${this.round.dados_o_que_importa.pessoaIndicadaDecisoes.nome} --- Grau parentesco: ${this.round.dados_o_que_importa.pessoaIndicadaDecisoes.parentesco.tratamento} \n`

      texto += `\n-> Pessoa(s) que não deseja receber: \n`

      for (let p in this.round.dados_o_que_importa.pessoasBloqueadas) {
        texto += `   - ${this.round.dados_o_que_importa.pessoasBloqueadas[p]} \n`
      }

      return texto
    },
    textoOrientacoesTecnicas () {
      let textoTecnico = ''
      for (let i in this.cOrientacoesTecnicas) {
        let str = this.cOrientacoesTecnicas[i] || ''
        str = str.toString().replace(new RegExp('&emsp;', 'g'), '')
        textoTecnico += str
      }
      let texto = ' \n ## ORIENTAÇÕES PLANO TERAPÊUTICO  ## \n \n '
      texto += textoTecnico + ' \n \n '
      return texto
    },
    textoPlanoTerapéutico () {
      let texto = `\n ------------------- PLANO TERAPÊUTICO ------------------- \n\n`
      texto += `-> Previsão de alta: ${this.formataData(this.round.dados_plano_terapeutico.previsaoAlta, 'DD/MM/YYYY')} \n \n`
      texto += `-> Decisão sobre acesso venoso (Magic®): \n`
      texto += `${this.textoOpt(this.optAcessoVenoso, this.round.dados_plano_terapeutico.acessoVenosoMagic)} \n`
      texto += `-> Preferência por horário de banho: \n`
      texto += `${this.textoOpt(this.optHorarioBanho, this.round.dados_plano_terapeutico.horarioBanho)} \n`
      texto += this.textoOrientacoesTecnicas()
      texto += ' \n\n -- ORIENTAÇÕES COMPLEMENTARES DO PLANO  -- \n \n'
      texto += this.round.dados_plano_terapeutico.textPlanoComplementar
      return texto
    }

  }
}
