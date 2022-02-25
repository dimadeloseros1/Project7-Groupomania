const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts-controller');
const commentCtrl = require('../controllers/comment-controller');
const reactions = require("../controllers/reactions-controller");
const router = express.Router();
const auth = require("../middleware/auth");
const read = require('../controllers/read-controller');