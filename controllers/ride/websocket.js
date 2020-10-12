var wsAuth = require("../../middleware/wsAuth.js")
var User = require("../../model/User")
var Ride = require("../../model/Ride")
module.exports = function (ride) {
    ride.on("connection", async function (socket) {
        console.log('connected')

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
                var ride = await Ride.findOne({ _id: rideId, 'students': { $in: [id] } }).catch((e) => { socket.disconnect() })

                if (ride == null) {
                    socket.disconnect()
                } else {
                    // socket.join(rideId)
                    console.log(ride)
                }
            } else if (user.accountType == "Driver") {
                // Connected as a Driver
                console.log("Connected as a Driver!")

                var ride = await Ride.findOne({ _id: rideId, "driver.id": id }).catch((e) => { socket.disconnect() })
                if (ride == null) {
                    console.log('error')
                    socket.disconnect()
                } else {
                    // socket.join(rideId)
                    console.log(ride)
                }
            }
        } else {
            console.log('error')
            socket.disconnect()
        }
    })
}