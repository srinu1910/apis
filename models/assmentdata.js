const mongoose =  require("mongoose");
var AssmentSheems = mongoose.Schema({
    dueDate: Date
});

const Assment = module.exports = mongoose.model('assments', AssmentSheems);