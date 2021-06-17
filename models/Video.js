const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', videoSchema);
