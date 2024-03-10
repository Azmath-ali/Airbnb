const Review = require("../model/review.js")
const Listing = require("../model/listing.js")





// Reviews Route...

module.exports.createReview   =async(req,res)=>{

    let e = await Listing.findById(req.params.id)

    let newReview = new Review(req.body.review)

    newReview.author = req.user._id

    e.reviews.push(newReview)
    await newReview.save()
    await e.save()



    req.flash("success", "New Review Created")


    // console.log("saved")
    res.redirect(`/listing/${e._id}`)

}










// Review Delete Route...

module.exports.deleteReview  =async (req,res)=>{
    let {id,reviewId} = req.params

    await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}})

    await Review.findByIdAndDelete(reviewId)

    req.flash("success", "Review Deleted")


    res.redirect(`/listing/${id}`)
}




