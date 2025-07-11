document.addEventListener('DOMContentLoaded', () => {
    const statusDiv = document.getElementById('status');
    const viewAnalyticsBtn = document.getElementById('viewAnalyticsBtn');

    // Function to update the status in the popup
    function updateStatus(message) {
        statusDiv.textContent = message;
    }

    // Example: Requesting some data from the background script
    // In a real scenario, you might ask for today's tracked time or current active URL
    chrome.runtime.sendMessage({ action: "getTrackingStatus" }, (response) => {
        if (response && response.activeUrl) {
            updateStatus(`Currently tracking: ${response.activeUrl.substring(0, 50)}...`);
        } else {
            updateStatus("No active tracking data available.");
        }
    });

    // Event listener for the "View Analytics" button
    viewAnalyticsBtn.addEventListener('click', () => {
        // TODO: Replace with the actual URL of your dashboard once deployed
        const dashboardUrl = "http://localhost:3000/dashboard"; // Placeholder for your future dashboard URL
        chrome.tabs.create({ url: dashboardUrl });
    });

    // You can also send messages to the background script from here
    // Example: A button to manually trigger data sync (though alarms handle this)
    // chrome.runtime.sendMessage({ action: "syncDataNow" });
});
