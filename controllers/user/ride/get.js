const Ride = require("../../../model/Ride")
const User = require("../../../model/User")


module.exports = async function (req, res) {
    //   request.user is getting fetched from Middleware after token authentication
    var user = await User.findById(req.user.id);
    var ride = await Ride.findOne({ _id: user.currentRideId, })
    if(user.currentRideId != null) {
    console.log(ride.students.includes(req.user.id))
    if (ride.students.includes(req.user.id) == false || ride.students.includes(req.user.id) == null || ride.students.includes(req.user.id) == undefined) {
        res.status(403).json({ message: "You don't have access to this ride" });
    } else if (ride.started != true) {
        res.status(403).json({'message':"Your ride didn't started yet"})
    } else {
        
        res.json(ride);
    }} else {
        res.status(403).json({"message":"You don't have any rides currently"})
    }
}