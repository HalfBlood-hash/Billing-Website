

import dotenv from "dotenv"
dotenv.config()



import cors from "cors"
import express from "express"
import notesRoute from "./Router/notesRoute.js"
import { connectDb } from "./config/db.js"
import path, { dirname } from "path"




const __dirname=path.resolve();
const port=process.env.PORT
const app=express()
connectDb();


// for local development 
if(process.env.NODE_ENV!=="production"){

    app.use(cors({
        origin: "http://localhost:5173"
    }))
}

// middleware to take contents
app.use(express.json())

app.use('/api/notes',notesRoute)


// in production 
if(process.env.NODE_ENV==="production")
{

    app.use(express.static(path.join(__dirname,"../BillingWebsite/dist")))
    app.get(/.*/,(req,res)=>{
        res.sendFile(path.join(__dirname,"../BillingWebsite","dist","index.html"))
    })
    
}
app.listen(port,()=>{
    console.log(`Server is started on port ${port}`)
})


