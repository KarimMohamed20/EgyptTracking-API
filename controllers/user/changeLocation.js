let User = require("../../model/User");
let Ride = require("../../model/Ride");

module.exports = async function (req, res) {
    let currentLat = req.body.lat;
    let currentLng = req.body.lng;
    let user = await User.findById(req.user.id);
    let ride = await Ride.findById(user.currentRideId).catch((e) => {
        console.log(e)
    });
    if (ride != null) {
        var studentIdIndex = ride.students.indexOf(req.user.id);
        console.log(ride.studentsObjects[studentIdIndex])
        ride.studentsObjects[studentIdIndex].lat = currentLat;
        ride.studentsObjects[studentIdIndex].lng = currentLng;
        await ride.markModified('studentsObjects');
        await ride.save()
    }

    user.lat = currentLat;
    user.lng = currentLng;





    await user.save();
    res.json({ "message": "Updated Successfully!" });
}