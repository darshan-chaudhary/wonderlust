const joi =require("joi");
module.exports.reviewSchema=joi.object({
     
        comment: joi.string().required(),
        rate: joi.number().min(1).max(5).required()
    
});