import '../lib/hot-reload';
import { connect, registerFunctions } from './messaging/rpc';
import * as storage from './storage/store';
import { logCall } from './logging';

chrome.browserAction.onClicked.addListener(tab => {
  connect(tab).call('togglePopup');
});

registerFunctions(wrapAll({ fetchRecipeParser, updateRecipeParser }, logCall));

function fetchRecipeParser({ host, path }) {
  return storage.get(host + path)
    .then(result => (result ? result : storage.get(host)))
    .then(result => result || []);
}

function updateRecipeParser({ host, path }, parser) {
  return Promise.all([
    storage.put(host + path, [parser]),
    appendParser(host, parser),
  ]);
}

function appendParser(key, parser) {
  return storage.get(key)
    .then(savedParsers => appendIfNew(savedParsers || [], parser))
    .then(parsers => storage.put(key, parsers));
}

function appendIfNew(parsers, newParser) {
  if (!contains(parsers, newParser)) {
    parsers.push(newParser);
  }
  return parsers;
}

function contains(parsers, newParser) {
  const stringified = JSON.stringify(newParser);
  return parsers.some(parser => JSON.stringify(parser) === stringified);
}

function wrapAll(functionMap, wrapper) {
  return Object.entries(functionMap).reduce((result, [name, func]) => {
    result[name] = wrapper(func);
    return result;
  }, {});
}
