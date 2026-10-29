const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listing.js");

main().then((res)=>{
    console.log("connected")
}).catch((err)=>{
    console.log("error")
});
async function main(){
    await mongoose.connect("mongodb://localhost:27017/grand");
}

const initDB=async ()=>{
    await listing.deleteMany({})
    initData.data=initData.data.map((obj)=>({...obj,owner:'6adb5d506c3050e6fcbb3bef'}))
    await listing.insertMany(initData.data);

    console.log("the data was added");
    
}
initDB();