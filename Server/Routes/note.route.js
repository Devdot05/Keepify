const express = require("express");
const {result, uploadedFile, createNote, deleteNote, updateNote } = require("../Controller/note.controller");
const noteRouter = express.Router();
const upload = require('../config/cloudinary');
const verifyToken = require("../Middleware/verifyToken");
const { getProtected } = require("../Controller/user.controller");


noteRouter.post("/note", upload.single('image'), createNote)
noteRouter.get("/result", result)
noteRouter.post("/delete", deleteNote)
noteRouter.post("/update", updateNote)
noteRouter.post("/media", uploadedFile)

module.exports = noteRouter