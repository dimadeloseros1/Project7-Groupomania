const express = require('express');
const helmet = require('helmet');
const rateLimite = require('express-rate-limit');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
require('dotenv').config({ path: './config/.env',encoding: "latin1" });
const bodyParser = require("body-parser");

const {User} = require("./models");
const path = require("path");

const app = express();


//CORS Police : Cross Origin Resource Sharing
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet.frameguard({
        action : "SAMEORIGIN"
    })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(rateLimite({
    windowMs: 24 * 60 * 60 * 1000,
    max: 10000,
    message: "Your IP is locked fore 24 hours!",
    headers: true,
}));

// Router
app.use('/images/posts', express.static(path.join(__dirname, 'images/posts')));
app.use('/images/profile', express.static(path.join(__dirname, 'images/profile')));
app.use('/imaimagesges/pictureProfile', express.static(path.join(__dirname, 'images/pictureProfile')));
app.use('//comment', express.static(path.join(__dirname, 'images/comment')));
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;