import request from './request'

export function ListarEvolucoes (params) {
  return request({
    url: `/evolucoes/lista/${params.nr_atendimento}/`,
    method: 'get',
    params
  })
}
