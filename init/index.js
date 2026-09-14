let mongoose=require("mongoose");
let initdata=require("./data.js");
const listing=require("../models/listing.js");
const mongourl="mongodb://127.0.0.1:27017/wonderlust";
async function main(){
    await mongoose.connect(mongourl);
}

main().then((res)=>{
    console.log("succesfull connected with mongoose");

}).catch((err)=>{
    console.log("somthing wrong in mongo connection");
})

const initdb=async()=>{
    await listing.insertMany(initdata.data);
    console.log("data initlized");
}

initdb().then((res)=>{
    console.log("succes to insert")
}).catch((err)=>{
    console.log(err);
})