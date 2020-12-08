const key =  'homeActivePath';

export function setActivePath(path) {
  window.sessionStorage.setItem(key, path);
}

export function getActivePath() {
  const path = window.sessionStorage.getItem(key);
  return path || '';
}