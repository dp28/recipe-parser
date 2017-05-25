export function addEventListener(eventType, listener, root = document) {
  root.addEventListener(eventType, listener);
}

export function removeEventListener(eventType, listener, root = document) {
  root.removeEventListener(eventType, listener);
}

export function addEventListeners(listenerMap, root = document) {
  Object.keys(listenerMap).forEach((eventType) => {
    addEventListener(eventType, listenerMap[eventType], root);
  });
}

export function removeEventListeners(listenerMap, root = document) {
  Object.keys(listenerMap).forEach((eventType) => {
    removeEventListener(eventType, listenerMap[eventType], root);
  });
}

export function extractTarget(func) {
  return event => func(event.target);
}
