const express=require("express");
const router=express.Router();
const { registerUser, loginUser, userVerification } = require("../controller/userController");
const { auth } = require("../authMiddlewares/auth");


router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/verification',auth,userVerification);

module.exports=router;