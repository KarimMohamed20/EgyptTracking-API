const Ride = require("../../../model/Ride")
const User = require("../../../model/User")

module.exports = async function (req, res) {

    
    //   request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.query.studentId)
    const ride = await Ride.findOne({ _id: req.query.rideId, "driver.id": req.user.id })

    if (ride == null) {
        res.status(401).json({ message: "No ride found" });
    } else {

        if (ride.students.includes(user._id) != true) {
            ride.students.push(user._id);
        } else {
            var studentIndex = ride.students.indexOf(user._id);
             ride.students.splice(studentIndex, 1)
        }
        await ride.save()
        res.json(ride);
    }

}