const DEFAULT_URL = 'https://www.google.com/';

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

// Intercept new tab creation
chrome.tabs.onCreated.addListener((tab) => {
  // Check if pendingUrl or url is chrome://newtab/
  const url = tab.pendingUrl || tab.url;

  if (url === 'chrome://newtab/' || url === 'chrome://new-tab-page/') {
    chrome.storage.sync.get(['redirectUrl'], (result) => {
      const targetUrl = result.redirectUrl || DEFAULT_URL;
      chrome.tabs.update(tab.id, { url: targetUrl });
    });
  }
});
