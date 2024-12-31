import express from "express"
const app=express();
import cookieParser from "cookie-parser"
import cors from "cors"

// .use for middlewares

/*
Here, 
CORS is used for cross origin and proxies are set in it';.
origin= to know from where thedata or url is coming
*/
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
}))
// jab data aata h khi se to agr wo json format me h to hume use accept krna hoga (configure).
// Limit is used to tell the user the max. amount of json jo ki accept hoga humare server me
// limit dena zroori h kyuki agr unlimited aaya---- to site crash ho skti h 
app.use(express.json())

// urlencoded ko use kiya jaata h url ki formatting ke liye mtlb----- humb browser pr likhte h "nishu sharma.com" ---------> "nishu%20%sharma.com"
// ye url encoder ka kaam h 
app.use(express.urlencoded())


//static is used to configure the static files of the public folder (or any other given) eg. HTML ,CSS, PDF files etc.
app.use(express.static('public'))

//Cookieparser is used to handle the flow, storage, get, post, of cookies in express.js
app.use(cookieParser())

// importing router

import userRouter from "./routes/userroutes.js"
import eventRouter from "./routes/eventroutes.js"
import productRouter from "./routes/productroutes.js"
//declaring routers
app.use("/v1/api/users",userRouter)
app.use("/v1/api/events",eventRouter)
app.use("/v1/api/products",productRouter)


export {app}


export default app