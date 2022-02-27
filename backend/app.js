const express = require('express');
const app = express();
const path = require('path');
const db = require('../config.db');
const helmet = require('helmet');
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const multer = require('multer');
const mysql = require('mysql2');
const rateLimit = require("express-rate-limit");

// Connecting to MYSQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})

pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
});

app.use(express.json());

// Access Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, //15min
      max: 1,                 // Limit each IP to 100 requests (15min)
      standardHeaders: true,    // Return rate limit info
      legacyHeaders: false      // Disable the Limiter headers
  })
  app.use(limiter);
    
  app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', postsRoutes);
app.use('/api/auth', userRoutes);
app.use('./api/post', authRoutes);

