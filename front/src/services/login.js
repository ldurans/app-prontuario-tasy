import request from './request'

export function Login (data) {
  return request({
    url: `/login/`,
    method: 'post',
    data: data
  })
}
