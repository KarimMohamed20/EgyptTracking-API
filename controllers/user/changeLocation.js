let User = require("../../model/User");
let Ride = require("../../model/Ride");

module.exports = async function (req, res) {
    let user = await User.findById(req.user.id);
    let ride = await Ride.findById(user.currentRideId);

    let currentLat = req.body.lat;
    let currentLng = req.body.lng;


    user.lat = currentLat;
    user.lng = currentLng;

    if(ride != null) {
        ride.students[user._id].lat = currentLat;
        ride.students[user._id].lng = currentLng;
    }



    await ride.save();
    await user.save();
    res.json({"message":"Updated Successfully!"});
}