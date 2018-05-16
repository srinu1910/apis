var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var app = express();
const route = require("./routes/route");

//databse

mongoose.connect("mongodb://localhost:27017/contactlist");

mongoose.connection.on("connected",()=>{
  console.log("Connected to database mongodb @ 27017")
});

mongoose.connection.on("error",(err)=>{
  if(err){
    console.log("Error in Database connection: " + err);
  }

});

//define port;
const port = process.env.port || 3000;
// add body-parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
//static files

app.use(express.static(__dirname + '/public'));

//routes
app.use("/api", route);

app.get("/", (req,res)=>{
  res.send("foobar");
});

app.listen(port,()=>{
  console.log("server start At: " + port);
});
