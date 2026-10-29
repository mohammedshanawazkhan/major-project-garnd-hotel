module.exports.islogin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl
        req.flash("error","you have to login first")
        return res.redirect("/login")
    }
    next();
}
module.exports.saveUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next()
}
const Review=require("./models/review.js");
const user = require("./models/user.js")
module.exports.isReview=async(req,res,next)=>{
    let { id ,reviewId}=req.params;
    let review=await Review.findById(reviewId)
    if(!review.author._id.equals(req.user._id)){
        req.flash("error","you are not the author")
        return res.redirect(`/rooms/${id}`)
    }
  next()
}