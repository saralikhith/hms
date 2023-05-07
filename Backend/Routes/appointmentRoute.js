//importing express route
const express = require("express")
const appointmentRoute = express.Router()
//import express async-handler
const errorHandler=require('express-async-handler')
//middleware
appointmentRoute.use(express.json())


const verifyToken=require('../Middleware/verifyToken')
//importing controller
const appointmentController=require("./../Controllers/appointmentController");

//all appointments under particular hospital ad
appointmentRoute.post("/all-appointments",verifyToken.verifyTokenAdmin,errorHandler(appointmentController.allAppointments));

//add appointment verifytokenuser
appointmentRoute.post("/addappointment",verifyToken.verifyTokenUser,errorHandler(appointmentController.addappointment))


//cancel admin
appointmentRoute.post("/cancelled-appointments",verifyToken.verifyTokenAdmin,errorHandler(appointmentController.cancelledAppointments));

//appointment based on hospital ad
appointmentRoute.post("/hospitalAppointments",verifyToken.verifyTokenAdmin,appointmentController.allAppointments)

//all complelted appointments under specific hospitails ad
appointmentRoute.post("/completed-appointments",verifyToken.verifyTokenAdmin,errorHandler(appointmentController.completedAppointments));

//getting appointment user
appointmentRoute.get("/appointments/:username",verifyToken.verifyTokenUser,errorHandler(appointmentController.getappointment))

//admin
appointmentRoute.post("/pending-appointments",verifyToken.verifyTokenAdmin,errorHandler(appointmentController.hospitalappointment));

//admin
appointmentRoute.post("/assign-appointments",verifyToken.verifyTokenAdmin,appointmentController.assignDoctorToAppointments);

//admin
appointmentRoute.get("/getAllEmergencyAppointments",verifyToken.verifyTokenAdmin,appointmentController.getAllEmergency);

//user
appointmentRoute.post("/cancel-appointments",verifyToken.verifyTokenUser,appointmentController.cancelAppointment);

//user
appointmentRoute.post("/accept-appointments",verifyToken.verifyTokenUser,appointmentController.accepetAppointment);

appointmentRoute.get("/emergencyAppointments/:username",verifyToken.verifyTokenUser,errorHandler(appointmentController.getEmergencyAppointment))

appointmentRoute.get("/getAllDetails",verifyToken.verifyTokenAdmin,errorHandler(appointmentController.getAllDetails))

module.exports = {appointmentRoute}