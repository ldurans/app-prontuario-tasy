import request from './request'

export function SalvarPlanoTerapeuticoPaciente (data) {
  return request({
    url: `/admissoes/salvar-round-uti-paciente/`,
    method: 'post',
    data: data
  })
}
