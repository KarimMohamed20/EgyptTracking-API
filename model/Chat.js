const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
    driverName: {
        type:String,
        required: true
    },
    driverId: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// export model Chat with ChatSchema
module.exports = mongoose.model("Chat", ChatSchema);
