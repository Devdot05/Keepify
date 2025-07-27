const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    userId: String,
    title: {type: String},
    content: {type: String},
    image: {url: String, public_id: String},   
}, {timestamps: true})
let noteModel = mongoose.model("note", noteSchema)

module.exports = noteModel