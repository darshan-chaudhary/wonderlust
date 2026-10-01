const express=require("express");
const route=express.Router();
const listing = require("../models/listing.js");
const review = require("../models/review.js");

const methodOverride = require("method-override");
const {reviewSchema}=require("../public/utils/joiconstrains.js");
const{listingSchema}=require("../public/utils/listingschemaconstranins.js")


route.get("/",async (req,res)=>{
   
   let x= await listing.find({});
   res.render("listings/index.ejs",{x});
     
})


route.get("/new",(req,res)=>{
     console.log("🔥 NEW ROUTE");
    res.render("listings/new.ejs");
})
route.get("/:id",async(req,res)=>{
    let id=req.params.id;
   
    let x= await listing.findById(id).populate("reviews");
    if(!x){
        req.flash("notfound","does not exist");
        res.redirect("/listing");
    }
    res.render("listings/show.ejs",{x});

})

route.post("/",async(req,res)=>{
    console.log("✅");
    const {error}=listingSchema.validate(req.body);
    if(error){
       console.log(error.details);
       return res.send("somthing worng");
    }
    let obj=req.body;
    await listing.create(obj);
    req.flash("success","new place registerd");
    res.redirect("/listing");
})

route.get("/edit/:id",async (req,res)=>{
    let id=req.params.id;
    let obj=await listing.findById(id);
    res.render("listings/edit.ejs",{obj});
})
route.put("/:id",async(req,res)=>{
    let id=req.params.id;
    await listing.findByIdAndUpdate(id,req.body);
    res.redirect("/listing");
})
route.get("/delete/:id",async(req,res)=>{
    let id=req.params.id;
    // let obj =await listing.findById(id);
    // if(obj.reviews.length){                       //we use middleware for it to delete the reviews
    //     await review.deleteMany({
    //         _id:{$in : obj.reviews}
    //     })
    // }

    
    await listing.findByIdAndDelete(id);
    req.flash("success","succesful");
    res.redirect("/listing");
})


route.post("/:id/reviews",async(req,res)=>{
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
    let id=req.params.id;
    res.redirect(`/listing/${id}`);
})

route.get("/:pageid/delete/:reviewid",async(req,res)=>{
    const {pageid,reviewid}=req.params;
    await review.findByIdAndDelete(reviewid);
    await listing.updateOne(
        {_id:pageid},
        {$pull:{reviews:reviewid}}
    );
    res.redirect(`/listing/${pageid}`);

})

module.exports = route;