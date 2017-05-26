import { isPromise } from './promise';

export function logCall(func) {
  return (...args) => {
    info(func.name, 'called with:', ...args);
    return logResponse(func)(...args);
  }
}

export function logResponse(func) {
  return (...args) => {
    const result = func(...args);
    if (isPromise(result)) {
      result.then(logPrefixed(`${func.name} resolved:`));
    }
    info(func.name, 'returned:', result)
    return result;
  }

}

export function logPrefixed(message) {
  return (...args) => {
    info(message, ...args);
  };
}

export function info(...args) {
  console.log('[info]', ...args);
}
