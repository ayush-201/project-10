// Minimal server that uses existing data files.
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Load data from provided files (they export arrays)
const users = require('./data/users');
const questions = require('./data/questions');

// Basic endpoints
app.get('/api', (req, res) => {
  res.json({ message: 'Adaptive Learning API (minimal) — ready for Render' });
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.post('/api/contact', (req, res) => {
  // Log contact in server logs — in production replace with e-mail or DB
  console.log('Contact payload:', req.body);
  res.json({ status: 'received', payload: req.body });
});

// Serve client build in production
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(clientBuildPath));
app.get('*', (req, res) => {
  // If route not matching API, serve the React app
  const indexHtml = path.join(clientBuildPath, 'index.html');
  if (require('fs').existsSync(indexHtml)) {
    res.sendFile(indexHtml);
  } else {
    res.status(404).send('Not Found');
  }
});

// Use PORT from env (Render sets PORT), default 5000 for local
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
