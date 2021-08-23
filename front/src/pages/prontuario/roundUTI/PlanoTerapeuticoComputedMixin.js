export default {
  computed: {

    cQuadro_3_infeccao () {
      const paciente = this.$store.state.admissao.pacienteSelecionado
      let opt = this.round.quadro_3_infeccao.opt
      if (paciente.CD_CLASSIF_SETOR == 3) {
        return opt.filter(obj => obj.value != 'pav')
      }
      return opt
    },
    cOrientacoes () {
      let textOrientacao = []
      const keys = Object.keys({
        ...this.$data.round
      }).filter(obj => obj.substring(0, 6) === 'quadro')
      keys.map(elem => {
        const orientacoes = this.$data.round[elem].orientacoes || []
        orientacoes.map(o => {
          const objComparacao = this.$data.round[elem][o.gatilho] || []
          if (o.valor === objComparacao || objComparacao.includes(o.valor)) {
            textOrientacao.push(o.orientacao)
          }
        })
      })
      return textOrientacao
    },
    cOrientacoesTecnicas () {
      let textOrientacoesTecnicas = []
      const keys = Object.keys({
        ...this.$data.round
      }).filter(obj => obj.substring(0, 6) === 'quadro')
      keys.map(elem => {
        const orientacoesTecnicas = this.$data.round[elem].orientacoesTecnicas || []
        orientacoesTecnicas.map(o => {
          const objComparacao = this.$data.round[elem][o.gatilho] || []
          if (o.valor === objComparacao || objComparacao.includes(o.valor)) {
            textOrientacoesTecnicas.push(o.orientacao)
          }
        })
      })
      return textOrientacoesTecnicas
    },
    cParentesco () {
      let data = [{
        value: 'pais',
        label: 'Pais',
        tratamento: 'Pai/Mãe'
      },
      {
        value: 'avos',
        label: 'Avós',
        tratamento: 'Avó/Avô'
      },
      {
        value: 'conjuge',
        label: 'Cônjuge',
        tratamento: 'Cônjuge'
      },
      {
        value: 'companheiro',
        label: 'Companheiro(a)',
        tratamento: 'Companheiro(a)'
      },
      {
        value: 'filho',
        label: 'Filho(a)',
        tratamento: 'Filho(a)'
      },
      {
        value: 'neto',
        label: 'Neto(a)',
        tratamento: 'Neto(a)'
      },
      {
        value: 'bisneto',
        label: 'Bisneto(a)',
        tratamento: 'Bisneto(a)'
      },
      {
        value: 'irmaos',
        label: 'Irmãos',
        tratamento: 'Irmão(ã)'
      },
      {
        value: 'tios',
        label: 'Tios(as)',
        tratamento: 'Tio(a)'
      },
      {
        value: 'sobrinhos',
        label: 'Sobrinhos(as)',
        tratamento: 'Sobrinho(a)'
      },
      {
        value: 'primo',
        label: 'Primo(a)',
        tratamento: 'Primo(a)'
      },
      {
        value: 'sogro',
        label: 'Sogro(a)',
        tratamento: 'Sogro(a)'
      },
      {
        value: 'genro',
        label: 'Genro',
        tratamento: 'Genro'
      },
      {
        value: 'nora',
        label: 'Nora',
        tratamento: 'Nora'
      },
      {
        value: 'cunhado',
        label: 'Cunhado(a)',
        tratamento: 'Cunhado(a)'
      },
      {
        value: 'amigo',
        label: 'Amigo(a)',
        tratamento: 'Amigo(a)'
      }
      ]
      return data.sort((a, b) => {
        if (a.value > b.value) {
          return 1
        } else {
          return -1
        }
      })
    }
  }
}
