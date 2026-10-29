const { required } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportMongoose=require("passport-local-mongoose").default

const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

userSchema.plugin(passportMongoose);
module.exports=mongoose.model("User",userSchema)