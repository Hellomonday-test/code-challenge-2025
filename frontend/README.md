# Frontend Application

React application with authentication functionality.

## Setup

```bash
npm install
npm start
```

Application runs on `http://localhost:3000`

## Features

- **Authentication.jsx**: Functional component handling login/logout
- **Email Validation**: Real-time validation with regex
- **Session Management**: Uses browser sessionStorage
- **Responsive Design**: Mobile-friendly interface

## Component Structure

```
src/
├── components/
│   ├── Authentication.jsx    # Main authentication component
│   └── Authentication.css    # Styling
├── App.js                    # Root component
└── index.js                  # Entry point
```

## Usage

1. Component checks sessionStorage for user email on mount
2. Calls backend API to verify login status
3. Shows welcome message if logged in
4. Shows login form if not authenticated
5. Handles form validation and submission
6. Stores user email in sessionStorage on successful login