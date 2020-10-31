const Chat = require("../../model/Chat");
const ChatMessages = require("../../model/ChatMessages");
const User = require("../../model/User");

async function createChat(studentId, driverId) {
    var chat = Chat({
        studentId,
        driverId
    });

    chat = await chat.save();
    var chatMessages = ChatMessages({
        chatId: chat._id
    })
    await chatMessages.save()
    return chat;
}


exports.getMyChats = async function (req, res) {

    var user = await User.findById(req.user.id);

    if (user == null) {
        return res.status(401).json({ "message": "Unauthorized" })
    } else if (user.type == 'Student') {
        var chats = await Chat.find({ studentId: req.user.id });
        return res.json(chats)
    } else {
        return res.send("Should not be driver")
    }
}


exports.getSingleChat = async function (req, res) {
    var user = await User.findById(req.user.id);
    if (user == null) {
        return res.status(401).json({ "message": "Unauthorized" })
    } else if (user.accountType == 'Driver') {
        console.log('Started');

        var chat = await Chat.findOne({ studentId: req.body.studentId, driverId: req.user.id });
        if (chat == null) {
            chat = await createChat(req.body.studentId, req.user.id);
            var chatMessages = await ChatMessages.findOne({ chatId: chat._id });
            return res.json({chatMessages,chatId:chat._id})
        }
        var chatMessages = await ChatMessages.findOne({ chatId: chat._id });
        return res.json({chatMessages,chatId:chat._id})
    } else if (user.accountType == 'Student') {
        var chat = await Chat.findOne({ studentId: req.user.id, driverId: req.body.driverId });
        var chatMessages = await ChatMessages.findOne({ chatId: chat._id });
        return res.json({chatMessages,chatId:chat._id})
    }
}