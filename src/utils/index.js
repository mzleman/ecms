function _releaseTimeout (timer) {
  clearTimeout(timer);
  timer = null;
}

export function throttle (fn, timeout) {
  let timer, fisrtTime = true;
  return function (...args) {
    if(timer) return;
    if(fisrtTime) {
      fn.apply(this, args);
      fisrtTime = false;
    }
    timer = setTimeout( _ => {
      _releaseTimeout(timer);
      fn.apply(this, args);
    }, timeout)
    return true;
  } 
}

export function debounce (fn, timeout) {
  let timer;
  return function(...args) {
    timer && _releaseTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      _releaseTimeout(timer);
    }, timeout);
  }
}