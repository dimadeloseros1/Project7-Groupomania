const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/posts');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/',  postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.LikePost);

module.exports = router;