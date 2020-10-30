const mongoose = require("mongoose");

const ChatMessagesSchema = mongoose.Schema({
    chatId: {
        type: String,
        required: true
    },
    messages: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

// export model ChatMessages with ChatMessagesSchema
module.exports = mongoose.model("ChatMessages", ChatMessagesSchema);
