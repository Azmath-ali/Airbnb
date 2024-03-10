const mongoose = require("mongoose")

const Schema = mongoose.Schema

// mongoose.connect("mongodb://localhost/wanderlust")


const passportLocalMongoose  = require("passport-local-mongoose")




const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
})

userSchema.plugin(passportLocalMongoose);


 const User = mongoose.model("User", userSchema)

module.exports = User;