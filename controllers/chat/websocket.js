var wsAuth = require("../../middleware/wsAuth.js")
const User = require("../../model/User")
const Chat = require("../../model/Chat");
const ChatMessages = require("../../model/ChatMessages.js");


module.exports = function (chat) {
    chat.on("connection", async function (socket) {
        let chatObject;
        // AUTH
        var id = await wsAuth(socket.handshake.query.token);
        var chatId = socket.handshake.query.chatId;
        if (id != 'error') {
            // GET USER
            let user = await User.findById(id);
            // STUDENT OR DRIVER
            if (user.accountType === "Student") {
                // Connected as a Student
                console.log("Connected as a Student!");

                // Chat Info
                chatObject = await Chat.findById(chatId).catch(e => { socket.disconnect() });
                chatMessages = await ChatMessages.find({chatId: chatId})
                await socket.join(chatId);
                socket.on('message', function (data) {
                    console.log(data)
                    chatMessages.messages.push(JSON.parse(data))
                    chat.emit(chatId, data)
                    await chatMessages.save()
                });
                
            } else if (user.accountType === "Driver") {
                // Connected as a Student
                console.log("Connected as a Driver !");
                
                // Chat Info
                chatObject = await Chat.findById(chatId).catch(e => { socket.disconnect() });
                chatMessages = await ChatMessages.find({chatId: chatId})
                await socket.join(chatId)
                socket.on('message', function (data) {
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