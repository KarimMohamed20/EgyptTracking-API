const Ride = require("../../../model/Ride")
const User = require("../../../model/User")

module.exports = async function (req, res) {


    //   request.user is getting fetched from Middleware after token authentication
    var studentId = req.query.studentId;
    var ride = await Ride.findOne({ _id: req.query.rideId, "driver.id": req.user.id })

    if (ride == null) {
        console.log("You don't have access")
    } else {
        var studentIdIndex = ride.students.indexOf(studentId)
        ride.studentsObjects[studentIdIndex].arrived = !ride.studentsObjects[studentIdIndex].arrived;
        await ride.save()
        res.json(ride);
    }

}