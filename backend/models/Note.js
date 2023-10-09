const mongoose = require("mongoose");

const { Schema } = mongoose;

const NoteSchema = new Schema({
  //-----Notes associate with Users so any other can't access it except user  (Working like foreign Key)----------
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  userName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("notes", NoteSchema);
module.exports = Note;
