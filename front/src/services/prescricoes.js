import request from './request'

export function ListarPrescricoes (params) {
  return request({
    url: `/prescricoes/lista/${params.nr_atendimento}/`,
    method: 'get',
    params
  })
}

export function BuscarPrescricao (params) {
  return request({
    url: `/prescricoes/buscar/${params.nr_atendimento}/${params.nr_prescricao}/`,
    method: 'get',
    params
  })
}
