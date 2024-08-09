import mongoose from "mongoose"
import dotenv from "dotenv"
import {app} from "../src/app.js"
import connectDB from "../db/index.js"


dotenv.config({
    path: './.env'
})


connectDB()
.then( ()=>{
    app.listen(process.env.PORT || 8000, (req, res)=>{
        console.log(`Server is listening on Port: ${process.env.PORT}`)   
    })
}  )
.catch( (err)=>{
    console.log("MongoDb connection error");
} )