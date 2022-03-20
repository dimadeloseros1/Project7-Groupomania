const express = require("express")
const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");
console.log("Connected to the Mysql...");

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: "mysql",
    
});

//export the db connection.

