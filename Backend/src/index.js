import express from "express"
import mongoose from "mongoose"
import connectDB from "./db/db.js"
import dotenv from "dotenv"
dotenv.config({path:'./env'})
import app from "./app.js"

//PORT number
const PORT= process.env.PORT || 5000
// database connection
connectDB().then(()=>{
    console.log("CONNECTED")
    app.listen(PORT,()=>{
        console.log(`server is listening at port ${PORT}`)
    })
})
.catch((err)=>{
    console.log("FAILED CONNECTION: ",err)
})

