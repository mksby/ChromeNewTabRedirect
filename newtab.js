const DEFAULT_URL = 'https://www.google.com/';

chrome.storage.sync.get(['redirectUrl'], (result) => {
  const url = result.redirectUrl || DEFAULT_URL;
  window.location.replace(url);
});
