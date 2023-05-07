//importing doctor model
const doctorModel=require('./../Models/doctorModel').doctorModel;
const userModel=require('./../Models/userModel').userModel;
const bcryptjs=require('bcryptjs')


// adding doctor to doctor collection
async function addDoctor(req,res){

    let doctorObj=JSON.parse(req.body.doctorObj);
  

    doctorObj['image']=req.file.path;
    let doctors=await doctorModel.find({username:`${doctorObj.username}`})
    let users=await userModel.find({username:`${doctorObj.username}`})

    if(doctors.length==0&&users.length==0){
        let hashedPassword= await bcryptjs.hash(doctorObj.password,7);
        doctorObj.password=hashedPassword
        await doctorModel.create(doctorObj);
        res.send({message:"Doctor added successfully"});
    }
    else{
        res.send({message:`${doctorObj.username} username already exist`});
    }
}

//add dummy doctor
async function addDoctorDummy(req,res){
    let doctorObj=req.body;
    await doctorModel.create(doctorObj);
    res.send({message:"Doctor added successfully"});

}

//retriving all doctors based on hospitals
async function allDoctors(req,res){
    let hospitalObj=req.body;
    let doctors=await doctorModel.find({hospitalName:hospitalObj.name});
    res.send({message:"Successfully retrived",doctorObj:doctors});

}
module.exports={addDoctor,allDoctors,addDoctorDummy}