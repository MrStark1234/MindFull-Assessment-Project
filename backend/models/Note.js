const mongoose = require("mongoose");

const { Schema } = mongoose;

const NoteSchema = new Schema({
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

  // fileId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "uploads",
  // },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("notes", NoteSchema);
module.exports = Note;
