const Ride = require("../../../model/Ride")
const User = require("../../../model/User")

module.exports = async function (req, res) {


    //   request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.query.studentId)
    const ride = await Ride.findOne({ _id: req.query.rideId, "driver.id": req.user.id })

    if (ride == null) {
        res.status(401).json({ message: "No ride found" });
    } else {

        if (ride.students[user._id] != null) {
            ride.students.delete(user._id)
        } else {
            ride.students.set(user._id, {
                'id': user._id,
                "fullName": user.fullName,
                "lat": user.lat,
                "lng": user.lng
            })
        }
        await ride.save()
        res.json(ride);
    }

}