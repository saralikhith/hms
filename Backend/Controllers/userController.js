const bcryptjs=require('bcryptjs')
//import 
const jwt = require("jsonwebtoken")

const userModel=require('../Models/userModel.js').userModel
const hospitalModel=require('../Models/hospitalModel').hospitalModel

//edit

//register
async function register(req,res){
        //get userobj
        let newUser=req.body.userObj
        us=JSON.parse(newUser)
        us.image=req.file.path
        try{
                var regpass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
                // const adminobj=await masterAdminModel.findOne({username:us.username})
                const userobj=await userModel.findOne({username:us.username})
                const hospitalObj=await hospitalModel.findOne({username:us.username})
                if(userobj!=null || hospitalObj!=null){
                res.send({message:`${us.username} already existed`})
                return
                }
                var pass = us.password;
                if (!pass.match(regpass)) {
                    res.send({ message: 'password should conttain Atleast one digit,Atleast one lowercase character Atleast one uppercase character Atleast one special character' })
                    return
                }
                    hashedPassword= await bcryptjs.hash(us.password,7)
                    us.password=hashedPassword;
    
                    const payLoad={
                        username:us.username,
                        password:us.password,
                        email:us.email
                    }
                    await userModel.create(us)
               
    res.send({ message: "registration successful"});
                 
            }
            catch(err){
                res.status = 400
                res.send({message: err.message})
            }
}
async function editProfile(req,res){
    var fusername=req.params.username;
    var user= req.body
    await  userModel.updateOne({username:user.username},{$set:{...user}})

    res.send({message:'changes successfully done','user':user})
}

async function editProfileImage(req,res){
    var fusername=req.params.username;
    var us= req.body.userObj
    user=JSON.parse(us)
    user.image=req.file.path

   await  userModel.updateOne({username:user.username},{$set:{...user}})

   res.send({message:'changes successfully done','user':user})
}

//to get all appointments


module.exports={register,editProfile,editProfileImage}