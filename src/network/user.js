import http from './request'

export function userLogin(signInData) {
  const url = '/private/v1/login';
  return http.get(url, {
    params: signInData
  })
}
