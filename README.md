# Todo Web Application

A full-stack todo web application built with Node.js, Express, and Firebase.

## Project Structure

```
.
├── client/                 # Frontend files
│   ├── index.html         # Main HTML file
│   ├── style.css          # Styling
│   └── app.js             # Client-side JavaScript
├── server/                # Backend files
│   ├── server.js          # Express server entry point
│   ├── firebase.js        # Firebase configuration
│   └── routes/
│       └── tasks.js       # Task routes
├── package.json           # Dependencies and scripts
├── .env.example           # Example environment variables
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ToDoApp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your Firebase credentials
```

## Usage

### Development
Run the server in development mode with hot reload:
```bash
npm run dev
```

### Production
Run the server:
```bash
npm start
```

The server will start on `http://localhost:3000`

## Technologies

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: Firebase
- **Additional Tools**: CORS, dotenv, nodemon

## API Endpoints

### Todo Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Environment Variables

See `.env.example` for required environment variables.

## License

ISC
