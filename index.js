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
const {reviewSchema}=require("./public/joiconstrains.js");
const{listingSchema}=require("./public/listingschemaconstranins.js")


app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.engine("ejs",ejsmate);
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));

async function main(){
    await mongoose.connect(mongourl);
}

main().then((res)=>{
    console.log("succesfull connected with mongoose");

}).catch((err)=>{
    console.log("somthing wrong in mongo connection");
})

app.get("/listing",async (req,res)=>{
   
   let x= await listing.find({});
   res.render("listings/index.ejs",{x});
     
})


app.get("/listing/new",(req,res)=>{
     console.log("🔥 NEW ROUTE");
    res.render("listings/new.ejs");
})
app.get("/listing/:id",async(req,res)=>{
    let id=req.params.id;
   
    let x= await listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{x});

})

app.post("/listing",async(req,res)=>{
    console.log("✅");
    const {error}=listingSchema.validate(req.body);
    if(error){
       console.log(error.details);
       return res.send("somthing worng");
    }
    let obj=req.body;
    await listing.create(obj);
    res.redirect("/listing");
})

app.get("/edit/:id",async (req,res)=>{
    let id=req.params.id;
    let obj=await listing.findById(id);
    res.render("listings/edit.ejs",{obj});
})
app.put("/listing/:id",async(req,res)=>{
    let id=req.params.id;
    await listing.findByIdAndUpdate(id,req.body);
    res.redirect("/listing");
})
app.get("/delete/:id",async(req,res)=>{
    let id=req.params.id;
    await listing.findByIdAndDelete(id);
    res.redirect("/listing");
})


app.post("/listing/:id/reviews",async(req,res)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        console.log(error.details);
        return res.send(error.details[0].message);
    }
     const find=await listing.findById(req.params.id);
    let newrev=new review(req.body);
    let  x= find.reviews.push(newrev._id);
    await newrev.save();
    await find.save();
    res.send("ok");
})

app.get("/listing/:pageid/delete/:reviewid",async(req,res)=>{
    const {pageid,reviewid}=req.params;
    await review.findByIdAndDelete(reviewid);
    await listing.updateOne(
        {_id:pageid},
        {$pull:{reviews:reviewid}}
    );
    res.redirect(`/listing/${pageid}`);

})
app.use((req,res)=>{
    res.status(404).send("404 - Page Not Found");
})
app.listen(port,()=>{
    console.log("app is listening");
});