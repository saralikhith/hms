
const bcryptjs = require('bcryptjs')

const hospitalModel = require('./../Models/hospitalModel').hospitalModel;
const userModel = require('./../Models/userModel').userModel;

const doctorModel = require('./../Models/doctorModel').doctorModel;
const appointmentHelperModel = require('./../Models/appointmenthelperModel').appointmentHelperModel;
const appointmentModel = require('./../Models/appointmentModel').appointmentModel;
const emergencyS = require('./../Models/emergencyModel')
async function emergency(req, res) {
    let emergencyObj = req.body;
    let doctors = await doctorModel.find({ specialization: emergencyObj.specialization }).sort({ rating_avg: -1 });
    if (doctors.length != 0) {
        for (let i = 0; i < doctors.length; i++) {
            let helperObj = await appointmentHelperModel.find({ doctor: doctors[i].username, appointmentdate: emergencyObj.appointmentdate, timeslot: emergencyObj.timeslot });
            if (helperObj.length == 0) {
                let s = await emergencyS.emergencyModel.find({ "appointmentdate": emergencyObj.appointmentdate, "timeslot": emergencyObj.timeslot, specialization: emergencyObj.specialization })
                if (s.length == 0) {
                    let helpObj = {
                        "hospitalName": doctors[i].hospitalName,
                        "doctor": doctors[i].username,
                        "appointmentdate": emergencyObj.appointmentdate,
                        "timeslot": emergencyObj.timeslot
                    }
                    var emeObj = { ...helpObj, "specialization": emergencyObj.specialization, "patientname": emergencyObj.patientname }
                    var emergencyM = new emergencyS.emergencyModel(emeObj)
                    await emergencyM.save()

                    await appointmentHelperModel.create(helpObj);

                    await userModel.findOneAndUpdate({ _id: emergencyObj._id }, {
                        $push: {
                            emergency: {
                                hospitalName: doctors[i].hospitalName,
                                doctor: doctors[i].username,
                                appointmentdate: emergencyObj.appointmentdate,
                                timeslot: emergencyObj.timeslot,
                                specialization: emergencyObj.specialization,
                                patientname: emergencyObj.patientname,
                                id: emergencyM._id.toString()
                            }
                        }
                    })

                    res.send({ message: `Successfully assigned with ${doctors[i].username}`, succ: "success", doctorName: doctors[i].username, hospitalName: doctors[i].hospitalName, emergency: emeObj });
                    return;
                }

            }
        }

    }
    else {
        res.send({ message: "no doctor available" })
    }

}

module.exports = { emergency }