const mongoose = require("mongoose");

const urls = new mongoose.Schema({
  urlSID: {
    type: Number,
  },
  originalUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  transcodeVideo: {
    type: String,
  },
});

module.exports = mongoose.model("urls", urls);
