export function addEventListener(eventType, listener, root = document) {
  root.addEventListener(eventType, listener);
}

export function removeEventListener(eventType, listener, root = document) {
  root.removeEventListener(eventType, listener);
}

export function addEventListeners(listenerMap, root = document) {
  Object.keys(listenerMap).forEach((eventType) => {
    const listener = listenerMap[eventType];
    if (listener.useCapture) {
      root.addEventListener(eventType, listener.listener, true);
    } else {
      addEventListener(eventType, listener, root);
    }
  });
}

export function removeEventListeners(listenerMap, root = document) {
  Object.keys(listenerMap).forEach((eventType) => {
    const listener = listenerMap[eventType];
    if (listener.useCapture) {
      root.removeEventListener(eventType, listener.listener, true);
    } else {
      removeEventListener(eventType, listener, root);
    }
  });
}

export function extractTarget(func) {
  return event => func(event.target);
}
