const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the Notes using a Get: "/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

// ROUTE 2: Add a new Note using a POST: "/api/notes/fetchallnotes". Login required.
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a vaild title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res, next) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      // Creating New Note and saving in the database
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      next(error);
    }
  }
);

// ROUTE 3: Update an existing Notes using a PUT: "/api/notes/updatenote/:id". Login required.
router.put("/updatenote/:id", fetchuser, async (req, res, next) => {
  try {
    const { title, description, tag } = req.body;
    // Create a new Note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Not Found");

    if (note.user.toString() !== req.user.id)
      return res.status(404).send("Not Allowed");

    note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        $set: newNote,
      },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    next(error);
  }
});

// ROUTE 4: Update an existing Notes using a DELETE: "/api/notes/deletenote". Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res, next) => {
  try {
    // Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Not Found");

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id)
      return res.status(404).send("Not Allowed");

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
