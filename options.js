const urlInput = document.getElementById('url');
const saveBtn = document.getElementById('save');
const clearBtn = document.getElementById('clear');
const statusEl = document.getElementById('status');

// Load saved URL
chrome.storage.sync.get(['redirectUrl'], (result) => {
  if (result.redirectUrl) {
    urlInput.value = result.redirectUrl;
  }
});

// Save URL
saveBtn.addEventListener('click', () => {
  const url = urlInput.value.trim();

  if (!url) {
    showStatus('Enter URL', 'error');
    return;
  }

  // Basic URL validation
  if (!url.startsWith('http://') && !url.startsWith('https://') && url !== 'about:blank') {
    showStatus('URL must start with http:// or https://', 'error');
    return;
  }

  chrome.storage.sync.set({ redirectUrl: url }, () => {
    showStatus('Saved!', 'success');
  });
});

// Clear URL
clearBtn.addEventListener('click', () => {
  chrome.storage.sync.remove(['redirectUrl'], () => {
    urlInput.value = '';
    showStatus('Settings reset', 'success');
  });
});

// Preset buttons
document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.dataset.url;
    urlInput.value = url;
    chrome.storage.sync.set({ redirectUrl: url }, () => {
      showStatus('Saved!', 'success');
    });
  });
});

// Show status message
function showStatus(message, type) {
  statusEl.textContent = message;
  statusEl.className = 'status ' + type;

  setTimeout(() => {
    statusEl.className = 'status';
  }, 3000);
}
