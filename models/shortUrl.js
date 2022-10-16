const mongoose = require("mongoose");

const shortid = require("shortid");


// const short = require("short-uuid");
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    // default: () => shortid.generate(),
    // default: () => short.generate(),
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
