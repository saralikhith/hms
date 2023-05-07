//import models

userModel=require('../Models/userModel.js').userModel
//doctorModel=require('../Models/doctorModel.js').doctorModel
hospitalModel=require('../Models/hospitalModel.js').hospitalModel

//import bcryptjsconst 
const bcryptjs=require('bcryptjs')

//import jwt
const jwt=require('jsonwebtoken')

require("dotenv").config();


//login controller
async function  login(req,res){
   
    const userreq=req.body
  
  //  const adminobj=await masterAdminModel.findOne({username:userreq.username})
    const userobj=await userModel.findOne({username:userreq.username})
  //  const doctorobj=await doctorModel.findOne({username:userreq.username})
    const hospitalObj=await hospitalModel.findOne({username:userreq.username})
  
    if(userobj!=null){
     
        let resultOfUser=await bcryptjs.compare(userreq.password,userobj.password)
        if(resultOfUser!=false){   
            let token=jwt.sign({username:userreq.username,type:"user"},process.env.SECRETKEYU) 
          
            res.send({message:"user login success",token:token,username:userreq.username,userObj:userobj})
            return
        }
            
        }

    if(hospitalObj!=null){
        // let resultOfUser=await bcryptjs.compare(userreq.password,hospitalObj.password)
        //  if(resultOfUser!=false){
            token=jwt.sign({username:userreq.username,type:"admin"},process.env.SECRETKEYA)
           
            res.send({message:"admin login success",token:token,username:userreq.username,hospitalObj:hospitalObj})
             return
    //}
       
    }
   
    res.send({message:"failure"})
    
}

module.exports={login}