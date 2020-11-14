const Ride = require("../../../model/Ride");
const { sendNotification } = require("../../OneSignal/notifications");

module.exports = async function (req, res) {
    //   request.user is getting fetched from Middleware after token authentication
    const ride = await Ride.findOne({ _id: req.query.rideId, "driver.id": req.user.id })
    if (ride == null) {
        res.status(401).json({ message: "No ride found" });
    } else {
        // try {

        //     for (var i = 0; i < ride.studentsObjects.length; i++) {
        //         if (ride.started == false) {
        //             await sendNotification(ride.studentsObjects[i]['email'], { header: `Captain ${ride.driver.fullName} started the ride.`, body: "Currently you can track this ride" })
        //         } else {
        //             await sendNotification(ride.studentsObjects[i]['email'], { header: `Captain ${ride.driver.fullName} ended the ride.`, body: "Currently you can't track this ride" })
        //         }
        //     }
        // } catch (e) {
            
        // }
        ride.started = !ride.started;
        await ride.save()
        res.json(ride);
    }
}