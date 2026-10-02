const express=require("express");
const passport=require("passport");
const route=express.Router();
const user=require("../models/user.js");
route.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})
route.post("/register",async(req,res)=>{
    try{
       let {username,email,password}= req.body;
      const newuser=new user({
         username,
          email
      })
      const registeruser=await user.register(newuser,password);
      console.log(registeruser);
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup")
    }
      res.redirect("/listing");
})

  route.get("/login",(req,res)=>{
    res.render("users/login.ejs");
  })

  route.post("/loginuser",
    passport.authenticate("local",
    {failureRedirect:"/login",
     failureFlash:true,
    }),async(req,res)=>{
    req.flash("success","welcome back")
    res.redirect("/listing");
  })
module.exports=route;
