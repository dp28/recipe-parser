import '../lib/hot-reload';
import { connect, registerFunctions } from './messaging/rpc';

console.log('loaded');

chrome.browserAction.onClicked.addListener(tab => {
  connect(tab).call('togglePopup');
});

const Cache = {};

registerFunctions({ fetchRecipeParser, updateRecipeParser });

function fetchRecipeParser(key) {
  const parser = Cache[key] || buildEmptyRecipeParser();
  Cache[key] = parser;
  return parser;
}

function updateRecipeParser(key, parser) {
  Cache[key] = parser;
}

function buildEmptyRecipeParser() {
  return {
    title: { name: 'title' },
    ingredients: { name: 'ingredients' },
    method: { name: 'method' },
  };
}
