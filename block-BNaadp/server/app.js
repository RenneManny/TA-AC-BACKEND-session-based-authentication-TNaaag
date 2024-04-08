const cookieParser = require('cookie-parser');
const express = require('express');
const app=express();
app.use(cookieParser());
app.get("/",(req,res)=>{
    // console.log("Cookies:",req.cookies);
    res.cookie("username","Akhil Kumar");
    console.log("Cookies:",req.cookies);
    res.end();
})
    
app.listen(3000,()=>{
    console.log("Listening!!");
})