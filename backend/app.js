const express = require('express');
const helmet = require('helmet');
const rateLimite = require('express-rate-limit');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
require('dotenv').config({ path: './config/.env',encoding: "latin1" });
const bodyParser = require("body-parser");
const multer = require("multer")
const {User} = require("./models");
const path = require("path");
const cors = require("cors");
const { application } = require('express');


const corsOptions = {
    origin: ["http://localhost:3001"],
    credentials:true,
    optionsSuccessStatus: 200
}



const app = express();


//CORS Police : Cross Origin Resource Sharing
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(cors(corsOptions));
app.use(helmet.frameguard({
        action : "SAMEORIGIN"
    })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const storageUpload = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "public/images");
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({storage: storageUpload});

app.use("/images", express.static(path.join(__dirname, "/images")))
app.use("api/upload", postRoutes)


// app.post("/api/upload", upload.single("file"), (req, res) => {
//     try {
//         console.log("File uploaded")
//         return res.status(201).json("File uploaded successfully..")
//     } catch (error) {
//         console.log(error)
//     }
// })


localhost3000://public//images
// app.use(rateLimite({
//     windowMs: 24 * 60 * 60 * 1000,
//     max: 10000,
//     message: "Your IP is locked fore 24 hours!",
//     headers: true,
// }));

// Router
app.use('/images/posts', express.static(path.join(__dirname, 'images/posts')));
app.use('/images/profile', express.static(path.join(__dirname, 'images/profile')));
app.use('/imaimagesges/pictureProfile', express.static(path.join(__dirname, 'images/pictureProfile')));
app.use('//comment', express.static(path.join(__dirname, 'images/comment')));
app.use('/api/users', userRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;