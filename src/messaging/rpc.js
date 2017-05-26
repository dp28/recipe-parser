import { isPromise } from '../promise';

export function registerFunctions(functionMap) {
  chrome.runtime.onMessage.addListener((message, sender, respond) => {
    const callback = functionMap[message.functionName];
    if (callback) {
      return applyFunction(callback, message.args, respond);
    }
    else {
      console.error(`function ${message.functionName} has not been registered`);
    }
  });
}

function applyFunction(func, args, respond) {
  const result = func(...args);

  if (isPromise(result)) {
    result.then(respond);
    return true;
  } else {
    respond(result);
  }
}

export function connect(tab = null) {
  return {
    call: (functionName, ...args) => new Promise((resolve) => {
      sendMessage(tab, { functionName, args }, resolve);
    }),
  }
}

function sendMessage(tab, message, callback) {
  if (tab) {
    chrome.tabs.sendMessage(tab.id, message, callback);
  }
  else {
    chrome.runtime.sendMessage(message, callback);
  }
}
