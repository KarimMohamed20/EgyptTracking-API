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
                var rideObject = await Ride.findOne({ _id: rideId, 'students': { $in: [id] } }).catch((e) => { socket.disconnect() })

                if (rideObject == null) {
                    socket.disconnect()
                } else {


                    

                }
            } else if (user.accountType == "Driver") {
                // Connected as a Driver
                console.log("Connected as a Driver!")

                var rideObject = await Ride.findOne({ _id: rideId, "driver.id": id }).catch((e) => { socket.disconnect() })
                if (rideObject == null) {
                    socket.disconnect()
                } else {

                    await socket.join(rideId)
                    socket.on('post', function (data) {
                        console.log(data)
                        ride.emit(rideId,data)
                    });
                }
            }

        } else {
            socket.disconnect()
        }
    })
}