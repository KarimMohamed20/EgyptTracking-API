const mongoose = require("mongoose");
const Ride = require("../../../model/Ride")
const User = require("../../../model/User")

module.exports = async function (req, res) {
    //   request.user is getting fetched from Middleware after token authentication
    var ride = await Ride.findOne({ _id: req.query.rideId, "driver.id": req.user.id })
    var studentId = req.query.studentId;

    if (ride == null) {
        console.log("You don't have access")
    } else {
        console.log(studentId)
        var studentIdIndex = ride.students.indexOf(mongoose.Types.ObjectId(studentId),0)
        console.log(studentIdIndex)
        ride.studentsObjects[studentIdIndex].arrived = !ride.studentsObjects[studentIdIndex].arrived;
        await ride.markModified('studentsObjects');


        await ride.save()
        res.json(ride);
    }

}