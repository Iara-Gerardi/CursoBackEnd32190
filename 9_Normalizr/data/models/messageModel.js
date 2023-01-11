const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  author: {
    id: { type: String, require: true },
    name: { type: String, require: true },
    lastname: { type: String, require: true },
    age: { type: Number, require: true },
    alias: { type: String, require: true },
    avatar: { type: String, require: true },
  },
  text: { type: String, require: true, max: 140 },
});

module.exports = mongoose.model('messageSchema', messageSchema);