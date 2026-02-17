

import mongoose  from "mongoose";


// 1- create schema 
// 2- create model from that schema

const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    
    }
},{timestamps:true})

// 2nd step create model from above shema

const noteModel = mongoose.model('Note',noteSchema)

export default noteModel;