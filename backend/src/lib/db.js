import mongoose from "mongoose";

import { ENV } from "./env.js"

export const connectDB = async() =>{
    
    console.log("Connected to MongoDB");
    try {
        const conn = await(mongoose.connect(ENV.DB_URL))
        console.log("Connected to MongoDB:", conn.connection.host)
    } catch (error) {
        console.log("Error connecting to MongoDB", error)
        process.exit(1); //0 means succes,  1 means failure
    }
}