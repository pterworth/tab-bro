// A variable to keep track of whether the ruler is currently enabled
let rulerEnabled = false;

// Function to toggle the ruler on/off
function toggleRuler(enabled) {
  rulerEnabled = enabled;
  if (enabled) {
    // Add event listeners for mousemove
    document.addEventListener('mousemove', onMouseMove);
  } else {
    // Remove event listeners when ruler is disabled
    document.removeEventListener('mousemove', onMouseMove);
    // Remove the ruler element when the ruler is disabled
    const rulerElement = document.getElementById('ruler');
    if (rulerElement) {
      rulerElement.remove();
    }
  }
}

// Function to handle mouse movement
function onMouseMove(event) {
  // Get the current mouse position
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Use mouseX and mouseY to draw the ruler on the webpage
  let rulerElement = document.getElementById('ruler');
  if (!rulerElement) {
    rulerElement = createRulerElement();
  }
  rulerElement.style.left = '0px';
  rulerElement.style.top = mouseY + 'px';
}

// Function to create the ruler element
function createRulerElement() {
  const rulerElement = document.createElement('div');
  rulerElement.id = 'ruler';
  Object.assign(rulerElement.style, {
    position: 'fixed',
    'z-index': '999999999',
    border: '1px solid red',
    width: '100vw',
    height: '1px',
    pointerEvents: 'none'
  });
  document.body.appendChild(rulerElement);
  return rulerElement;
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
