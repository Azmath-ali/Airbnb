
const mongoose = require("mongoose")

const Listing = require("../model/listing.js")

const initData = require("./data.js")

mongoose.connect("mongodb://localhost/wanderlust")


const initDB = async ()=>{

    initData.data = initData.data.map((val)=> ({...val, owner:"65e6b828344cc30126129ca4"}))

    await Listing.insertMany(initData.data)
    console.log("added")
}

initDB()