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
  password: {
    type: String,
    required: true
  },
  accountType: {
    type: String,
    required: true
  }
},{
  timestamps:true
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
