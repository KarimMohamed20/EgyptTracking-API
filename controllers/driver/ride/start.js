const Ride = require("../../../model/Ride")

module.exports = async function (req, res) {
    //   request.user is getting fetched from Middleware after token authentication
    const ride = await Ride.findOne({ _id: req.query.rideId, "driver.id": req.user.id })
    if (ride == null) {
        res.status(401).json({ message: "No ride found" });
    } else {
        ride.started = !ride.started;

        await ride.save()
        res.json(ride);
    }
}