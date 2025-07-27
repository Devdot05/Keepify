const { model } = require("mongoose");
const noteModel = require("../Model/note.model");
const { response } = require("express");
require('../config/cloudinary')
const cloudinary = require("cloudinary").v2


const createNote = (req, res) => {
    // console.log(req.body);
    let newNote = new noteModel(req.body)
    if(req.file){
        newNote.image = {
            url: req.file.path,
            public_id: req.file.filename
        }
    }
    newNote.save()
    .then((result) => {
        console.log(result);
        res.send(result)
        
    }).catch((err) => {
        console.log(err);
        
    })
    
}

const result = (req, res) => {
     noteModel.find().sort({ createdAt: -1 }) // Sort by newest first
    .then((notes) => {
      res.status(200).json({ status: true, message: "Notes fetched successfully", notes });
      // console.error("Notes fetching successfully", notes);
    })
    .catch((err) => {
      console.error("Error fetching notes:", err);
      res.status(500).json({ status: false, message: "Failed to fetch notes" });
    });
}

// const deleteInfo = (req, res) => {
//    console.log(req.body.id);
//    noteModel.findByIdAndDelete(req.body.id)
//    .then((respond)=>{
//     console.log("it is working");
//     res.json({status: true, message: "successful", respond})
    
//    }).catch((err)=>{
//     console.log(err);
//     res.send({status: false, message: "not successful", err})
    
//    })
// }

// const updateNote = (req, res) => {
//     console.log(req.body);
//     let {id, title, content} = req.body
//     noteModel.findByIdAndUpdate(id, {title,content})
//     .then((response)=>{
//         console.log("Updated Successfully");
//         res.send({status: true, message: "Note updated successfully", response})
        
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.send({status: false, message: "Fail to updated note"})
        
//     })
    
// }


const deleteNote = async (req, res) => {
  try {
    const { id } = req.body; // or req.params.id depending on your route

    // 1. Find the note in the database
    const note = await noteModel.findById(id);
    if (!note) {
      return res.status(404).json({ status: false, message: "Note not found" });
    }

    // 2. If the note has an image, delete it from Cloudinary
    if (note.image && note.image.public_id) {
      // Use the public_id to destroy the image on Cloudinary
      await cloudinary.uploader.destroy(note.image.public_id);
      console.log("Image deleted from Cloudinary:", note.image.public_id);
    }

    // 3. Delete the note from MongoDB
    await noteModel.findByIdAndDelete(id);
    
    console.log("Note deleted successfully from DB:", id);
    res.status(200).json({ status: true, message: "Note deleted successfully" });

  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ status: false, message: "Failed to delete note" });
  }
};

// UPDATE a note
const updateNote = async (req, res) => {
  try {
    const { _id, title, content } = req.body;
    console.log(req.body);
    
    // Note: Handling image updates is more complex. For now, this only updates text.
    // To update an image, you would first delete the old one from Cloudinary and then upload the new one.
    const updatedNote = await noteModel.findByIdAndUpdate(_id, { title, content }, { new: true });
    // const updatedNote = await noteModel.findById({ _id, title, content } )
    console.log(updatedNote);
    

    if (!updatedNote) {
      return res.status(404).json({ status: false, message: "Note not found" });
    }
    
    console.log("Note updated successfully:", updatedNote);
    res.status(200).json({ status: true, message: "Note updated successfully", note: updatedNote });

  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ status: false, message: "Failed to update note" });
  }
};

 
const uploadedFile =async (req, res) => {
    console.log(req.body.file);
    let media = req.body.file;
    console.log(media);
    
    const uploadedImage = await cloudinary.uploader.upload(media, (err, result) => {
        if(result){
        // res.status({status: true, message: " upload file successfully",  result})
        res.status(200).json(result);
        // res.send("done")
            // res.send([status: true, result.secure_url])
            console.log("uploaded successfully", result);
            
        }else{
            res.status(err, "error occur")
        }
    })
    // cloudinary.uploader.upload(media, (err, result) => {
    //     if(result){
    //     // res.status({status: true, message: " upload file successfully",  result})
    //     res.status(200).json(result);
    //     // res.send("done")
    //         // res.send([status: true, result.secure_url])
    //         console.log("uploaded successfully", result);
            
    //     }else{
    //         res.status(err, "error occur")
    //     }
    // })
    
}



module.exports = {createNote, result, deleteNote, updateNote, uploadedFile}