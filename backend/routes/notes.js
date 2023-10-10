const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const multer = require("multer");

// const { storeFile } = require("../middleware/storeFile");

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

//---------ROUTE 1 :----------GET ALL THE NOTES USING 'GET METHOD' "/api/notes/fetchallnotes". login requires
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Enternal Server Error");
  }
});

//---------ROUTE 2 :----------ADD A NEW NOTES USING 'POST METHOD' "/api/notes/addnote". login requires
router.post(
  "/addnote",
  fetchuser,
  // upload.single("image"),
  [
    body("userName", "Please enater your Name").isLength({ min: 3 }),
    body("emailAddress", "Please enter a valid email address").isEmail(),
    body("phoneNumber", "Please enter a valid phone number").isLength({
      min: 10,
      max: 10,
    }),
  ],
  async (req, res) => {
    try {
      const { userName, emailAddress, phoneNumber } = req.body;
      //-------------IF THERE ARE ERRORS, RETURN BAD REQUEST AND THE ERRORS------------
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        userName,
        emailAddress,
        phoneNumber,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Enternal Server Error");
    }
  }
);

// router.post(
//   "/addnote",
//   fetchuser,
//   upload.single("image"),
//   [
//     body("userName", "Please enter your Name").isLength({ min: 3 }),
//     body("emailAddress", "Please enter a valid email address").isEmail(),
//     body("phoneNumber", "Please enter a valid phone number").isLength({
//       min: 10,
//       max: 10,
//     }),
//   ],
//   async (req, res) => {
//     try {
//       const { userName, emailAddress, phoneNumber } = req.body;

//       // Check for validation errors
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       // File details
//       let fileId = null;
//       if (req.file) {
//         const { originalname, buffer } = req.file;

//         // Save file to GridFS and get the ObjectId
//         fileId = await storeFile(originalname, createReadStream(buffer));
//       }

//       // Create and save note
//       const note = new Note({
//         userName,
//         emailAddress,
//         phoneNumber,
//         fileId: fileId, // Set the fileId in the note
//         user: req.user.id,
//       });

//       const savedNote = await note.save();
//       res.json(savedNote);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );

//---------ROUTE 3 :----------FOR UPDATING A EXISTING NOTES USING 'PUT METHOD' "/api/notes/updatenote". login requires
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { userName, emailAddress, phoneNumber } = req.body;
  try {
    //--------------CREATE A NEW NOTE OBJECT-------------
    const newNote = {};
    if (userName) {
      newNote.userName = userName;
    }
    if (emailAddress) {
      newNote.emailAddress = emailAddress;
    }
    if (phoneNumber) {
      newNote.phoneNumber = phoneNumber;
    }

    //----------FIND THE NOTE TO BE UPDATED AND UPDATE IT..-----------
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Enternal Server Error");
  }
});

//---------ROUTE 4 :----------FOR DELETING A EXISTING NOTES USING 'DELETE METHOD' "/api/notes/deletenote". login requires

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //----------FIND THE NOTE TO BE DELETED AND DELETE IT..-----------
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //-----------ALLOW DELETION ONLY IF USER OWN THIS NOTE---------
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "Deletion Success": "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Enternal Server Error");
  }
});

router.get("/search", async (req, res) => {
  const searchTerm = req.query.q;

  try {
    const results = await Note.find({
      $or: [
        { userName: { $regex: searchTerm, $options: "i" } },

        { emailAddress: { $regex: searchTerm, $options: "i" } },
      ],
    }).populate("user", "userName");

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
