const Ride = require("../../../model/Ride")
const User = require("../../../model/User")


module.exports = async function (req, res) {
    //   request.user is getting fetched from Middleware after token authentication
    var user = await User.findById(req.user.id);
    var ride = await Ride.findOne({ _id: user.rideId, })
    if (ride.students[req.user.id] == undefined) {
        res.status(401).json({ message: "You don't have access to this ride" });
    } else {
        res.json(ride);
    }
}