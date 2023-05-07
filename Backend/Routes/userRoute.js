const express=require('express')
const multer = require('multer')
const userRoute=express.Router()

const verifyToken=require('../Middleware/verifyToken')
//import express async-handler
const errorHandler=require('express-async-handler')

const multerObj=require('../Middleware/multer').multerObj



var userController=require('../Controllers/userController')
//middleware


userRoute.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

 //register request
userRoute.post('/register',multerObj.single('image'),errorHandler(userController.register))
userRoute.use(express.json())

//updateProfile
userRoute.put('/updateProfile/:username',verifyToken.verifyTokenUser,errorHandler(userController.editProfile))



userRoute.put('/updateProfile',verifyToken.verifyTokenUser,multerObj.single('image'),errorHandler(userController.editProfileImage))


module.exports={userRoute}