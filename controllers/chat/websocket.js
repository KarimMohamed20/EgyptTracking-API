var wsAuth = require("../../middleware/wsAuth.js")
const User = require("../../model/User")
const Chat = require("../../model/Chat");
const ChatMessages = require("../../model/ChatMessages.js");


module.exports = function (chat) {
    chat.on("connection", async function (socket) {
        let chatObject;
        // AUTH
        var id = await wsAuth(socket.handshake.query.token);
        var studentId = socket.handshake.query.studentId;
        var driverId = socket.handshake.query.driverId;
        if (id != 'error') {
            // GET USER
            let user = await User.findById(id);
            // STUDENT OR DRIVER
            if (user.accountType === "Student") {
                // Connected as a Student
                console.log("Connected as a Student!");

                // Chat Info
                chatObject = await Chat.findOne({ studentId: id, driverId: driverId }).catch(e => { socket.disconnect() });
                var chatId = chatObject._id;
                var chatMessages = await ChatMessages.findOne({ chatId: chatId})
                await socket.join(chatId);
                socket.on('message', async function (data) {
                    console.log(data)
                    chatMessages.messages.push(JSON.parse(data))
                    chat.emit(chatId, data)
                    await chatMessages.save()
                });

            } else if (user.accountType === "Driver") {
                // Connected as a Student
                console.log("Connected as a Driver !");
                // Chat Info
                chatObject = await Chat.findOne({ driverId: id, studentId: studentId }).catch(e => { socket.disconnect() });
                console.log(chatObject)
                var chatId = chatObject._id;
                var chatMessages = await ChatMessages.findOne({ chatId: chatId })
                await socket.join(chatId)
                socket.on('message', async function (data) {
                    console.log(data)
                    chatMessages.messages.push(JSON.parse(data))
                    chat.emit(chatId, data)
                    await chatMessages.save()
                });
            }
        } else {
            socket.disconnect()
        }
    })
};