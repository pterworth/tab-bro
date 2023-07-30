chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'captureVisibleTab') {
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, function (dataUrl) {
      sendResponse({ dataUrl: dataUrl });
    });
    return true; // Will respond asynchronously.
  }
});
