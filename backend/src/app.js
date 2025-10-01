const express = require('express');
const app = express();
app.use(express.json());

// Simple in-memory database of calming activities
const activities = [
  { id: 1, name: 'Guided Breathing', duration: 60 },
  { id: 2, name: 'Soothing Sounds', duration: 120 },
  { id: 3, name: '5-4-3-2-1 Grounding', duration: 90 }
];

// API Endpoint to get activities
app.get('/api/activities', (req, res) => {
  res.json(activities);
});

// Health check endpoint for monitoring
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // Important for testing!