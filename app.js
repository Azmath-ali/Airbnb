
if(process.env.NODE_ENV !="production"){
    require("dotenv").config()
// console.log(process.env)


}


const express = require("express")

const app = express()

const mongoose = require("mongoose")

const Listing = require("./model/listing.js")

const initData = require("./init/data.js")

const methodOverride = require('method-override')

const engine = require('ejs-mate')

const wrapAsync = require("./utils/wrapAsync.js")

const expressError = require("./utils/expressError.js")


const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")



const session = require("express-session")

const flash = require("connect-flash")

const passport = require("passport")

const LocalStrategy = require("passport-local")

const User = require("./model/users.js")


const MongoStore = require("connect-mongo");


const port = 8000;





const dbUrl = process.env.ATLASDB_url

main()
.then(()=>{
    console. log("connected to DB");
})
.catch((err)=>{
    console.log(err)
})


async function main(){
    await mongoose.connect(dbUrl);
}








app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(methodOverride("_method"))

app.set("view engine", "ejs")
app.engine('ejs', engine);





const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:"mysecretcode",
    },
    touchAfter: 24 * 3600
})

store.on("error", ()=>{
    console.log("Error in the Mongo Session Store", error)
})




// Session and Cookies.

const sessionOptions = {
    store,
    secret:"mysecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000 ,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}


app.use(session(sessionOptions))

app.use(flash())






// Passport.

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user
    next()
})






// app.get("/", (req,res)=>{
//     res.send("Hurray!!!")
// })




app.use("/listing", listingRouter)
app.use("/listing/:id/reviews", reviewRouter)
app.use("/", userRouter)








// Error Handling...

app.all("*",(req,res,next)=>{
    next(new expressError(404,"Page Not Found"))
})

app.use((err,req,res,next)=>{
    let{statusCode = 500, message="Something Went Wrong..."} = err

    res.status(statusCode).render("error.ejs", {message})
})




app.listen(port, ()=>{
    console.log(`Server Started ${port}`)
})

