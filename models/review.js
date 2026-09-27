const mongoose=require("mongoose");
const mongourl="mongodb://127.0.0.1:27017/wonderlust";
async function main(){
    await mongoose.connect(mongourl);
}

main().then((res)=>{
    console.log("succesfull connected with mongoose");

}).catch((err)=>{
    console.log("somthing wrong in mongo connection");
})
const reviewSchema= new mongoose.Schema({
    rate: {
            type:Number,
            min:0,
            max:5
    },
    comment:String,
    createdat:{
        type:Date,
        default:Date.now
    }

});

const review= mongoose.model("review",reviewSchema);

module.exports=review;