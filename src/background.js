import '../lib/hot-reload';
import { connect, registerFunctions } from './messaging/rpc';

console.log('loaded');

chrome.browserAction.onClicked.addListener(tab => {
  connect(tab).call('togglePopup');
});

const CACHE = {};

registerFunctions({
  onTabLoaded: host => fetchRecipeParser(host)
});

function fetchRecipeParser(key) {
  const parser = CACHE[key] || buildEmptyRecipeParser();
  CACHE[key] = parser;
  return parser;
}

function buildEmptyRecipeParser() {
  return {
    title: { name: 'title' },
    ingredients: { name: 'ingredients' },
    method: { name: 'method' },
  };
}
