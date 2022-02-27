const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts-controller');
const commentCtrl = require('../controllers/comment-controller');
const reactions = require("../controllers/reactions-controller");
const router = express.Router();
const auth = require("../middleware/auth");
const read = require('../controllers/read-controller');
const multer = require('../middleware/multer-config');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth,multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports - router;