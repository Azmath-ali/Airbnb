const mongoose = require("mongoose")

// mongoose.connect("mongodb://localhost/wanderlust")

const Review = require("./review.js")
const User = require("./users.js")



let listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    
    description:String,

    image:{
        url: String,
        filename: String
    },

    price:Number,

    location:String,

    country:String,

    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }

})


// Mongoose MiddleWare...

listingSchema.post("findOneAndDelete", async(listing)=>{

    if(listing){

        await Review.deleteMany({_id:{$in : listing.reviews}})

    }
})



let Listing = mongoose.model("Listing", listingSchema)

module.exports = Listing;