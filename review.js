


const express=require("express")
const router=express.Router({mergeParams:true});
const app=express()
const methodOverride=require("method-override");
const listing=require("../models/listing.js");
const path=require("path");
const data = require("../init/data.js");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static('public'));
app.use(methodOverride("_method"));
let ejsmate=require("ejs-mate");
app.engine('ejs',ejsmate)
app.use(express.static("public"));


const reviewSchema=require("../joi.js")
const Review=require("../models/review.js")
const reviewValidateter=(req,res,next)=>{
    let { err }=reviewSchema.validate(req.body);
    if(err){
        throw new ExpressError(400,"something wrong")
    }
    else{
        next();
    }
}

const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js");
const { islogin, isReview } = require("../middle.js");
// const review = require("../models/review.js");


router.post("/",islogin,reviewValidateter,async(req,res)=>{
    let { id }=req.params;
    
    let data=await listing.findById(id)
    let neWreview=new Review(req.body.reviews)
    neWreview.author=req.user._id;
    console.log(neWreview)
    data.reviews.push(neWreview)
    // console.log(data)
    await neWreview.save()
    await data.save()
    
    res.redirect(`/rooms/${data._id}`)
})

router.delete("/:reviewId",islogin,isReview,wrapAsync(async(req,res)=>{
    let { id,reviewId }=req.params;
    await listing.findByIdAndUpdate(id,{ $pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/rooms/${id}`)

}))

module.exports=router;
