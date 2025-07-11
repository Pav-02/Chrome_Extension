Company - CodTech IT Solutions, Name - N.C.Pavani, Intern ID - CT06DF2606, Domain - Full Stack, Duration - 6 weeks, Mentor - Neela Santhosh 
                                              CHROME EXTENSION FOR TIME TRACKING AND PRODUCTIVITY ANALYSIS

## Project Overview
The Productivity Tracker is a comprehensive solution designed to help users monitor and improve their online productivity. It consists of a Chrome Extension that tracks time spent on various websites and a powerful backend with an analytics dashboard to provide insights into browsing habits. Users can classify websites as productive or unproductive, generating personalized reports and analytics to foster better time management.
## Features

  ## Chrome Extension
*   **Automatic Time Tracking:** Monitors time spent on active browser tabs.
*   **URL-based Tracking:** Records the specific URLs visited.
*   **Background Sync:** Periodically sends tracked data to the backend for persistent storage and analysis.
*   **Simple Popup UI:** Provides quick access to current tracking status and a link to the analytics dashboard.
  ## Backend & Database
*   **Data Storage:** Securely stores user browsing data and website classifications.
*   **User Authentication:** (Planned) Secure user registration and login.
*   **Website Classification Management:** API endpoints to define and manage productive/unproductive website categories.
*   **Analytics API:** Provides aggregated data for daily, weekly, and custom productivity reports.
  ## Analytics Dashboard
*   **Interactive Visualizations:** Charts and graphs to display time distribution (productive vs. unproductive).
*   **Detailed Reports:** Daily and weekly breakdowns of website usage.
*   **Top Websites:** Identifies most visited productive and unproductive sites.
*   **Website Categorization Interface:** Allows users to easily classify websites.

## Technologies Used
##Chrome Extension (Frontend)
*   **HTML5, CSS3, JavaScript**
*   **Chrome Extension APIs (Manifest V3)**
##Backend (Server & API)
*   **Node.js**
*   **Express.js:** Web framework for building RESTful APIs.
*   **`cors`:** Middleware for Cross-Origin Resource Sharing.
*   **`dotenv`:** For managing environment variables.
*   **PostgreSQL:** Relational database for data storage.
*   **`pg`:** Node.js client for PostgreSQL.
## Analytics Dashboard (Frontend)
*   **HTML5, CSS3, JavaScript** (Currently served directly by the backend, will evolve into a dedicated frontend framework like React/Vue/Angular)
## Getting Started
Follow these steps to set up and run the Productivity Tracker locally.
## Prerequisites
*   **Node.js & npm:** [Download & Install Node.js](https://nodejs.org/en/download/) (npm is included).
*   **PostgreSQL:** [Download & Install PostgreSQL](https://www.postgresql.org/download/) (and optionally `pgAdmin` for management).
*   **Web Browser:** Google Chrome (for the extension).
##1. Backend Setup
1.  **Clone the repository (if applicable) or navigate to your project root:**
    ```bash
    cd your-project-root
    ```
    2.  **Navigate to the `backend` directory:**
    ```bash
    cd backend
    ```
3.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```
4.  **PostgreSQL Database Setup:**
    *   Ensure PostgreSQL is running.
    *   Using `pgAdmin` or the `psql` command-line tool, create a new database and a dedicated user for this project.
        *   **Database Name:** `productivity_tracker_db` (or your preferred name)
        *   **User Name:** `productivity_user` (or your preferred name)
        *   **Password:** Choose a strong password for this user.
        *   Ensure the user has privileges to connect to and manage this database.
5.  **Configure Environment Variables:**
    *   Create a `.env` file in the `backend` directory (at the same level as `server.js`).
    *   Add your database connection details and server port:
        ```env
        PORT=3000
        DB_HOST=localhost
        DB_PORT=5432
        DB_USER=productivity_user
        DB_PASSWORD=YOUR_DB_USER_PASSWORD # REPLACE THIS!
        DB_NAME=productivity_tracker_db
        ```
6.  **Start the Backend Server:**
    ```bash
    node server.js
    ```
    The server should start on `http://localhost:3000` (or your specified `PORT`).
### 2. Chrome Extension Setup
1.  **Navigate to the `chrome-extension` directory:**
    ```bash
    cd chrome-extension
    ```
2.  **Ensure all extension files are present:**
    *   `manifest.json`
    *   `background.js`
    *   `popup.html`
    *   `popup.js`
    *   `popup.css`
    *   `images/` (containing `icon16.png`, `icon48.png`, `icon128.png`)
3.  **Load the Extension in Chrome:**
    *   Open Chrome and go to `chrome://extensions/`.
    *   Enable "Developer mode" (toggle switch in the top-right).
    *   Click "Load unpacked" and select the `chrome-extension` directory.
    *   The "Productivity Tracker" extension should now appear in your list of extensions.
## Usage

1.  **Start the Backend Server:** Ensure your Node.js backend is running (`node server.js` in the `backend` directory).
2.  **Browse the Web:** The Chrome Extension will automatically start tracking time spent on different websites.
3.  **Access the Dashboard:**
    *   Click on the "Productivity Tracker" extension icon in your Chrome toolbar.
    *   Click the "View Analytics" button in the popup. This will open a new tab to your analytics dashboard (currently `http://localhost:3000/dashboard`).
    *   *Note: The dashboard currently displays a placeholder. Future development will integrate real-time analytics here.*
## Future Enhancements
*   **User Authentication:** Implement secure user registration and login for the backend and dashboard.
*   **Advanced Analytics:** More detailed charts, historical trends, and custom reporting periods.
*   **Website Categorization UI:** A dedicated interface on the dashboard to easily classify websites as productive/unproductive.
*   **Data Export:** Allow users to export their browsing data.
*   **Dedicated Frontend Framework:** Migrate the dashboard to a modern frontend framework (e.g., React, Vue, Angular) for a richer user experience.
*   **Deployment:** Deploy the backend and dashboard to a cloud hosting provider.
## License

[Optional: Add your chosen license here, e.g., MIT License]
![WhatsApp Image 2025-07-11 at 13 43 25_efd22a5f](https://github.com/user-attachments/assets/354d6bf6-aa46-46e6-95e5-08aadef9e702)
