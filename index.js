const express=require("express");
const path=require("path");
const app=express();
const mongoose=require("mongoose");
const listing=require("./models/listing.js")
const review=require("./models/review.js"); 
const port=8080;
const mongourl="mongodb://127.0.0.1:27017/wonderlust";
const methodOverride = require("method-override");
const ejsmate=require("ejs-mate");
const {reviewSchema}=require("./public/utils/joiconstrains.js");
const{listingSchema}=require("./public/utils/listingschemaconstranins.js")
const listingroutes=require("./routes/listing.js");
const userroute=require("./routes/user.js");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local")
const user=require("./models/user.js");



     const sessionOption={
         secret:"myhiddenstring",
         resave:false,
         saveUninitialized:true,
         cookie :{
            expires:new Date(Date.now()+1000*60*60*24*3),
            maxAge:1000*60*60*24*3,
            httpOnly:true
         }
     }
     
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.engine("ejs",ejsmate);
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.use(cookieParser());
app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.notfound=req.flash("notfound");
    res.locals.exist=req.flash("error");
    next();
})
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use("/listing",listingroutes);
app.use("/",userroute);

// app.get("/register",async (req,res)=>{
//     let fakeuser=new user({
//         email:"dcpanwar@gamil.com",   demo user
//         username:"darshan"
//     });
//     let registeruser=await user.register(fakeuser,"dcpanwar");
//     res.send(registeruser);
// })

async function main(){
    await mongoose.connect(mongourl);   
}

main().then((res)=>{
    console.log("succesfull connected with mongoose");

}).catch((err)=>{
    console.log("somthing wrong in mongo connection");
})

app.use((req,res,next)=>{
    res.send("404 - Page Not Found");
})
app.listen(port,()=>{
    console.log("app is listening");
});