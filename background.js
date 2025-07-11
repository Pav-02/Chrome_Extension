// Variables to keep track of the active tab and its URL
let activeTabId = null;
let activeUrl = null;
let trackingStartTime = null; // Timestamp when the current URL became active

// Object to temporarily store tracked data before sending to backend
// Key: URL, Value: Total duration in milliseconds
let trackedData = {};

/**
 * Updates the tracking data for the previously active URL.
 * Calculates the duration spent on the previous URL and adds it to trackedData.
 * Resets trackingStartTime for the new active URL.
 */
function updateTracking() {
  if (activeUrl && trackingStartTime) {
    const duration = Date.now() - trackingStartTime;
    if (trackedData[activeUrl]) {
      trackedData[activeUrl] += duration;
    } else {
      trackedData[activeUrl] = duration;
    }
    console.log(`Tracked ${duration}ms for ${activeUrl}. Total: ${trackedData[activeUrl]}ms`);
  }
  // Reset tracking start time for the new active URL
  trackingStartTime = Date.now();
}

/**
 * Listener for when the active tab changes.
 * This fires when the user switches tabs or opens a new tab.
 */
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  updateTracking(); // Update tracking for the previously active tab/URL

  activeTabId = activeInfo.tabId;
  try {
    const tab = await chrome.tabs.get(activeTabId);
    activeUrl = tab.url;
    console.log("Active tab changed to:", activeUrl);
  } catch (error) {
    console.error("Error getting tab info:", error);
    activeUrl = null; // Clear activeUrl if tab info can't be retrieved
  }
});

/**
 * Listener for when a tab's properties are updated (e.g., URL changes within the same tab).
 * This is crucial for single-page applications where the URL changes without a full page reload.
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only update if the URL has changed and it's the currently active tab
  if (tabId === activeTabId && changeInfo.url && changeInfo.url !== activeUrl) {
    updateTracking(); // Update tracking for the previous URL in this tab
    activeUrl = changeInfo.url;
    console.log("Active tab URL updated to:", activeUrl);
  }
});

/**
 * Initial setup when the extension starts or the service worker becomes active.
 * This ensures we start tracking the currently active tab immediately.
 */
async function initializeTracking() {
  try {
    const [currentTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (currentTab) {
      activeTabId = currentTab.id;
      activeUrl = currentTab.url;
      trackingStartTime = Date.now();
      console.log("Initial active tab on startup:", activeUrl);
    }
  } catch (error) {
    console.error("Error initializing tracking:", error);
  }
}

// Call initializeTracking when the service worker starts
initializeTracking();

/**
 * Schedule an alarm to periodically send data to the backend.
 * This alarm will fire every 5 minutes.
 */
chrome.alarms.create('sendDataToBackend', { periodInMinutes: 5 });

/**
 * Listener for when an alarm fires.
 * This is where you'll implement the logic to send `trackedData` to your backend.
 */
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'sendDataToBackend') {
    console.log("Alarm fired: Sending data to backend.");
    // TODO: Implement actual fetch() call to your backend API here.
    // Example:
    /*
    if (Object.keys(trackedData).length > 0) {
      fetch('YOUR_BACKEND_API_URL/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer YOUR_AUTH_TOKEN' // Add authentication token here
        },
        body: JSON.stringify({
          data: trackedData,
          timestamp: Date.now()
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data sent successfully:', data);
        trackedData = {}; // Clear data after successful send
      })
      .catch(error => {
        console.error('Error sending data:', error);
        // Handle errors: maybe retry later or store in a persistent queue
      });
    } else {
      console.log("No data to send.");
    }
    */
    // For now, just log and clear the data
    console.log("Data to send (simulated):", trackedData);
    trackedData = {}; // Reset for the next interval
  }
});

// Optional: Add a listener for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log("Productivity Tracker extension installed or updated.");
});
// Listener for messages from other parts of the extension (e.g., popup.js)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTrackingStatus") {
    // Send back the current active URL and any other relevant status
    sendResponse({
      activeUrl: activeUrl,
      // You could also send back a summary of today's trackedData if needed
      // todaySummary: calculateTodaySummary(trackedData)
    });
  }
  // If you had other actions, you'd handle them here
  // else if (request.action === "syncDataNow") {
  //   // Trigger immediate data sync
  //   console.log("Manual sync requested from popup.");
  //   // Call the function that sends data to backend
  //   // sendDataToBackendFunction();
  //   sendResponse({ status: "Sync initiated" });
  // }
  return true; // Indicates that sendResponse will be called asynchronously
});
