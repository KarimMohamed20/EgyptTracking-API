var wsAuth = require("../../middleware/wsAuth.js")
var User = require("../../model/User")
var Ride = require("../../model/Ride")


module.exports = function (ride) {
    ride.on("connection", async function (socket) {
        let rideObject;
        // AUTH
        var id = await wsAuth(socket.handshake.query.token);
        var rideId = socket.handshake.query.rideId;
        if (id !== 'error') {
            // GET USER
            let user = await User.findById(id);
            // STUDENT OR DRIVER
            if (user.accountType === "Student") {
                // Connected as a Student
                console.log("Connected as a Student!");
                rideObject = await Ride.findOne({ _id: user.currentRideId, }).catch(e => { socket.disconnect() });

                if (rideObject.students.includes(req.user.id) === false) {
                    socket.disconnect()
                } else {
                    await socket.join(rideId)
                }
            } else if (user.accountType === "Driver") {
                // Connected as a Driver
                console.log("Connected as a Driver!");

                rideObject = await Ride.findOne({ _id: rideId, "driver.id": id }).catch((e) => {
                    socket.disconnect()
                });
                if (rideObject == null) {
                    socket.disconnect()
                } else {

                    await socket.join(rideId)
                    socket.on('location', function (data) {
                        ride.emit(rideId, data)
                    });
                    socket.on('arrive', function (data) {
                        ride.emit(data.studentId, data)
                    });
                }
            }
        } else {
            socket.disconnect()
        }
    })
};