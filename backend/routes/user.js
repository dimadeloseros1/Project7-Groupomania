const router = require('express').Router();
const authController = require('../controllers/auth.controllers');
const userController = require('../controllers/user.controllers');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


//Authentification
router.post("/register", authController.signUp);
router.post("/login",  authController.login);
router.get("/logout", auth, authController.logout);

//User DB
router.get("/", auth,  userController.getAllUsers);
router.get("/:UserId", auth, userController.userInfo);
router.put("/:uuid", auth, multer,userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

router.post('/updateView/:id', authController.updateView)


module.exports = router;