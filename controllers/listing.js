const Listing = require("../model/listing.js")

const mapToken = process.env.MAP_TOKEN


// From Mapbox...
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: mapToken });




// Listing ejs...

module.exports.indexListing = async (req,res)=>{
    const allListing = await Listing.find({})
    // console.log(allListing)
    res.render("listing/index.ejs", {allListing} )
}




// New ejs...

module.exports.newListing = (req,res)=>{
    // const allListing = await Listing.find({})

    res.render("listing/new.ejs")
}


module.exports.newPostLisitng = async (req,res)=>{

    // Mapbox...

    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send()
       
      

    let url = req.file.path
    let filename = req.file.filename
  
    const sample = new Listing(req.body.listing)

    sample.owner = req.user._id

    sample.image = {url, filename}

    sample.geometry = response.body.features[0].geometry

    let sampleMap = await sample.save()
    console.log(sampleMap)

    req.flash("success", "New Listing Created")

    res.redirect("/listing")
}







//  Edit ejs...

module.exports.editListing = async (req,res)=>{
    let {id} = req.params

    let listing = await Listing.findById(id)
    if(!listing){
        req.flash("error", "Listing Does not Exist")
        res.redirect("/listing")
    }

    let originalImageUrl = listing.image.url

    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_150,w_250")

    res.render("listing/edit.ejs",{listing, originalImageUrl})
}




module.exports.putLisitng = async (req,res)=>{
    let {id} = req.params
    let list = await Listing.findByIdAndUpdate(id,{...req.body.listing})

    if(typeof req.file !== "undefined"){

        let url = req.file.path
        let filename = req.file.filename
    
        list.image = {url,filename}
    
        await list.save()
    }
    req.flash("success", "Listing Updated")
    
    res.redirect(`/listing/${id}`)

}



// Show ejs...

module.exports.showLisitng  = async (req,res)=>{
    let {id} = req.params
    let listing = await Listing.findById(id).populate({path:"reviews", populate:{path:"author"}}).populate("owner")
    
    if(!listing){
        req.flash("error", "Listing Does not Exist")
        res.redirect("/listing")
    }

    res.render("listing/show.ejs", {listing})
}







// Delete route.

module.exports.deleteListing   =async (req,res)=>{
    let {id} = req.params
    let deleted = await Listing.findByIdAndDelete(id)
    console.log(deleted);
    req.flash("success", "Listing Deleted")

    res.redirect("/listing")
}




