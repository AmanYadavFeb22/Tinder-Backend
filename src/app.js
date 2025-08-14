const express = require("express");
const {adminauth}=require("../middlewares/adminauth")

const app = express();
const PORT = 3000;

app.get("/admin",adminauth,(req,res)=>{
    res.send("its /admin")
})

app.get("/admin/getalldata",adminauth,(req,res)=>{
    
    res.send("all data sent")
})

app.get("/admin/deleteuser",adminauth,(req,res)=>{

    res.send("user data deleted")
    
})





app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
