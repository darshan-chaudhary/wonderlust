let mongoose = require("mongoose");
let review=require("./review");

let schema = mongoose.Schema;

const listingSchema = new schema({
    title: {
        type: String,
        required: true
    },

    description: String,

    image: {
    filename: {
        type: String
    },
    url: {
        type: String
    }

},

    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"review"
        }
    ]
        

});

  listingSchema.post("findOneAndDelete",async (place)=>{
     
      await  review.deleteMany({
          _id:{$in:place.reviews}
       })
  });

const listing = mongoose.model("listing", listingSchema);

module.exports = listing;