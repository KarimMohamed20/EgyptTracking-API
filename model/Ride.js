const mongoose = require("mongoose");

const RideSchema = mongoose.Schema({
  rideName: {
    type: String,
    required: true
  },
  driver: {
    type: Map,
    required: true
  },
  helperName: {
    type: String,
    required: true
  },
  started: {
    type: Boolean,
    required: true
  },
  students: {
      default: {},
      type: mongoose.Schema.Types.Mixed,
  },
  lastLat: {
    type: Number,
  },
  lastLng: {
    type: Number,
  }
},{
  timestamps:true
});

// export model ride with RideSchema
module.exports = mongoose.model("ride", RideSchema);
