const express=require("express")
const app=express()
const mongoose=require("mongoose");
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
const router=express.Router({mergeParams:true});
const multer=require("multer")
 
const { storage }=require("../cloudConfig.js");
const upload=multer({ storage:storage });






const listingSchema=require("../joi.js")
const Review=require("../models/review.js")

const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js");
// const listing = require("./models/listing.js");
const review = require("../models/review.js");


const validateter=(req,res,next)=>{
    let { err }=listingSchema.validate(req.body);
    if(err){
        throw new ExpressError(400,"something wrong")
    }
    else{
        next();
    }
}
const {islogin}=require("../middle.js");
const user = require("../models/user.js");

router.get("/",async(req,res)=>{
    let allData=await listing.find({});
    console.log(allData);
    res.render("index.ejs",{ allData });
})
router.get("/new",islogin,(req,res)=>{
    let  token = req.query.token;
    

    if(token ==="give"){
        return res.render("new.ejs")
    }
    else{
         req.flash("error","you dont have permission to add new room")
         return res.redirect("/rooms");
    }

//    }
//    else{
//     return res.redirect("/rooms")
//    }
    
    

});
router.get("/newpass",(req,res)=>{
    res.render("newpass.ejs")
})
router.get("/:id",async(req,res)=>{
    let {id}=req.params;
    const Data= await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    res.render("show.ejs",{Data})
})




router.get("/privacy",(req,res)=>{
    res.render("privacy.ejs")
})
router.get("/terms",(req,res)=>{
    res.render("terms.ejs")
})

router.post("/new",validateter,upload.single('image'),wrapAsync(async(req,res)=>{
    let url=req.file.path
    let filename=req.file.filename
    
//     console.log(url,"helllo",filename)
    let { roomNumber,type,floor,pricePerNight,status,capacity,image }=req.body;

//    let rest= listingSchema.validate(req.body)
//    console.log(rest)
//    if(rest.error){
//     throw new ExpressError(400,rest.error)
//    }
    let dataNew=new listing({
        roomNumber:roomNumber,
        type:type,
        floor:floor,
        pricePerNight:pricePerNight,
        status:status,
        capacity:capacity,
        image:image
    })
    console.log(dataNew)
    dataNew.owner=req.user_id;
    dataNew.image={url,filename}
    await dataNew.save();
    req.flash("success","New listing created")
    res.redirect("/rooms")

}
))

router.get("/:id/editpass",async(req,res)=>{
    let { id }=req.params
    let data=await listing.findById(id)
    res.render("editpass.ejs",{ data })
})


router.get("/:id/edit",async(req,res)=>{
    let token=req.query.token;
    if(token==="enter"){
        let { id }=req.params;
        let data=await listing.findById(id);
        console.log(data)
        res.render("edit.ejs",{ data })
    }
    else{
        res.send("not");
    }
})

router.get("/:id/delepass",async(req,res)=>{
    let { id }=req.params;
    let Data=await listing.findById(id)
    res.render("delpass.ejs",{ Data }) 
})


router.put("/:id",async(req,res)=>{
    let { id }=req.params;
    
    let data=await listing.findByIdAndUpdate(id,{...req.body})
    console.log(data)
    if(typeof req.file!='undefined'){
    let url=req.file.path;
    let filename=req.file.filename;
    data.image={ url,filename }
    await data.save()
    }
    req.flash("success","listing is updated")
    res.redirect(`/rooms/${id}`);
})

router.get("/:id/edit",async(req,res)=>{
    let token=req.query.token;
    if(token==="delete"){
        let { id }=req.params;
        let data=await listing.findById(id);
        console.log(data)
        res.render("edit.ejs",{ data })
    }
    else{
        res.send("not");
    }
});


router.delete("/:id",async(req,res)=>{
    let { id }=req.params;
    let data=await listing.findByIdAndDelete(id);
    console.log(data)
    req.flash("success","listing deleted")
    res.redirect("/rooms");
})



module.exports=router;
