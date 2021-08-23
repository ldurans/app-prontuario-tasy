import request from './request'

export function ListarLaudos (params) {
  return request({
    url: `/laudos/lista/${params.cd_pessoa_fisica}/`,
    method: 'get',
    params
  })
}
