const layout = () => import('pages/prontuario/Index')

const Prontuario = {
  path: '/prontuario',
  name: 'prontuario',
  // redirect: 'prontuario/paciente',
  component: layout,
  children: [
    {
      path: '/prontuario/round',
      name: 'round',
      component: () => import('pages/prontuario/roundUTI/PlanoTerapeutico')
    },
    {
      path: '/prontuario/evolucoes',
      name: 'evolucoes',
      component: () => import('pages/prontuario/evolucao/EvolucaoPaciente')
    },
    {
      path: '/prontuario/avaliacoes',
      name: 'avaliacoes',
      component: () => import('pages/prontuario/avaliacoes/Index')
    },
    {
      path: '/prontuario/laudos',
      name: 'laudos',
      component: () => import('pages/prontuario/laudos/Index')
    },
    {
      path: '/prontuario/prescricoes',
      name: 'prescricoes',
      component: () => import('pages/prontuario/prescricoes/Index')
    }
  ]
}

// const Round = {
//   path: '/round',
//   name: 'round',
//   redirect: '/round-uti',
//   component: layout,
//   children: [{
//     path: '/round-uti',
//     name: 'round-uti',
//     component: () => import('pages/prontuario/roundUTI/PlanoTerapeutico')
//   }]
// }

// Prontuario.push(Round)

export default Prontuario
