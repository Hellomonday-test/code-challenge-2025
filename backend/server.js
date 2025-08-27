const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper function to read users from JSON file
const readUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

// API endpoint 1: GET /fetchUser
app.get('/fetchUser', (req, res) => {
  const { email } = req.query;
  
  if (!email) {
    return res.status(400).json({ error: 'Email parameter is required' });
  }
  
  const users = readUsers();
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.json({ isLoggedIn: false });
  }
  
  if (user.isLoggedIn) {
    return res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      isLoggedIn: true
    });
  } else {
    return res.json({ isLoggedIn: false });
  }
});

// API endpoint 2: POST /login
app.post('/login', (req, res) => {
  
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});