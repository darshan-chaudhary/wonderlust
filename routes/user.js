const express=require("express");
const route=express.Router();
const user=require("../models/user.js");
route.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})
route.post("/register",async(req,res)=>{
     let {username,email,password}= req.body;
     const newuser=new user({
        username,
        email
      })
      const registeruser=await user.register(newuser,password);
      console.log(registeruser);
      res.redirect("/listing");


})
module.exports=route;
