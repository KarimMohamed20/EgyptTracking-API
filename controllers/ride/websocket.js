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
                rideObject = await Ride.findOne({ _id: user.currentRideId, }).catch(e => { console.log("Disconnected"); socket.disconnect() });
                
                if (rideObject.students.includes(id) === false) {
                    console.log("Doesn't contain this student")
                    socket.disconnect()
                } else {
                    await socket.join(rideId)
                    await socket.on('5f9d91e6a89fd47a80a6f999',(data)=> console.log("OK"+data))
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
                        // send location to rideId and listens to rideId from the client
                        console.log(data)
                        var coordinates = JSON.parse(data)
                        if (coordinates.type == 'location') {
                            rideObject.lastLat = coordinates.lat;
                            rideObject.lastLng = coordinates.lng;
                            rideObject.save()
                        }
                        console.log(rideId);
                        ride.emit(rideId, data)
                    });
                    socket.on('alert', function (data) {
                        console.log(user.accountType)
                        // alert to studentId and listens to studentId from the client
                        var alert = JSON.parse(data)
                        console.log(alert)
                        ride.emit(alert.studentId, alert)
                    });
                }
            }
        } else {
            socket.disconnect()
        }
    })
};