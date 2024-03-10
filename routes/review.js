
const express = require("express")

const router = express.Router({mergeParams:true})



const Review = require("../model/review.js")

const wrapAsync = require("../utils/wrapAsync.js")



const Listing = require("../model/listing.js")


const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")


const controllerReview = require("../controllers/review.js")
 













// Reviews Route...

router.post("/", isLoggedIn, validateReview, wrapAsync(controllerReview.createReview))






// Review Delete Route...


router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(controllerReview.deleteReview))




module.exports = router