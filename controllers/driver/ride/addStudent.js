const Ride = require("../../../model/Ride")
const User = require("../../../model/User")

module.exports = async function (req, res) {


    //   request.user is getting fetched from Middleware after token authentication
    var user = await User.findById(req.query.studentId)



    var ride = await Ride.findOne({ _id: req.query.rideId, "driver.id": req.user.id })

    if (ride == null) {
        console.log("You don't have access")
    } else {


        ride.students[user._id] = {
            'id': user._id,
            "fullName": user.fullName,
            "lat": user.lat,
            "lng": user.lng
        }
        user.rideId = ride._id;
        user.save()
        await ride.save()
        res.json(ride);
    }

}

