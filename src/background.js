import '../lib/hot-reload';
import { connect, registerFunctions } from './messaging/rpc';
import * as storage from './storage/store';
import { logCall } from './logging';

chrome.browserAction.onClicked.addListener(tab => {
  connect(tab).call('togglePopup');
});

registerFunctions({
  fetchRecipeParser: logCall(storage.get),
  updateRecipeParser: logCall(storage.put),
});

