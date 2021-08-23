import request from './request'

export function ListarSetores () {
  return request({
    url: `/admissoes/lista-setores/`,
    method: 'get'
  })
}

export function ListarPacientesSetor (setor) {
  return request({
    url: `/admissoes/lista-pacientes-setor/?setor=${setor}`,
    method: 'get'
  })
}
