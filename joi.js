const joi = require('joi');
const listingSchema=joi.object({
    listing:joi.object({
        roomNumber:joi.string().required(),
        type:joi.string().required(),
        pricePerNight:joi.string().required(),
        status:joi.string().required(),
        capacity:joi.number().required().min(1),
        image:joi.string().required().allow("",null),
    }).required()
})
module.exports=listingSchema;
module.exports.reviewSchema=joi.object({
    reviews:joi.object({
        comment:joi.string().required(),
        rating:joi.string().min(1).min(5).required(),


    })
}).required()

module.exports.userSchema=joi.object({
    user:joi.object({
        username:joi.string().required(),
        email:joi.string().required(),
        password:joi.string().required(),

    })
}).required()
