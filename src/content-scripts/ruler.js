// A variable to keep track of whether the ruler is currently enabled
let rulerEnabled = false;

// Function to toggle the ruler on/off
function toggleRuler(enabled) {
  rulerEnabled = enabled;
  if (enabled) {
    // Add event listeners for mousemove and mouseout
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseout', onMouseOut);
  } else {
    // Remove event listeners when ruler is disabled
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseout', onMouseOut);
  }
}

// Function to handle mouse movement
function onMouseMove(event) {
  // Get the current mouse position
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Use mouseX and mouseY to draw the ruler on the webpage
  // For example, you can create a ruler element and update its position and size
  // based on the mouse position
  const rulerElement = document.getElementById('ruler');
  rulerElement.style.left = mouseX + 'px';
  rulerElement.style.top = mouseY + 'px';
}

// Function to handle mouseout (when the mouse leaves the webpage)
function onMouseOut() {
  // Remove the ruler element when the mouse leaves the webpage
  const rulerElement = document.getElementById('ruler');
  if (rulerElement) {
    rulerElement.remove();
  }
}

// Listen for messages from the extension
chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === 'toggleRuler') {
    // Toggle the ruler based on the message from the extension
    toggleRuler(message.enabled);
  }
});

// Initialize the content script
toggleRuler(rulerEnabled);
