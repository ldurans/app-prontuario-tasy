const Setores = {
  path: '/',
  component: () => import('layouts/Layout.vue'),
  children: [{
    path: 'setores',
    name: 'setores',
    redirect: 'lista-setores',
    component: () => import('pages/setores/Index.vue'),
    children: [{
      path: '',
      name: 'lista-setores',
      component: () => import('pages/setores/ListaSetores')
    },
    {
      path: '/pacientes-setor',
      name: 'pacientes-setor',
      component: () => import('pages/setores/PacientesSetor')
    }
    ]
  }]
}

export default Setores
