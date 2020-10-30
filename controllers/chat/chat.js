const Chat = require("../../model/Chat");
const ChatMessages = require("../../model/ChatMessages");
const User = require("../../model/User");

async function createChat(studentId, driverId) {
    var chat = Chat({
        studentId,
        driverId
    });

    return await chat.save();
}


exports.getMyChats = async function (req, res) {

    var user = await User.findById(req.user.id);

    if (user == null) {
        return res.status(401).json({ "message": "Unauthorized" })
    } else if (user.type == 'Student') {
        var chats = await Chat.find({ studentId: req.user.id });
        return res.json(chats)
    } else if (user.type == 'Driver') {
        var chats = await Chat.find({ driverId: req.user.id })
        return res.json(chats)
    }
}


exports.getSingleChat = async function (req, res) {

    var user = await User.findById(req.user.id);

    if (user == null) {
        return res.status(401).json({ "message": "Unauthorized" })
    } else if (user.type == 'Driver') {

        var chat = await Chat.findOne({ studentId: req.body.studentId, driverId: req.user.id });
        if (chat == null) {
            chat = await createChat(req.body.studentId, req.user.id);
            var chatMessages = await ChatMessages.find({ chatId: chat._id });
            return res.json(chatMessages)
        }
        var chatMessages = await ChatMessages.find({ chatId: chat._id });
        return res.json(chatMessages)
    } else if (user.type == 'Student') {
        var chat = await Chat.findOne({ studentId: req.user.id, driverId: req.body.driverId });
        var chatMessages = await ChatMessages.find({ chatId: chat._id });
        return res.json(chatMessages)
    }
}