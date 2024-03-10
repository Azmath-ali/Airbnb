const express = require("express")

const router = express.Router()

const User = require("../model/users.js")
const wrapAsync = require("../utils/wrapAsync.js")

const passport = require("passport")
const { saveRedirectUrl } = require("../middleware.js")

const controllerUser = require("../controllers/user.js")






router.route("/signup")
    .get(controllerUser.signupUser)
    .post( wrapAsync(controllerUser.postSignupUser))


router.route("/login")
    .get(saveRedirectUrl, controllerUser.loginUser )
    .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect:"/login", failureFlash:true}),
    controllerUser.postLoginUser)



router.get("/logout",  controllerUser.logoutUser)



    
// OR.




// Signup..

// router.get("/signup", controllerUser.signupUser )



// router.post("/signup", wrapAsync(controllerUser.postSignupUser))




// Login...

// router.get("/login", saveRedirectUrl, controllerUser.loginUser )


// router.post("/login",saveRedirectUrl, passport.authenticate("local", {failureRedirect:"/login", failureFlash:true}),

// controllerUser.postLoginUser)




// Logout...

// router.get("/logout",  controllerUser.logoutUser)



module.exports = router;