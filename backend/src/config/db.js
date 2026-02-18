

import mongoose from "mongoose"


export const connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODBURI)
        console.log("Database connection successfull")
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);//exit with failure  s
    
    }
}
