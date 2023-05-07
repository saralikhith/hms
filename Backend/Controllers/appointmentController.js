//importing models
const appointmentModel = require("../Models/appointmentModel").appointmentModel
const userModel = require("../Models/userModel").userModel
const doctorModel=require("../Models/doctorModel").doctorModel
const { emergencyModel } = require('../Models/emergencyModel');
const appointmentHelperModel=require('./../Models/appointmenthelperModel').appointmentHelperModel

async function addappointment(req, res) {
    let appointmentobj = req.body
   
    const details = new appointmentModel(appointmentobj)
    await details.save();
    await userModel.findOneAndUpdate({ username: `${appointmentobj.username}` }, {
        $push: {
            myappointment: {
                patientname: details.patientname,
                phonenumber: details.phonenumber,
                emailaddress: details.emailaddress,
                appointmentdate: details.appointmentdate,
                timeslot: details.timeslot,
                specialization: details.specialization,
                emergencyname: details.emergencyname,
                emergencyphone: details.emergencyphone,
                doctor: details.doctor,
                problem: details.problem,
                username: details.username,
                status: details.status,
                hospitalName: details.hospitalName,
                id: details._id.toString()
            }
        }
    })
    res.send({message:'your appointment bookes successfully',appointmentobj:appointmentobj})
}
async function allAppointments(req, res) {
    let hospitalObj = req.body;
   // console.log(hospitalObj);
   
    let appointments = await appointmentModel.find({ hospitalName: hospitalObj.name }).populate('doctor');

   // console.log(appointments)
    res.send({ message: "Success", appointments: appointments });
}

async function getAllEmergency(req, res) {
 
    let appointments = await emergencyModel.find({})

   // console.log(appointments)
    res.send({ message: "Success", appointments: appointments });
}
async function getAllDetails(req, res) {
    let emergencyObj= await emergencyModel.find({})
    let doctorObj=await doctorModel.find({})
    let appointmentObj=await appointmentModel.find({})
    res.send({message:'success',emergencyObj:emergencyObj,doctorObj:doctorObj,appointmentObj:appointmentObj})
}

//canceled appointments
async function cancelledAppointments(req, res) {
    let hospitalObj = req.body;

    let appointments = await appointmentModel.find({ hospitalName: hospitalObj.name, status: 'cancelled' }).populate('doctor');
    res.send({ message: "Success", appointments: appointments });

    
}

//to get hospital appointments with sorted by date
async function hospitalappointment(req, res) {
    let hospitalObj = req.body;
    // let assignedAppointments=await appointmentModel.find({ hospitalName: hospitalObj.name })
    let appointments = await appointmentModel.find({ hospitalName: hospitalObj.name,status:{$in:["pending","accepted"]} }).sort([['appointmentdate', 1], ['timeslot', 1]]).populate('doctor');

   //console.log(appointments);
    const [assignedAppointments, notAssignedAppointments] =appointments.reduce(([assigned, notAssigned], appointmentObj) => ((appointmentObj.doctor.username != "Not assigned") ? [[...assigned, appointmentObj], notAssigned] : [assigned, [...notAssigned, appointmentObj]]), [[], []]);

    res.send({ message: "Success", assignedAppointments: assignedAppointments, notAssignedAppointments: notAssignedAppointments })
}

//completed appointments
async function completedAppointments(req, res) {
    let hospitalObj = req.body;
    let appointments = await appointmentModel.find({ hospitalName: hospitalObj.name, status: 'accepted' }).populate('doctor');
    res.send({ message: "Success", appointments: appointments });
}

async function assignDoctorToAppointments(req, res) {

    let appointmentAssignObj = req.body;

    let doctors = await doctorModel.find({ hospitalName: appointmentAssignObj.hospitalName, specialization: appointmentAssignObj.specialization }).sort({ 
        rating_avg: -1 });

    if (doctors.length == 0) {
        res.send({ message: "No doctor under this specalisation" });
    }
    else {
        for (let i = 0; i < doctors.length; i++) {
            let helperObj = await appointmentHelperModel.find({ hospitalName: appointmentAssignObj.hospitalName, doctor: doctors[i].username, appointmentdate: appointmentAssignObj.date, timeslot: appointmentAssignObj.timeslot });
            
            if (helperObj.length == 0) {
                await appointmentModel.findOneAndUpdate({ _id: appointmentAssignObj._id }, { $set: { "doctor":doctors[i]['_id'].toString()} });
                let helpObj = {
                    "hospitalName": appointmentAssignObj.hospitalName,
                    "reason": appointmentAssignObj.problem,
                    "doctor": doctors[i].username,
                    "appointmentdate": appointmentAssignObj.date,
                    "timeslot": appointmentAssignObj.timeslot
                }
                await appointmentHelperModel.create(helpObj);
                await userModel.updateOne({"myappointment.id":appointmentAssignObj._id.toString()},{$set:{'myappointment.$.doctor':doctors[i]['_id'].toString()}})
                await appointmentModel.findOneAndUpdate({_id:appointmentAssignObj._id},{$set:{doctor:doctors[i]._id}})
                res.send({ message: `Successfully assigned with ${doctors[i].username}`, succ: "success", doctorName: doctors[i].username });
                return;
            }
        }
        res.send({ message: "No doctor available!!" })
        
    }
 
}
async function getappointment(req, res) {
    const name = req.params.username
    let result = await userModel.findOne({ username: `${name}`}).populate("myappointment.doctor");
    res.send({ message: "Success", appointments: result.myappointment })
}


//to accept the appointments
async function accepetAppointment(req,res){
    
    let appointmentAssignObj=req.body;

    await userModel.updateOne({"myappointment.id":appointmentAssignObj.id.toString()},{$set:{"myappointment.$.status":"accepted"}});

    await appointmentModel.updateOne({_id:appointmentAssignObj.id},{$set:{status:"accepted"}});
    
    res.send({message:"Appointment Accepted Successfully!!!"});
}

//to cancel appointments

async function cancelAppointment(req,res){

    let appointmentAssignObj=req.body;
  
    
    await userModel.findOneAndUpdate({username:appointmentAssignObj.username},{$pull:{"myappointment":{id:appointmentAssignObj.id}}},{ safe: true, multi: false });

    await appointmentModel.updateOne({_id:appointmentAssignObj.id},{$set:{status:"cancelled",doctor:"6448c62dbdc07ea442861cab"}})
     
    await appointmentHelperModel.deleteOne({hospitalName: appointmentAssignObj.hospitalName, doctor: appointmentAssignObj.doctor.username, appointmentdate: appointmentAssignObj.date, timeslot: appointmentAssignObj.timeslot});

    res.send({message:"Appointment Successfully cancelled"});
}
async function getEmergencyAppointment(req, res) {
    const name = req.params.username
    let result = await userModel.findOne({ username: `${name}`},{emergency:1})
  
   
    res.send({ message: "Success", appointments: result })
}

module.exports={addappointment,allAppointments,cancelledAppointments,hospitalappointment,completedAppointments,assignDoctorToAppointments,getappointment,accepetAppointment,cancelAppointment,getEmergencyAppointment,getAllEmergency,getAllDetails}