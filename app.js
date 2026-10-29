const express=require("express");
const app=express();
const mongoose=require("mongoose");
const methodOverride=require("method-override");
// const listing=require("./models/listing.js");
const path=require("path");
const data = require("./init/data.js");
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
const flash=require("connect-flash")
const MongoStore = require('connect-mongo').default;;
const session=require("express-session")

require('dotenv').config()

const passport=require("passport")
const localstrater=require("passport-local")
const GoogleStrategy=require("passport-google-oauth20").Strategy;
const GithubStrategy=require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User=require("./models/user.js")
const odb=process.env.MONGODB_URI
console.log(process.env.CLOUD_NAME)
console.log(process.env.CLOUD_API_KEY)
console.log(process.env.CLOUD_API_SECRATE)
const store= MongoStore.create({ mongoUrl: odb,
    secret:process.env.SECRET,
    touchAfter:24*3600,
 })
 store.on("error",()=>{
    console.log("error in mongo session",err)
 })
const sessionOption={
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,

    }
}



app.use(session(sessionOption))
app.use(flash())



app.use(passport.initialize())

app.use(passport.session());
passport.use(new localstrater(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.serializeUser((user,done)=>done(null,user))
passport.deserializeUser((user,done)=>done(null,user))



// 1. Tell passport how to serialize the user into the session (storing just the ID)

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_SECRET,
    callbackURL:"http://localhost:8080/auth/google/callback",
    // passReqToCallback:true,
},
async (accessToken, refreshToken, profile, done) => {
            try {

                let user = await User.findOne({
                    googleId: profile.id
                });

                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        username: profile.displayName
                    });
                }

                return done(null, user);

            } catch (err) {
                return done(err, null);
            }
        }
   
// );
// function(request,accessToken,refreshToken,profile,done){
//     console.log(accessToken)
//     console.log(profile)
//     return done(null,profile);
// }
));
passport.use(new GithubStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_SECRET,
    callbackURL:"http://localhost:8080/auth/github/callback"
},
function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
))
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: "http://localhost:8080/auth/facebook/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       return done(null, profile);
//     }
//   )
// );


app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    res.locals.user=req.user;
    next()
})
// const listingSchema=require("./joi.js")
// const Review=require("./models/review.js")




// const wrapAsync=require("./utils/wrapAsync.js")
// const ExpressError=require("./utils/ExpressError.js");
// const listing = require("./models/listing.js");
// const review = require("./models/review.js");

main().then(()=>{
    console.log("connected")
}).catch((err)=>{
     console.log(odb)
    console.log("error",err)
    
})
async function main(){
    await mongoose.connect(odb)
}
const url="mongodb://localhost:27017/grand"






// const validateter=(req,res,next)=>{
//     let { err }=listingSchema.validate(req.body);
//     if(err){
//         throw new ExpressError(400,"something wrong")
//     }
//     else{
//         next();
//     }
// }

let listingRoute=require("./route/listing.js")
app.use("/rooms",listingRoute)

let reviewRoute=require("./route/review.js")
app.use("/rooms/:id/review",reviewRoute)

let userRoute=require("./route/USER.js");
const user = require("./models/user.js");
const { access } = require("fs");
app.use("/",userRoute);




app.listen(8080,()=>{
    console.log("listing")
    console.log(process.env.GOOGLE_CLIENT_ID)
    console.log(process.env.GOOGLE_SECRET)
})
app.get("/",(req,res)=>{
    res.send("the root")
})
// app.get("/rooms",async(req,res)=>{
//     let allData=await listing.find({});
//     console.log(allData);
//     res.render("index.ejs",{ allData });
// })
// app.get("/rooms/newpass",(req,res)=>{
//     res.render("newpass.ejs")
// })

// app.get("/rooms/new",(req,res)=>{
//     let  token = req.query.token;
//     if(token ==="give"){
//         return res.render("new.ejs")
//     }
//     else{
//     return res.send("not");
//     }
    

// });
// app.post("/rooms/new",validateter,wrapAsync(async(req,res)=>{
//     let { roomNumber,type,floor,pricePerNight,status,capacity,image }=req.body;
// console.log(req.body)
// //    let rest= listingSchema.validate(req.body)
// //    console.log(rest)
// //    if(rest.error){
// //     throw new ExpressError(400,rest.error)
// //    }
//     let dataNew=new listing({
//         roomNumber:roomNumber,
//         type:type,
//         floor:floor,
//         pricePerNight:pricePerNight,
//         status:status,
//         capacity:capacity,
//         image:image
//     })
//     console.log(dataNew)
//     await dataNew.save();
//     res.redirect("/rooms")

// }
// ))

// app.get("/rooms/:id",async(req,res)=>{
//     let { id }=req.params;
//     let Data= await listing.findById(id).populate("reviews");
//     console.log(Data);
//     res.render("show.ejs",{ Data });
// })
// app.get("/rooms/:id/editpass",async(req,res)=>{
//     let { id }=req.params
//     let data=await listing.findById(id)
//     res.render("editpass.ejs",{ data })
// })
// app.get("/rooms/:id/edit",async(req,res)=>{
//     let token=req.query.token;
//     if(token==="enter"){
//         let { id }=req.params;
//         let data=await listing.findById(id);
//         console.log(data)
//         res.render("edit.ejs",{ data })
//     }
//     else{
//         res.send("not");
//     }
// })
// app.get("/rooms/:id/delepass",async(req,res)=>{
//     let { id }=req.params;
//     let Data=await listing.findById(id)
//     res.render("delpass.ejs",{ Data }) 
// })
// app.put("/rooms/:id",async(req,res)=>{
//     let { id }=req.params;
//     let data=await listing.findByIdAndUpdate(id,{...req.body})
//     console.log(data)
//     res.redirect(`/rooms/${id}`);
// })


// app.get("/rooms/:id/edit",async(req,res)=>{
//     let token=req.query.token;
//     if(token==="delete"){
//         let { id }=req.params;
//         let data=await listing.findById(id);
//         console.log(data)
//         res.render("edit.ejs",{ data })
//     }
//     else{
//         res.send("not");
//     }
// });

// app.delete("/rooms/:id",async(req,res)=>{
//     let { id }=req.params;
//     let data=await listing.findByIdAndDelete(id);
//     console.log(data)
//     res.redirect("/rooms");
// })
// app.post("/rooms/:id/review",async(req,res)=>{
//     let { id }=req.params;
    
//     let data=await listing.findById(id)
//     let neWreview=new Review(req.body.reviews)
//     console.log(neWreview)
//     data.reviews.push(neWreview)
//     // console.log(data)
//     await neWreview.save()
//     await data.save()
//     res.redirect(`/rooms/${data._id}`)
// })
// app.delete("/rooms/:id/review/:reviewId",async(req,res)=>{
//     let { id,reviewId }=req.params;
//     await listing.findByIdAndUpdate(id,{ $pull:{reviews:reviewId}})
//     await Review.findByIdAndDelete(reviewId)
//     res.redirect(`/rooms/${id}`)

// })
// express-error

// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"page is not found"))

// })


// coustom error handlae

// app.use((err,req,res,next)=>{
//     let { status=500,msg="page is not found" }=err;
//     res.render("error.ejs",{status,msg})
// })

 
