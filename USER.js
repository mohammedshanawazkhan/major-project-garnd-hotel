const express=require("express")
const router=express.Router({mergeParams:true});
const app=express()
const path=require("path");
const data = require("../init/data.js");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static('public'));
// app.use(methodOverride("_method"));
let ejsmate=require("ejs-mate");
app.engine('ejs',ejsmate)
app.use(express.static("public"));
const User=require("../models/user.js");
const { userSchema } = require("../joi.js");
const passport=require("passport")

const {saveUrl}=require("../middle.js")
const Uservalidateter=(req,res,next)=>{
    let { err }=userSchema.validate(req.body);
    if(err){
        throw new ExpressError(400,"something wrong")
    }
    else{
        next();
    }
}
router.get("/signup",Uservalidateter,(req,res)=>{
    res.render("./user/signup.ejs")

})
router.post("/signup",Uservalidateter,async(req,res)=>{
  
let { username , email ,password }=req.body;
  let data=new User({
    username:username,
    email,email,})
    let user=await User.register(data,password)
    console.log(user)
    req.logIn(data,(err)=>{
        if(err){
         return next(err)
           
        }
     req.flash("success","welcome to Grand-hotel")
      res.redirect("/rooms")
    })
   

  
})

router.get("/login",(req,res)=>{
  res.render("./user/login.ejs")
})
router.post("/login",saveUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),async(req,res)=>{
    req.flash("success","welcome back to Grand Hotel");
    let redirectUrl=res.locals.redirectUrl||"/rooms"
    res.redirect(redirectUrl)
})

router.get("/auth/google",passport.authenticate('google',{scope:['email','profile']}));

router.get("/auth/google/callback",saveUrl,passport.authenticate("google",{failureRedirect:"/login"}),(req,res)=>{
    req.flash("success","welcome back to Grand Hotel");
    let redirectUrl=res.locals.redirectUrl||"/rooms";
    res.redirect(redirectUrl)
})
router.get("/auth/github",passport.authenticate('github',{scope:['user:email']}))
router.get("/auth/github/callback",passport.authenticate('github',{failureRedirect:"/login"}),(req,res)=>{
    req.flash("success","welcome back to Grand Hotel");
    let redirectUrl=res.locals.redirectUrl||"/rooms";
    res.redirect(redirectUrl)
})
router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","you are logout")
    res.redirect("/rooms")
    })
    
})

module.exports=router