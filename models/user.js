const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name:String
});

const Userdata = module.exports = mongoose.model("User", userSchema);