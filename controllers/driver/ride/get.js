const Ride = require("../../../model/Ride")


module.exports = async function (req, res) {
    //   request.user is getting fetched from Middleware after token authentication
    const rides = await Ride.find({ "driver.id": req.user.id })
    if (rides == null) {
        res.status(401).json({ message: "No rides found" });
    } else {
        res.json(rides);
    }
}