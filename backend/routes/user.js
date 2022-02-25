const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// @route GET && POST - /posts/
router.route("/").get().post();

module.exports = router;