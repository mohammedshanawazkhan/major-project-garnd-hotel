const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const listingSchema=new Schema({
    roomNumber:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    floor:{
        type:Number,
        required:true,
    },
    pricePerNight:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    capacity:{
        type:Number,
        required:true,
    },
    image:{
       url:String,
       filename:String,
        
    },
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review"
    },
    
],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"

    }
});
const Review=require("../models/review.js")

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})
const listing=mongoose.model("listing",listingSchema);
module.exports=listing;
