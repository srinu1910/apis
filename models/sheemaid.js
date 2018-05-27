const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var idsheema = new Schema({
    name:String,
    driver:Schema.ObjectId
})

const Idsheema = module.exports = mongoose.model("idsheema",idsheema);