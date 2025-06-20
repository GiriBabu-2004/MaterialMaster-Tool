// server/app.js

const express = require('express');
const cors = require('cors');
const path = require('path');
const contactRoutes = require('./routes/contact');
const pdfServicesRoutes = require('./routes/pdfServices');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/pdf', pdfServicesRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Material Master API is running...');
});

module.exports = app;
