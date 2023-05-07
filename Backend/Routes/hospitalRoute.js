const express=require('express')
const hospitalRoute=express.Router()
const mongoose=require('mongoose');
const verifyToken=require('../Middleware/verifyToken')
//import express async-handler
const errorHandler=require('express-async-handler')
const hospitalController=require('./../Controllers/hospitalController');

hospitalRoute.use(express.json());

//user
hospitalRoute.post('/emergency',verifyToken.verifyTokenUser,errorHandler(hospitalController.emergency));

module.exports={hospitalRoute}