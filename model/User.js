const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  currentRideId: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  accountType: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: false
  },
  lng: {
    type: String,
    required: false
  },
}, {
  timestamps: true
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
