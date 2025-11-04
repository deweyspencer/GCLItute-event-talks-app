
# GCLItute Event Talks App

A simple, single-page web application to display the schedule for a one-day event with technical talks. This application is built with Node.js on the server-side and standard HTML, CSS, and JavaScript on the front-end.

## Features

*   Displays a full-day schedule with talk titles, speakers, descriptions, and categories.
*   Calculates and displays timings for talks, breaks, and lunch.
*   Real-time search functionality to filter talks by category.

## Technology Stack

*   **Backend:** Node.js (using the built-in `http` module)
*   **Frontend:** HTML, CSS, JavaScript (no frameworks)
*   **Data:** JSON file (`talks.json`)

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Running the App

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/deweyspencer/GCLItute-event-talks-app.git
    cd GCLItute-event-talks-app
    ```

2.  **Start the server:**
    ```bash
    node server.js
    ```

3.  **Open the application:**
    Open your web browser and navigate to `http://localhost:3000`.

## Usage

*   View the entire event schedule on the main page.
*   Use the search bar at the top to filter the schedule by talk category. Type a category (e.g., "business", "materials") to see matching talks.
