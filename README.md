# Code Challenge

This is a full-stack web application with Node.js/Express backend and React frontend that demonstrates user authentication functionality.

## Project Structure

```
code-test/
├── backend/                 # Node.js Express server
│   ├── server.js           # Main server file
│   ├── users.json          # User data storage
│   └── package.json        # Backend dependencies
├── frontend/               # React application
│   ├── public/             # Public assets
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   │   ├── Authentication.jsx
│   │   │   └── Authentication.css
│   │   ├── App.js          # Main App component
│   │   └── index.js        # React entry point
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## Features

### Backend (Node.js/Express)
- **GET /fetchUser**: Check if user is logged in based on email parameter
- **POST /login**: Validate credentials and update login status
- JSON file-based user storage
- CORS enabled for frontend communication

### Frontend (React)
- **Authentication Component**: Functional component handling login/logout
- **Email Validation**: Real-time email format validation
- **Session Management**: Uses browser sessionStorage for user email
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd code-test/backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```
The backend server will run on `http://localhost:3001`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd code-test/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React application:
```bash
npm start
```
The frontend application will run on `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. If no user is logged in, you'll see the login form
3. Use one of the test credentials:
   - Email: `test@hellomonday.com`, Password: `test123`
   - Email: `john.doe@example.com`, Password: `password123`
   - Email: `jane.smith@example.com`, Password: `password456`
4. After successful login, you'll see the welcome message
5. User email is stored in browser sessionStorage for persistence

## API Endpoints

### GET /fetchUser
- **Parameters**: `email` (query parameter)
- **Response**: 
  ```json
  // If logged in:
  {
    "firstName": "John",
    "lastName": "Doe", 
    "isLoggedIn": true
  }
  
  // If not logged in:
  {
    "isLoggedIn": false
  }
  ```

### POST /login
- **Body**: 
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  // Success:
  {
    "success": true,
    "message": "Login successful"
  }
  
  // Failure:
  {
    "success": false,
    "message": "Invalid password"
  }
  ```

## Development

- Backend uses `nodemon` for development with hot reload: `npm run dev`
- Frontend uses Create React App development server with hot reload
- Both applications support CORS for cross-origin requests

## Notes

- User data is stored in `backend/users.json`
- Login status persists in browser sessionStorage
- Email validation is implemented on the frontend
- The application includes responsive design for mobile devices

## Code challenge request

- Implement the logic for the front end application to do the following on the initialisation: 
  1. get the user email from the browser session storage
  2. call the "/fetchUser" backend API endpoint to check if the user has logged in or not, and:
     - if the user has not logged in then show the login UI
     - if the user has already loged in then show the welcome UI
  3. Do the above by the React hooks
- Implement the logic for the "/login" API endpoint for the backend server to:
  1. authenticate the email and password from the http request
  2. update login status to the user data
