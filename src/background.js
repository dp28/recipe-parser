import '../lib/hot-reload';
import { connect, registerFunctions } from './messaging/rpc';
import * as storage from './storage/store';
import { logCall } from './logging';

chrome.browserAction.onClicked.addListener(tab => {
  connect(tab).call('togglePopup');
});

registerFunctions(wrapAll({ fetchRecipeParser, updateRecipeParser }, logCall));

function fetchRecipeParser(url) {
  return applyWithFallback(storage.get, url);
}

function updateRecipeParser({ host, path }, parser) {
  return Promise.all([
    storage.put(host + path, parser),
    updateIfMoreComplete(host, parser),
  ]);
}

function updateIfMoreComplete(storageKey, newParser) {
  const newCompleteness = calculateCompletenessRatio(newParser);

  return storage.get(storageKey).then((storedParser) => {
    if (!storedParser || newCompleteness > calculateCompletenessRatio(storedParser)) {
      return storage.put(storageKey, newParser);
    }
  });
}

function applyWithFallback(func, { host, path }) {
  return func(host + path).then(result => result ? result : func(host));
}

function wrapAll(functionMap, wrapper) {
  return Object.entries(functionMap).reduce((result, [name, func]) => {
    result[name] = wrapper(func);
    return result;
  }, {});
}

function calculateCompletenessRatio(parser) {
  return Object
    .values(parser.fields)
    .reduce((sum, field) => field.value ? sum + 1 : sum, 0);
}
