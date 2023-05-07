const express=require("express");
const doctorRoute=express.Router();
const doctorController=require('./../Controllers/doctorController');
const multerObj=require('./../Middleware/multer').multerObj

const verifyToken=require('../Middleware/verifyToken')
//import express async-handler
const errorHandler=require('express-async-handler')
//verify token admin
doctorRoute.post("/add-doctor",verifyToken.verifyTokenAdmin,multerObj.single('image'),doctorController.addDoctor);

doctorRoute.use(express.json());


//no
doctorRoute.post('/all-doctors',errorHandler(doctorController.allDoctors));

doctorRoute.post('/add-dummy',doctorController.addDoctorDummy);


module.exports={doctorRoute}