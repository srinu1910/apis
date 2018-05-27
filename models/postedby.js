const mongoose = require("mongoose");

var Postshema = new mongoose.Schema(
    {
        title:String,
        postedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        commment: [{
            text: String,
            postedBy: {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        }]
        
    }
);

const postshemma = module.exports = mongoose.model("Post", Postshema);

