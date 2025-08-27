# Backend Server

Node.js Express server for user authentication.

## Setup

```bash
npm install
npm start
```

Server runs on `http://localhost:3001`

## API Endpoints

- `GET /fetchUser?email=user@example.com` - Check user login status
- `POST /login` - Login with email and password

## Test Users

```json
[
  {
    "email": "john.doe@example.com",
    "firstName": "John", 
    "lastName": "Doe",
    "password": "password123"
  },
  {
    "email": "jane.smith@example.com",
    "firstName": "Jane",
    "lastName": "Smith", 
    "password": "password456"
  },
  {
    "email": "test@hellomonday.com",
    "firstName": "Test",
    "lastName": "User",
    "password": "test123"
  }
]
```