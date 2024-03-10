const User = require("../model/users.js")



// Signup..

module.exports.signupUser = (req,res)=>{
    res.render("users/signup.ejs")
}




module.exports.postSignupUser =   async (req,res)=>{

    try{
        let {username, email, password} = req.body

        let newUser = new User({username,email})
    
        let registeredUser = await User.register(newUser, password)

        req.login(registeredUser, (err)=>{
            if(err){
                return next(err)
            }

            req.flash("success", "Welcome to WanderLust!!!")
    
            res.redirect("/listing")
        })

    }
    catch(err){
        req.flash("error", err.message)
        res.redirect("/signup")
    }

}





// Login


module.exports.loginUser =  (req,res)=>{
    res.render("users/login.ejs")
}




module.exports.postLoginUser =  async (req,res)=>{
    req.flash("success", "Welcome to WanderLust❤️")

    res.redirect(res.locals.redirectUrl || "/listing" )
}





// Logout...

module.exports.logoutUser =  (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }

        req.flash("success", "You are Logged out")

        res.redirect("/listing")
    })
}



