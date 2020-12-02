export function saveUserToken(user) {
  window.sessionStorage.setItem('user', JSON.stringify(user));
}

export function getUserToken() {
  return window.sessionStorage.getItem('user');
}

export function delUserToken() {
  if ( getUserToken() ) {
    window.sessionStorage.removeItem('user');
    return true;
  }
}