const Listing = require("./model/listing")
const Review = require("./model/review")


const {listingSchema, reviewSchema} = require("./schema.js")
const expressError = require("./utils/expressError.js")





module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((val)=> val.message).join(",")
        throw new expressError(400, errMsg)
    }
    
    else{
        next()
    }
}



module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body)

    if(error){
        let errMsg = error.details.map((val)=> val.message).join(",")
        throw new expressError(400, errMsg)
    }

    else{
        next()
    }
}






module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){

        req.session.redirectUrl = req.originalUrl

        req.flash("error", "You need to Login...")
        return res.redirect("/login")
    }
    next()
}




module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}




// Listing Authorization.

module.exports.isOwner = async(req,res,next)=>{

    let {id} = req.params

    let listing = await Listing.findById(id)

    if(!listing.owner._id.equals(res.locals.currUser._id)){

        req.flash("error", "You are not the owner of this Listing")
    
        return res.redirect(`/listing/${id}`)

    }
    next()
}




// Review Authorization.

module.exports.isReviewAuthor = async(req,res,next)=>{

    let {id,reviewId} = req.params

    let review = await Review.findById(reviewId)

    if(!review.author.equals(res.locals.currUser._id)){

        req.flash("error", "You are not the Author of this Listing")
    
        return res.redirect(`/listing/${id}`)

    }
    next()
}






