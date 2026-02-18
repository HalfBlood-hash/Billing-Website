

import dotenv from "dotenv"
import cors from "cors"
import express from "express"
import notesRoute from "./Router/notesRoute.js"
import { connectDb } from "./config/db.js"

dotenv.config()



const port=process.env.PORT
const app=express()
connectDb();

app.use(cors({
    origin: "http://localhost:5173"
}))

// middleware to take content
app.use(express.json())

app.use('/api/notes',notesRoute)



app.listen(port,()=>{
    console.log(`Server is started on port ${port}`)
})



// mongodb+srv://2309000satyam_db_user:khCIiAEpj6KJtQRx@cluster0.zbppvob.mongodb.net/?appName=Cluster0