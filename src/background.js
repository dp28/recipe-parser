import '../lib/hot-reload';

chrome.browserAction.onClicked.addListener(tab => {
  sendToTab(tab, { type: 'TOGGLE_POPUP' })
});

function sendToTab(tab, message) {
  chrome.tabs.sendMessage(tab.id, message);
}
