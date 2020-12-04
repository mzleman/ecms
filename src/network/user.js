import http from './request'

export function userLogin(signInData) {
  const url = '/login';
  return http.get(url, {
    params: signInData
  })
}
