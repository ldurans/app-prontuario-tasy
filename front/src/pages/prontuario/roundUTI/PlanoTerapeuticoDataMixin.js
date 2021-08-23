export default {
  data () {
    return {
      round: {
        quadro_1_delirio: {
          label: '1 - Delirio',
          obj: [],
          acao: null,
          input: null,
          opt: [{
            label: '> 60 anos',
            value: '60anos'
          },
          {
            label: 'Défict cognitivo ou sensorial',
            value: 'dcs'
          },
          {
            label: 'Lesão estrutural SNC',
            value: 'les'
          },
          {
            label: 'Uso de drogas associadas e delirium',
            value: 'udad'
          },
          {
            label: 'Doença psiquiátrica',
            value: 'dp'
          },
          {
            label: 'Etilismo ou drogadição',
            value: 'ed'
          },
          {
            label: 'Outros',
            value: 'o'
          }
          ],
          // orientação deve ser o que será escrito como orientação
          // gatilho será o campo do objeto quadro* que deve ser monitorado para disparar a orientação
          // valor é o valor monitorado para que, ao gatilho assumir o valor informado, a orientação seja disparada
          orientacoes: [{
            orientacao: '1 - Delírio: manter o paciente informado quanto a data, o local onde ele está e assuntos relevantes \n ',
            gatilho: 'acao',
            valor: 'S'
          }],
          orientacoesTecnicas: [{
            orientacao: '1 - Delírio: \n ' +
              '   &emsp; a) Manter o paciente informado quanto a data, hora, o local onde ele está e sobre \n' +
              '   &emsp;  assuntos relevantes (por exemplo, resultado da partida de seu time de futebol \n' +
              '   &emsp;  ou das eleições). \n',
            gatilho: 'acao',
            valor: 'S'
          }]
        },
        quadro_2_flebite: {
          label: '2 - Flebite',
          obj: [],
          acao: null,
          input: null,
          opt: [{
            label: '> 65 anos',
            value: '65anos'
          },
          {
            label: 'Uso de ATB, medicação vesicante ou irritante',
            value: 'atbmvi'
          },
          {
            label: 'Rede venosa desfavorável ou frágil',
            value: 'rvdf'
          },
          {
            label: 'Acesso IV periférico > 96h',
            value: 'ap96h'
          },
          {
            label: 'Outros',
            value: 'o'
          }

          ],
          orientacoes: [{
            orientacao: '2 - Flebite: observar no local de punção dor, vermelhidão, inchaço ou se o curativo está sujo \n ',
            gatilho: 'acao',
            valor: 'S'
          }],
          orientacoesTecnicas: [{
            orientacao: '2 - Flebite: \n' +
              '   &emsp; a) Avaliar o sítio de inserção em todos os turnos (matutino, vespertino e noturno) \n' +
              '   &emsp; b) Retirar o acesso venoso nas seguintes situações: \n' +
              '     &emsp; &emsp; i) Na suspeita de contaminação; \n' +
              '     &emsp; &emsp; ii) Sempre que o paciente referir queixas no local da punção; \n' +
              '     &emsp; &emsp; iii) Na ocorrência de mau funcionamento, obstrução ou extravasamento. \n' +
              '   &emsp; c) Usar fixação e coberturas apropriadas que permitam a visualização do sítio de punção. \n' +
              '   &emsp; d) Registrar no curativo a data de troca do mesmo. \n' +
              '   &emsp; e) Adequar a diluição dos medicamentos \n',
            gatilho: 'acao',
            valor: 'S'
          }]
        },
        quadro_3_infeccao: {
          label: '3 - Infecção relacionada à assistência à saúde',
          obj: [],
          acao: 'S',
          opt: [{
            label: 'PAV',
            value: 'pav'
          },
          {
            label: 'ITU-SV',
            value: 'isv'
          },
          {
            label: 'ICS-CVC',
            value: 'icvc'
          }
          ],
          orientacoes: [{
            // deixar 2 tabs no inicio para representar recuo ao salvar no Tasy
            orientacao: '3 - Infecção relacionada à assistência à saúde \n ' +
              '   Solicitar aos profissionais de saúde que higienizem as mãos antes de manipular o paciente \n ',
            gatilho: 'acao',
            valor: 'S'
          },
          {
            // deixar 2 tabs no inicio para representar recuo ao salvar no Tasy
            orientacao: '   PAV: manter cabeceira elevada de 30 a 45 graus e conservar a higiene da boca \n ',
            gatilho: 'obj',
            valor: 'pav'
          },
          {
            // deixar 2 tabs no inicio para representar recuo ao salvar no Tasy
            orientacao: '   ITU-SV: Não desconectar os tubos da sonda e do coletor de urina, manter a pinça aberta (exceção: transporte), manter a bolsa coletora abaixo do nível da bexiga e esvaziar quando passar da metade \n ',
            gatilho: 'obj',
            valor: 'isv'
          },
          {
            // deixar 2 tabs no inicio para representar recuo ao salvar no Tasy
            orientacao: '   ICS-CVC: solicitar a higienização das mãos antes da manipulação do paciente \n ',
            gatilho: 'obj',
            valor: 'icvc'
          }
          ],
          orientacoesTecnicas: [{
            orientacao: '3) Infecção Relacionada à Assistência à Saúde (IRAS): \n' +
              '   &emsp; a) Realizar higienização das mãos com álcool-gel sempre antes e após manipular o paciente. \n',
            gatilho: 'acao',
            valor: 'S'
          },
          {
            orientacao: '4) Pneumonia Associada à Ventilação Mecânica (PAV): \n' +
              '   &emsp; a) Manter a cabeceira elevada entre 30 e 45°; \n' +
              '   &emsp; b) Prescrever profilaxia de sangramento digestivo e tromboembolismo venoso (TEV); \n' +
              '   &emsp; c) Realizar interrupção diária da sedação e teste de respiração espontânea; \n' +
              '   &emsp; d) Manter aspiração subglótica contínua; \n' +
              '   &emsp; e) Verificar a pressão do balonete em todos os turnos (matutino, vespertino e noturno); \n' +
              '   &emsp; f) Garantir a higiene oral. \n',
            gatilho: 'obj',
            valor: 'pav'
          },
          {
            orientacao: '5) Infecção do Trato Urinário associada à Sonda Vesical (ITU-SV): \n' +
              '   &emsp; a) Manter o sistema fechado e a extremidade de drenagem protegida; \n' +
              '   &emsp; b) Fixar corretamente a sonda de acordo com o sexo do paciente; \n' +
              '   &emsp; c) Garantir que o fluxo de urina esteja desobstruído (exceto durante o transporte, \n' +
              '     &emsp;&emsp;  quando o sistema de drenagem deverá ser mantido fechado para evitar o \n' +
              '     &emsp;&emsp;  refluxo de urina do coletor); \n' +
              '   &emsp; d) Posicionar a bolsa coletora abaixo do nível da bexiga; \n' +
              '   &emsp; e) Drenar a diurese quando a bolsa coletora estiver preenchida na metade da sua capacidade total. \n',
            gatilho: 'obj',
            valor: 'isv'
          },
          {
            orientacao: '6) Infecção de Corrente Sanguínea Associada à Cateter Venoso (ICS-CV): \n' +
              '   &emsp; a) Avaliar o sítio de inserção em todos os turnos (matutino, vespertino e noturno); \n' +
              '   &emsp; b) Retirar o acesso venoso nas seguintes situações: \n' +
              '      &emsp; &emsp; i) Na suspeita de contaminação; \n' +
              '      &emsp; &emsp; ii) Sempre que o paciente referir queixas no local da punção; \n' +
              '      &emsp; &emsp; iii) Na ocorrência de mau funcionamento, obstrução, extravasamento ou sinais flogísticos. \n' +
              '   &emsp; c) Usar fixação e coberturas apropriadas que permitam a visualização do sítio de punção. \n' +
              '   &emsp; d) Registrar no curativo a data de troca do mesmo. \n',
            gatilho: 'obj',
            valor: 'icvc'
          }
          ]
        },
        quadro_4_lesao: {
          label: '4 - Lesão por pressão (Escala de Braden)',
          obj: null,
          acao: null,
          opt: [{
            label: '> 18 pontos - sem risco',
            value: '18sr'
          },
          {
            label: '15 a 18 pontos - risco baixo',
            value: '1518rb'
          },
          {
            label: '13 a 14 pontos - risco moderado',
            value: '1314rm'
          },
          {
            label: '10 a 12 pontos - risco alto',
            value: '1012ra'
          },
          {
            label: '<= 9 pontos - risco muito alto',
            value: '9rma'
          }

          ],
          orientacoes: [{
            // deixar 2 tabs no inicio para representar recuo ao salvar no Tasy
            orientacao: '4 - Lesão por pressão: participar no controle da mobilização do paciente para a poltrona, da mudança de decúbito a \n ' +
              'cada 2 horas e na troca de fraldas sempre que houver eliminação de urina ou fezes \n ',
            gatilho: 'acao',
            valor: 'S'
          }],
          orientacoesTecnicas: [{
            orientacao: '7) Lesão por Pressão (LPP): \n' +
              '   &emsp; a) Usar creme de barreira, placas e espuma com silicone; \n' +
              '   &emsp; b) Garantir o atingimento do aporte nutricional completo e do valor energético total \n' +
              '      &emsp; &emsp;programado para o paciente; \n' +
              '   &emsp; c) Manter a temperatura do quarto entre 22 e 24o Celsius; \n' +
              '   &emsp; d) Instalar colchão pneumático e coxins; \n' +
              '   &emsp; e) Mudar o decúbito de acordo com o protocolo da unidade; \n' +
              '   &emsp; f) Trocar as fraldas imediatamente após as eliminações fisiológicas, garantindo \n' +
              '      &emsp; &emsp;que a mesma esteja sempre seca. \n',
            gatilho: 'acao',
            valor: 'S'
          }]
        },
        quadro_5_queda: {
          label: '5 - Queda (Escala de MORSE)',
          obj: null,
          acao: null,
          opt: [{
            label: '0 a 24 pontos - risco baixo',
            value: '024rb'
          },
          {
            label: '25 a 44 pontos - risco moderado',
            value: '2544rm'
          },
          {
            label: '>= 45 pontos - risco alto',
            value: '45ra'
          }
          ],
          orientacoes: [{
            // deixar 2 tabs no inicio para representar recuo ao salvar no Tasy
            orientacao: '5 - Queda: manter cama baixa e com grades elevadas, campainha de chamada ao alcance do paciente, o quarto \n ' +
              'sempre iluminado (luminosidade baixa a noite), não se levantar rapidamente e ter um acompanhante sempre que sair do leito \n ',
            gatilho: 'acao',
            valor: 'S'
          }],
          orientacoesTecnicas: [{
            orientacao: '8) Queda: \n' +
              '   &emsp; a) Avaliar a independência e a autonomia para deambulação e a necessidade de \n' +
              '      &emsp; &emsp;utilizar um dispositivo de assistência à marcha (por exemplo, andador, muleta ou \n' +
              '      &emsp; &emsp;bengala); \n' +
              '   &emsp; b) Manter: \n' +
              '      &emsp; &emsp; i) As grades do leito elevadas; \n' +
              '      &emsp; &emsp; ii) A cama baixa; \n' +
              '      &emsp; &emsp; iii) A campainha de chamada ao alcance do paciente; \n' +
              '      &emsp; &emsp; iv) O quarto sempre iluminado (luminosidade baixa a noite); \n' +
              '   &emsp; c) Solicitar que o paciente use calçados antiderrapantes; \n' +
              '   &emsp; d) Instruir o paciente a não se levantar rapidamente; \n' +
              '   &emsp; e) Orientar o paciente a não sair do leito sem o auxílio de um membro da equipe \n' +
              '      &emsp; &emsp;de saúde; \n' +
              '   &emsp; f) Alocar o paciente próximo ao posto de enfermagem, sempre que possível. \n',
            gatilho: 'acao',
            valor: 'S'
          }]
        },
        quadro_6_tromboembolismo: {
          label: '6 - Tromboembolismo venoso',
          obj: null,
          acao: null,
          opt: [{
            label: 'Risco baixo',
            value: 'rb'
          },
          {
            label: 'Risco intermediário',
            value: 'ri'
          },
          {
            label: 'Risco alto',
            value: 'ra'
          }
          ],
          orientacoes: [{
            // deixar 2 tabs no inicio para representar recuo ao salvar no Tasy
            orientacao: '6 - Tromboembolismo venoso: incentivar a deambulação quando permitido \n ',
            gatilho: 'acao',
            valor: 'S'
          }],
          orientacoesTecnicas: [{
            orientacao: '9) Tromboembolismo Venoso (TEV): \n' +
              '   &emsp; a) Prescrever profilaxia de acordo com o protocolo: \n' +
              '      &emsp; &emsp; i) Química; \n' +
              '      &emsp; &emsp; ii) Mecânica; \n' +
              '      &emsp; &emsp; iii) Deambulação precoce. \n',
            gatilho: 'acao',
            valor: 'S'
          }]
        },
        quadro_7_broncoaspiracao: {
          label: '7 - Broncoaspiração',
          obj: [],
          acao: null,
          opt: [{
            label: '>= 60 anos',
            value: '60anos'
          },
          {
            label: 'Antecedente de disfagia ou aspiração',
            value: 'ada'
          },
          {
            label: 'Ter durante às refeições: tosse, esgasgo, ruminação, dispneia ou restos alimentares',
            value: 'tdrterdra'
          },
          {
            label: 'Fragilidade',
            value: 'f'
          },
          {
            label: 'Vômitos',
            value: 'v'
          },
          {
            label: 'Glasgow < 9',
            value: 'g9'
          },
          {
            label: 'Doença neurológica: convulsão, TCE, AVC, demência',
            value: 'dnctad'
          },
          {
            label: 'Doença esofágica: DRGE, hérnia hiatal, dismotilidade, obstrução',
            value: 'dedhdo'
          },
          {
            label: 'TOT / TQT / SNE / GTM',
            value: 'ttsg'
          }
          ],
          orientacoes: [{
            // deixar 2 tabs no inicio para representar recuo ao salvar no Tasy
            orientacao: '7 - Broncoaspiração: cabeceira 30 a 45°; não dar comida ou água sem autorização ou se estiver sonolento \n ',
            gatilho: 'acao',
            valor: 'S'
          }],
          orientacoesTecnicas: [{
            orientacao: '10) Broncoaspiração: \n' +
              '   &emsp; a) Manter a cabeceira elevada entre 30 e 45°; \n' +
              '   &emsp; b) Evitar dar comida ou água por via oral sem autorização da equipe de saúde ou \n' +
              '      &emsp; &emsp;se o paciente estiver sonolento; \n' +
              '   &emsp; c) Avaliar a interrupção da dieta em caso de vômitos ou constipação intestinal \n' +
              '      &emsp; &emsp;severa. \n',
            gatilho: 'acao',
            valor: 'S'
          }]
        },
        quadro_8_medicamentos: {
          label: '8 - Medicamentos Potencialmente Perigosos',
          obj: [],
          acao: null,
          opt: [{
            label: 'Drogas vasoativas',
            value: 'dv'
          },
          {
            label: 'Betabloqueadores IV',
            value: 'b'
          },
          {
            label: 'Anestésicos / sedativos IV',
            value: 'as'
          },
          {
            label: 'Anticoagulantes / antiagregantes',
            value: 'aa'
          },
          {
            label: 'Insulina / hipoglicemiantes VO',
            value: 'ih'
          },
          {
            label: 'Eletrólitos',
            value: 'e'
          },
          {
            label: 'Antiarrítmicos IV',
            value: 'a'
          },
          {
            label: 'Bloqueadores neuromusculares',
            value: 'bn'
          },
          {
            label: 'Opiodes VO ou IV',
            value: 'ovi'
          },
          {
            label: 'Anfotericina B',
            value: 'ab'
          }
          ],
          orientacoes: [{
            // deixar 2 tabs no inicio para representar recuo ao salvar no Tasy
            orientacao: '8 - Medicamentos Potencialmente Perigosos: certificar-se que o medicamento é mesmo para o seu paciente e avisar \n' +
              'imediatamente qualquer reação a medicação \n ',
            gatilho: 'acao',
            valor: 'S'
          }],
          orientacoesTecnicas: [{
            orientacao: '11) Segurança medicamentosa: \n' +
              '   &emsp; a) Garantir que estejam corretos: \n' +
              '      &emsp; &emsp; i) O paciente; \n' +
              '      &emsp; &emsp; ii) O medicamento; \n' +
              '      &emsp; &emsp; iii) A via de administração; \n' +
              '      &emsp; &emsp; iv) A hora; \n' +
              '      &emsp; &emsp; v) A dose. \n' +
              '   &emsp; b) Notificar imediatamente as reações adversas. \n',
            gatilho: 'acao',
            valor: 'S'
          }]
        },
        quadro_9_social: {
          label: '9 - Social',
          obj: [],
          acao: null,
          input: null,
          opt: [{
            label: 'Ausência de suporte familiar',
            value: 'asf'
          },
          {
            label: 'Conflitos ou disputas familiares',
            value: 'cdf'
          },
          {
            label: 'Insuficiência de recursos financeiros',
            value: 'irf'
          },
          {
            label: 'Maus tratos pela família ou comunidade',
            value: 'mtfc'
          },
          {
            label: 'Não residente na cidade',
            value: 'nrc'
          },
          {
            label: 'Múltiplas internações',
            value: 'mi'
          },
          {
            label: 'Outros',
            value: 'o'
          }
          ],
          orientacoes: [{
            // deixar 2 tabs no inicio para representar recuo ao salvar no Tasy
            orientacao: '9 - Social: manter o ambiente calmo e moderar o número de visitas \n ',
            gatilho: 'acao',
            valor: 'S'
          }],
          orientacoesTecnicas: [{
            orientacao: '12) Social: \n' +
              '   &emsp; a) Manter o ambiente calmo e moderar o número de visitas. \n',
            gatilho: 'acao',
            valor: 'S'
          }]
        },
        quadro_10_suicidio: {
          label: '10 - Suicídio (Escala IRIS)',
          obj: null,
          acao: null,
          opt: [{
            label: '< 5 - risco baixo',
            value: '5rb'
          },
          {
            label: '>= 5 e < 10 - risco médio',
            value: '510rm'
          },
          {
            label: '>= 10 - risco alto',
            value: '10ra'
          }

          ],
          orientacoes: [{
            // deixar 2 tabs no inicio para representar recuo ao salvar no Tasy
            orientacao: '10 - Suicídio: manter o paciente acompanhado por familiar ou cuidador 24 horas, não permitir que tenha acesso a \n ' +
              'remédios ou materiais que possam causar lesões (facas, instrumentos pontiagudos, cintos, cordas etc.), não permitir \n ' +
              'que vá ao banheiro sozinho ou se tranque \n ',
            gatilho: 'acao',
            valor: 'S'
          }],
          orientacoesTecnicas: [{
            orientacao: '13) Suicídio: \n' +
              '   &emsp; a) Vigilância 24 horas: \n' +
              '      &emsp; &emsp; i) Manter o paciente acompanhado por familiar ou cuidador 24 horas; \n' +
              '      &emsp; &emsp; ii) Não permitir que o paciente tenha acesso a remédios ou materiais que \n' +
              '          &emsp; &emsp; possam causar lesões (facas, instrumentos pontiagudos, cintos, cordas etc.); \n' +
              '      &emsp; &emsp; iii) Não permitir que vá ao banheiro sozinho ou se tranque em qualquer ambiente. \n',
            gatilho: 'acao',
            valor: 'S'
          }]
        },
        quadro_11_nutricional: {
          label: '11 - Nutricional (Escala NRS 2002)',
          obj: null,
          acao: null,
          opt: [{
            label: '0 - sem risco',
            value: '0sr'
          },
          {
            label: '1 - risco leve',
            value: '1rl'
          },
          {
            label: '2 - risco moderado',
            value: '2rm'
          },
          {
            label: '3 - risco grave',
            value: '3rg'
          }
          ],
          orientacoes: [{
            // deixar 2 tabs no inicio para representar recuo ao salvar no Tasy
            orientacao: '11 - Nutricional: Garantir que o paciente receba toda a alimentação que for enviada.  \n' +
              'Caso não ocorra, informar o quanto foi aceito \n ',
            gatilho: 'acao',
            valor: 'S'
          }],
          orientacoesTecnicas: [{
            orientacao: '14) Nutricional: \n' +
              '   &emsp; a) Garantir que o paciente receba toda a alimentação que for enviada. Caso isto \n' +
              '      &emsp; &emsp;não ocorra, informar o quanto foi aceito. \n',
            gatilho: 'acao',
            valor: 'S'
          }]
        },
        // Item somente pra UTI
        quadro_12_dependencia: {
          label: '12 - Dependência Funcional (Escala CPAX)',
          obj: null,
          acao: null,
          opt: [{
            label: '49 a 50 - risco baixo',
            value: '4950rb'
          },
          {
            label: '30 a 48 - risco moderado',
            value: '3048rm'
          },
          {
            label: '0 a 29 - risco alto',
            value: '029ra'
          }

          ],
          orientacoes: [{
            // deixar 2 tabs no inicio para representar recuo ao salvar no Tasy
            orientacao: '12 - Dependência funcional: incentivar a movimentação e a participação na fisioterapia \n ',
            gatilho: 'acao',
            valor: 'S'
          }],
          orientacoesTecnicas: [{
            orientacao: '15) Dependência funcional: \n' +
              '   &emsp; a) Incentivar a mobilização precoce e a participação na fisioterapia. \n',
            gatilho: 'acao',
            valor: 'S'
          }]
        },
        // item somente para UI
        quadro_12_declinio: {
          label: '12 - Declínio Funcional (Escala IMS)',
          obj: null,
          acao: null,
          opt: [{
            label: '0 a 4 - alta dependência',
            value: '04ad'
          },
          {
            label: '5 a 7 - média dependência',
            value: '57md'
          },
          {
            label: '8 a 10 - baixa dependência',
            value: '810bd'
          }

          ],
          orientacoes: [{
            // deixar 2 tabs no inicio para representar recuo ao salvar no Tasy
            orientacao: '12 - Declínio funcional: incentivar a movimentação e a participação na fisioterapia \n ',
            gatilho: 'acao',
            valor: 'S'
          }],
          orientacoesTecnicas: [{
            orientacao: '15) Declínio funcional: \n' +
              '   &emsp; a) Incentivar a mobilização precoce e a participação na fisioterapia. \n',
            gatilho: 'acao',
            valor: 'S'
          }]
        },
        quadro_13_permanencia: {
          label: '13 - Longa Permanência',
          obj: null,
          acao: null,
          opt: [{
            label: 'Baixo',
            value: 'b'
          },
          {
            label: 'Moderado',
            value: 'm'
          },
          {
            label: 'Alto',
            value: 'a'
          },
          {
            label: 'Muito Alto',
            value: 'ma'
          }

          ],
          orientacoesTecnicas: [{
            orientacao: '16) Longa permanência: \n' +
              '   &emsp; a) Identificar precocemente os fatores que possam ser barreiras a desospitalização. \n',
            gatilho: 'acao',
            valor: 'S'
          }]
        },
        dados_read_back: {
          readback: null,
          parentesco: {
            label: '',
            tratamento: '',
            value: ''
          }
        },
        dados_o_que_importa: {
          importaTextArea: null,
          assistenciaEspecial: [],
          pessoaIndicadaDecisoes: {
            nome: null,
            parentesco: {
              label: '',
              tratamento: '',
              value: ''
            }
          },
          pessoasBloqueadas: []

        },
        dados_medicamentos_em_uso: [],
        dados_plano_terapeutico: {
          previsaoAlta: null,
          acessoVenosoMagic: [],
          horarioBanho: null,
          textPlanoComplementar: ''
        }

      },
      avaliacaoSalva: false,
      paciente: this.$store.state.admissao.pacienteSelecionado,
      dadosMedicamento: {
        medicamento: null,
        reconciliado: 'Reconciliado',
        motivo: null
      },
      optAssistenciaEspecial: [{
        label: 'Linguagem',
        value: 'Linguagem'
      },
      {
        label: 'Auditiva',
        value: 'Auditiva'
      },
      {
        label: 'Visual',
        value: 'Visual'
      },
      {
        label: 'Cognitiva',
        value: 'Cognitiva'
      },
      {
        label: 'Acessibilidade',
        value: 'Acessibilidade'
      }
      ],
      pessoaBloquear: null,
      optAcessoVenoso: [{
        label: 'Periférico',
        value: 'p'
      },
      {
        label: 'CVC',
        value: 'cvc'
      },
      {
        label: 'PICC',
        value: 'picc'
      },
      {
        label: 'Tunelizado',
        value: 't'
      },
      {
        label: 'Port-a-Catch',
        value: 'pc'
      }
      ],
      optHorarioBanho: [{
        label: 'De 8:30h às 9:30h',
        value: 'd830h930h'
      },
      {
        label: 'De 9:30h às 10:30h',
        value: 'd930h1030h'
      },
      {
        label: 'De 14:30h às 17:00h',
        value: 'd1430h1700h'
      }
      ],
      horarioBanho: null,
      textoPlano: ''
    }
  }
}
