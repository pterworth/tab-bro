<script setup>
const takeScreenshot = () => {
  chrome.tabs.captureVisibleTab(null, { format: 'png' }, function (dataUrl) {
    // Create a new Blob object
    const blob = new Blob(
      [
        `<html><body style="margin: 0; padding: 0;"><img src="${dataUrl}" alt="Screenshot" style="width: 100%; height: auto;"><a href="${dataUrl}" download="screenshot.png">Download Screenshot</a></body></html>`
      ],
      { type: 'text/html' }
    );
    // Create a URL for the Blob object
    const url = URL.createObjectURL(blob);
    // Open the URL in a new tab
    window.open(url);
  });
};

const takeFullPageScreenshot = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'captureFullPage' },
      function (response) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else if (response && response.fullPageDataUrl) {
          const fullPageDataUrl = response.fullPageDataUrl;
          // Create a new Blob object
          const blob = new Blob(
            [
              `<html><body style="margin: 0; padding: 0;"><img src="${fullPageDataUrl}" alt="Screenshot" style="width: 100%; height: auto;"><a href="${fullPageDataUrl}" download="full_page_screenshot.png">Download Full Page Screenshot</a></body></html>`
            ],
            { type: 'text/html' }
          );
          // Create a URL for the Blob object
          const url = URL.createObjectURL(blob);
          // Open the URL in a new tab
          window.open(url);
        }
      }
    );
  });
};
</script>

<template>
  <button @click="takeScreenshot">Window</button>
  <button @click="takeFullPageScreenshot">Full Page</button>
</template>

<style lang="scss" scoped></style>
