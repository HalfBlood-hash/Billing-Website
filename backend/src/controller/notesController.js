

import noteModel from "../Models/Note.model.js"
 
// controllers


export const getAllNotes=async (req,res)=>{
    
   try {
     const notes=await noteModel.find()
     
 
     res.status(200).json({message:"Get all Notes",payload:notes})
   } catch (error) {
    console.error("error in getAllNotes Controller",error)
    res.status(500).json({message:"Internal Server Error"})
   }
}

export const getNoteById=async (req,res)=>{
    
    const noteId=req.params.id;
   
    const note=await noteModel.findById(noteId)
    res.status(200).json({message:"Get Note By Id",payload:note})

}


export const createNote=async (req,res)=>{
    
    const {title,content}=req.body;
    try {
        const newNote=new noteModel({title,content})
        const savedNote=await newNote.save();
        res.status(201).json({message:"Note created successfully",payload:savedNote})


    } catch (error) {
        console.error("error in createnote controllers",error)
        res.status(500).json({message:"Internal Server Error"})
    }

}


export const updateNote=async (req,res)=>{
    try {
        const {title,content}=req.body
        const noteId=req.params.id;
        const updatedNote=await noteModel.findByIdAndUpdate(noteId,{title,content},{new:true})
        res.status(200).json({message:"Note updated successfully",payload:updatedNote})

    } catch (error) {
        console.error("error in updateNote controllers",error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const deleteNote=async (req,res)=>{
   
    const noteId=req.params.id;

    const deletedNote=await noteModel.findByIdAndDelete(noteId)
    res.status(200).json({message:"Note deleted successfully",payload:deletedNote})


}