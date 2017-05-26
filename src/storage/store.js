const Storage = chrome.storage.sync;

export function get(key) {
  return new Promise((resolve) => {
    Storage.get(key, result => {
      console.log('resolve', key, result[key])
      resolve(result[key])});
  });
}

export function put(key, value) {
  return new Promise((resolve) => {
    Storage.set({ [key]: value }, resolve);
  });
}
