const express = require('express');
const app = express();
const path = require("path");
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
app.use(express.json())

const db = require("./models")


db.sequelize.sync().then((req) =>{
    app.listen(3002, () => {
        console.log("server is running");
    });
});
       

    
    
    
 


// Création des en-têtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});




app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;