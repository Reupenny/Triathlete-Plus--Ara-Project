![Triathete +](./assets/Logo.webp)
This project is for the Best Programming Practices (Web & Mobile Development) course (BCDE211) at Ara Institute of Canterbury. It combines work from two assessments to create a Progressive Web App (PWA) for people who do triathlons.

## Course Information

- **Course:** Best Programming Practices (Web & Mobile Development) (BCDE211)
- **Semester:** One 2025

## Project Overview

This app helps people who do triathlons track their training. The project was made in two parts:

1. **Assessment 2: The Model** - The main data model was built using ES6+ JavaScript. This involved creating a solid structure to handle training session data, including features for managing and storing data.
2. **Assessment 3: The UI and PWA** - A React-based user interface was made to work with the model. The app was then improved with Progressive Web App features, making it installable and usable offline.

The final app is a complete training log where users can add, look at, and manage their swimming, cycling, and running sessions.

## Key Features

The app has a wide range of features as required by the assessments:

- **Session Management:** Add, update, and delete training sessions.
- **Data Display:** See all training sessions in a clear and organised list.
- **Sorting & Filtering:** Sort sessions by different criteria and filter them to find specific entries.
- **Data Persistence:** Save training data to the browser's `localStorage` and load it when the app starts.
- **Input Validation:** Checks user input to make sure the data is correct.
- **Calculations:** Works out and shows calculations for a single session and across many sessions.
- **Database Integration:** Basic CRUD (Create, Read, Update, Delete) operations with IndexedDB.
- **PWA Functionality:**
  - Installable on user devices.
  - Offline support using a service worker.
  - Served over HTTPS.

## Technologies Used

- **Frontend:** React.js
- **Build Tool:** Vite
- **Testing:** Jest, Fake-IndexedDB
- **Linting:** ESLint
- **Language:** JavaScript (ES6+)
- **Styling:** CSS3
- **PWA:** Service Workers, Web App Manifest

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Reupenny/Triathlete-Plus--Ara-Project.git
   ```
2. Go to the project directory:
   ```bash
   cd "Triathlete-Plus--Ara-Project"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

In the project directory, you can run the following commands:

- `npm run dev`
  Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
- `npm run build`
  Builds the app for production to the `dist` folder.
- `npm run preview`
  Serves the production build locally for previewing.
- `npm start`
  Starts a local HTTPS server for the PWA. This is needed for the service worker and other PWA features.
  for this to work, you will need to have created a local SSL certificate and have it located in a folder called `security` and have them named `localhost.crt` and `localhost.key`

## Screenshots

Below are some screenshots of the application in action.

*(Here you can add your screenshots. Use the format `![Description of image](path/to/image.png)`)*

- **Main Dashboard:**
  ![Main Dashboard](path/to/your/screenshot.png)
- **Adding a New Session:**
  ![Adding a New Session](path/to/your/screenshot.png)
- **Editing a Session:**
  ![Editing a Session](path/to/your/screenshot.png)
