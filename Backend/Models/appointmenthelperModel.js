const mongoose=require('mongoose')

let appointmentHelperSchema = {
    hospitalName:{
        type:String
    },
    appointmentdate: {
        type: String,
    },
    timeslot: {
        type: String,
    },
    doctor: {
        type: String,
    }
    ,
    reason:{
        type:String
    } 
}

const appointmentHelperModel=mongoose.model('appointmentHelper',appointmentHelperSchema);

module.exports={appointmentHelperModel};