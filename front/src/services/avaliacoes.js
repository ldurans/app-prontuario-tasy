import request from './request'

export function ListarAvaliacoes (params) {
  return request({
    url: `/avaliacoes/lista/${params.nr_atendimento}/`,
    method: 'get',
    params
  })
}
