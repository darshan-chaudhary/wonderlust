const express=require("express");
const passport=require("passport");
const route=express.Router();
const { isLogedIn, savedRedirectUrl } = require("../middleware.js");
const user=require("../models/user.js");
route.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})
route.post("/register", async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        const newuser = new user({
            username,
            email
        });

        const registeruser = await user.register(newuser, password);

        req.login(registeruser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash("success", "Welcome to wonderland");
            return res.redirect("/listing");  // ✅ redirect yahi
        });

        console.log(registeruser);

    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup");
    }

});

  route.get("/login",(req,res)=>{
    console.log("LOGIN PAGE:", req.session.redirectUrl);
    res.render("users/login.ejs");
  })

   route.post("/loginuser",savedRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),(req, res) => {

        //console.log("AFTER PASSPORT:", req.session.redirectUrl);
        // let redirectUrl = req.session.redirectUrl || "/listing"; passport authinatication values ko reset karr dega iss liye req.locals ka use karenge yaha 
        //delete req.session.redirectUrl;
  
        req.flash("success", "Welcome back");

         res.redirect(res.locals.redirectUrl);
    }
);

  route.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","YOu are logedout");
      res.redirect("/listing");
    })
  })
module.exports=route;
