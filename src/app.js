const express=require("express")
const app=express()
const PORT=3000


app.use("/home/123",(req,res)=>{
    res.send("Welcome to home/123 section")
})

app.use("/home",(req,res)=>{
    res.send("Welcome to home section")
})

app.use("/contact",(req,res)=>{
    res.send("Welcome To the contact section!")
    
})


app.use("/about",(req,res)=>{
    
    res.send("Welcome to About Ssection")
})

app.use("/",(req,res)=>{
    res.send("Welcome welcome welcome")
})

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})