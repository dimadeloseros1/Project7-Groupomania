const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// @route GET && POST - /posts/
router.get('/:id', auth, userController.getUser);
router.get("/id", auth, userController.getAllUsers);
router.put("/:id", auth, multer, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;