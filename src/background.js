import '../lib/hot-reload';
import { connect, registerFunctions } from './messaging/rpc';
import * as storage from './storage/store';

chrome.browserAction.onClicked.addListener(tab => {
  connect(tab).call('togglePopup');
});

registerFunctions({
  fetchRecipeParser: storage.get,
  updateRecipeParser: storage.put,
});
