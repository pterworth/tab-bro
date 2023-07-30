// screenshot.js (content-script)

import html2canvas from 'html2canvas';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Received request:', request);
  if (request.action === 'captureFullPage') {
    try {
      captureFullPage(sendResponse);
      return true; // Will respond asynchronously.
    } catch (error) {
      console.error('Error capturing full page:', error);
      sendResponse({ error: error.message });
    }
  }
});

function captureFullPage(sendResponse) {
  html2canvas(document.body, {
    useCORS: true, // Use CORS to capture images from external domains
    scrollY: -window.scrollY, // Capture the entire page, including off-screen content
    allowTaint: true // Allow images from other domains
  }).then(function (canvas) {
    // Convert the canvas to a Data URL and send it back to the popup
    const fullPageDataUrl = canvas.toDataURL('image/png');
    sendResponse({ fullPageDataUrl });
  });
}
