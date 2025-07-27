const express = require("express");
const {result, uploadedFile, createNote, deleteNote, updateNote } = require("../Controller/note.controller");
const noteRouter = express.Router();
const upload = require('../config/cloudinary')


noteRouter.post("/note", upload.single('image'), createNote)
noteRouter.get("/result", result)
noteRouter.post("/delete", deleteNote)
noteRouter.post("/update", updateNote)
noteRouter.post("/media", uploadedFile)

module.exports = noteRouter