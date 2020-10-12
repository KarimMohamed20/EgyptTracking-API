var wsAuth = require("../../middleware/wsAuth.js")
var User = require("../../model/User")
var Ride = require("../../model/Ride")
module.exports = function (ride) {
    ride.on("connection", async function (socket) {

        // AUTH
        var id = await wsAuth(socket.handshake.query.token);
        var rideId = socket.handshake.query.rideId;
        if (id != 'error') {

            // GET USER
            var user = await User.findById(id);

            // STUDENT OR DRIVER
            if (user.accountType == "Student") {
                // Connected as a Student
                console.log("Connected as a Student!")
                var ride = await Ride.findOne({_id: rideId, 'students': {$in: [id]}})
                console.log(ride)
            } else if (user.accountType == "Driver") {
                // Connected as a Driver
                console.log("Connected as a Driver!")

                var ride = await Ride.findOne({_id: rideId, "driver.id": id})
                console.log(ride)
            }
        } else {
            socket.disconnect()
        }
    })
}