const express = require("express")

const router = express.Router()


const wrapAsync = require("../utils/wrapAsync.js")



const Listing = require("../model/listing.js")


const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")


const controllerListing = require("../controllers/listing.js")

const multer  = require('multer')

const {storage} = require("../cloudConfig.js")
const upload = multer({storage})






// Routes.

router.route("/")
    .get(wrapAsync(controllerListing.indexListing))
    .post(isLoggedIn, upload.single("listing[image]"),validateListing,wrapAsync( controllerListing.newPostLisitng ))

   



router.get("/new", isLoggedIn,  controllerListing.newListing )


router.route("/:id")
    .put(isLoggedIn, isOwner, upload.single("listing[image]"),validateListing, wrapAsync(controllerListing.putLisitng))   
    // .get(wrapAsync(controllerListing.showLisitng))
    .get(wrapAsync(controllerListing.showLisitng))
    .delete(isLoggedIn,isOwner, wrapAsync(controllerListing.deleteListing))



router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(controllerListing.editListing))



    // Or.


// Listing ejs...

// router.get("/", wrapAsync(controllerListing.indexListing))






// New ejs...
// router.get("/new", isLoggedIn,  controllerListing.newListing )



// router.post("/", isLoggedIn, validateListing, wrapAsync( controllerListing.newPostLisitng ))






//  Edit ejs...
// router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(controllerListing.editListing))



// router.put("/:id",isLoggedIn, isOwner, validateListing, wrapAsync(controllerListing.putLisitng))






// Show ejs...
// router.get("/:id", wrapAsync(controllerListing.showLisitng))





// Delete route.
// router.delete("/:id",isLoggedIn,isOwner, wrapAsync(controllerListing.deleteListing))


module.exports = router