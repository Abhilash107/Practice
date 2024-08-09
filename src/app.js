import express from "express";

const app = express()

// app.listen(3000, ()=>{
//     console.log("Listening on 3000");
    
// })

app.get("/", (req,res)=>{
    
    res.send("jjj")
    
})
export { app}