const Ride = require("../../../model/Ride")
const User = require("../../../model/User")

module.exports = async function (req, res) {


    //   request.user is getting fetched from Middleware after token authentication
    var user = await User.findById(req.query.studentId)



    var ride = await Ride.findOne({ _id: req.query.rideId, "driver.id": req.user.id })

    if (ride == null) {
        console.log("You don't have access")
    } else {


        if (user.currentRideId == ride._id) {
            user.currentRideId = null;
            var studentIdIndex = ride.students.indexOf(user._id);
            ride.students.splice(studentIdIndex, 1)

            var studentObjectIndex = ride.studentsObjects.indexOf({
                id: user._id,
                fullName: user.fullName,
                lat: user.lat,
                lng: user.lng
            });
            ride.studentsObjects.splice(studentObjectIndex, 1)
        } else {
            user.currentRideId = ride._id;
            ride.students.push(user._id)
            ride.studentsObjects.push({
                'id': user._id,
                "fullName": user.fullName,
                "lat": user.lat,
                "lng": user.lng
            })

        }

        user.save()
        await ride.save()
        res.json(ride);
    }

}

