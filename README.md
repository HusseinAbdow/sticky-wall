# Sticky Wall

Sticky Wall is a simple full-stack todo web app built with Node.js, Express, and Firebase Firestore. It gives each user a clean, lightweight space to create, complete, and organize tasks with a sticky-note style dashboard.

## UI Preview

### Demo Video

<p align="center">
  <a href="UI%20pics/sticky-note-preview.mp4" target="_blank">
    <img src="UI%20pics/demo-thumbnail.jpg" alt="Sticky Wall demo video - click to play" width="80%">
  </a>
</p>

<p align="center"><em>Click the preview above to watch the full demo</em></p>

<br>

### Screenshots

<table>
  <tr>
    <td align="center" width="50%">
      <strong>Login</strong><br>
      <img src="UI%20pics/login_page.png" alt="Login screen" width="100%">
    </td>
    <td align="center" width="50%">
      <strong>Dashboard</strong><br>
      <img src="UI%20pics/Dashboard.png" alt="Dashboard screen" width="100%">
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <strong>Completed Tasks</strong><br>
      <img src="UI%20pics/completed.png" alt="Completed tasks screen" width="100%">
    </td>
    <td align="center" width="50%">
      <strong>Pending Tasks</strong><br>
      <img src="UI%20pics/pending.png" alt="Pending tasks screen" width="100%">
    </td>
  </tr>
</table>

## What It Does

- Username-based login stored in the browser with `localStorage`
- Firestore-backed task storage
- Add, complete/undo, and delete tasks
- Sidebar filtering for All, Completed, and Pending tasks
- Clean dashboard layout with a sticky wall style interface

## Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js, Express
- Database: Firebase Firestore
- Utilities: CORS, dotenv, nodemon

## Project Structure

```text
.
├── client/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── server/
│   ├── server.js
│   ├── firebase.js
│   └── routes/
│       └── tasks.js
├── UI pics/
│   ├── sticky-note-preview.mp4
│   ├── demo-thumbnail.jpg
│   ├── login_page.png
│   ├── Dashboard.png
│   ├── completed.png
│   └── pending.png
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js installed
- A Firebase project with Firestore enabled
- Firebase Admin credentials for local development

### Installation

1. Clone the repository.

```bash
git clone https://github.com/HusseinAbdow/sticky-wall.git
cd sticky-wall
```

2. Install dependencies.

```bash
npm install
```

3. Create your local environment file.

```bash
cp .env.example .env
```

4. Open `.env` and add your Firebase credentials.

## Running the App

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The app runs at `http://localhost:3000`.

## Environment Variables

The backend reads these values from `.env`:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`
- `PORT` (optional)

See `.env.example` for the expected format.

## API Endpoints

- `GET /api/tasks?userId=...` - Get tasks for the current user
- `POST /api/tasks` - Create a task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Notes

- Login is frontend-only and stored in `localStorage`
- Tasks are filtered per user through the backend `userId` query parameter
- No Docker, Kubernetes, or CI/CD configuration is included in this repository

## License

ISC
