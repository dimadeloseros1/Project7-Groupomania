const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");
console.log("Get connection ...");

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: "mysql",
});

//export the db connection.
var exports = (module.exports = {});
exports.sequelize = sequelize;


