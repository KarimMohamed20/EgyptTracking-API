var wsAuth = require("../../middleware/wsAuth.js")
var User = require("../../model/User")
module.exports = function (ride) {
    ride.on("connection", async function (socket) {
        var id = await wsAuth(socket.handshake.query.token);

        if (id != 'error') {
            console.log(id)
            var user = await User.findById(id);

            if (user.accountType == "Student") {
                console.log("Connected as a Student!")
            } else if(user.accountType=="Driver") {
                console.log("Connected as a Driver!")
            }
        } else {
            socket.disconnect()
        }
    })
}