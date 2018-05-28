const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const router = express.Router();
const Contact = require("../models/contacts");
const Mongooset = require("../models/mongoosetest");
const Assment = require("../models/assmentdata");
const IdSheema = require("../models/sheemaid");

const User = require("../models/user");
const UserPost = require("../models/postedby");

router.get("/contacts",(req, res, next)=>{
    Contact.find((err, contacts)=>{
        res.json(contacts);
    })
});

router.post("/contact",(req, res, next)=>{
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });

    newContact.save((err, contact)=>{
        if(err){
            res.json({msg: err});
        }else{
            res.json({msg: "Contact added successfully "});
        }
    });
});

router.post("/user",(req, res)=>{
    let newUser = new User({
        name:req.body.name
    });

    newUser.save((err, user)=>{
        if(err){
            res.json({msg: err});
        }else{
            res.json({msg: "user added successfully "});
        }
    });

});

router.post("/userpost",(req, res)=>{
    User.find((err, ouruser)=>{
        ouruser.forEach((user)=>{
            let userpostdata = new UserPost({
                title:req.body.title,
                postedBy: user._id,
                commment: [{
                    text:"Thanks!!",
                    postedBy: user._id
                }]
            });
    
            userpostdata.save((err, user)=>{
                if(err){
                    res.json({msg: err});
                }else{
                   // res.json({msg: "user added successfully "}); 
                }
            });
            //res.json({msg:user.name});
        });
        //console.log(ouruser._id);
        //res.json({msg:ouruser.name});
    });
});
router.get("/userpost",(req, res)=>{
    UserPost.find({})
    .populate('postedBy')
    .populate('commment.postedBy')
    .exec(function(error, posts) {
        console.log(JSON.stringify(posts, null, "\t"))
        res.json({msg:posts});
    })
});

router.delete("/contact/:id",(req, res, next)=>{
    Contact.remove({_id:req.params.id},(err, result)=>{
        if(err){
            res.json({msg: "Faild to remove contact"});
        }else{
            res.json(result);
        }
    })
});

router.post("/assment",(req,res,next)=>{

    let newAssment = new Assment({
        dueDate: new Date()
    });

    newAssment.save((err, contact)=>{
        if(err){
            res.json({msg: err});
        }else{
            res.json({msg: "Contact added successfully "});
        }
    });
});

router.post("/sheemaid",(req,res,next)=>{

    let newsheemaid = new IdSheema({
        name: "SRINUSS",
        driver : mongoose.Schema.Types.ObjectId()
    });

    newsheemaid.save((err, contact)=>{
        if(err){
            res.json({msg: err});
        }else{
            res.json({msg: "Contact added successfully "});
        }
    });
});

router.get("/assment",(req, res, next)=>{

    Assment.findOne((err, assment)=>{
        assment.dueDate.setMonth(2);
        assment.save();

        assment.markModified('dueDate');
        assment.save(); // works

        res.json(assment);
    })
});

router.post("/sendemail",(req, res, next) => {

        // create reusable transporter object using the default SMTP transport
        /*let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "srinu.esv@gmail.com", // generated ethereal user
                pass: "" // generated ethereal password
            },
            tls: {
                rejectUnauthorized:false,
            }
        });*/

        let transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "srinu@fabitcorp.com", // generated ethereal user
                pass: "" // generated ethereal password
            }/*,
            tls: {
                rejectUnauthorized:false,
                ciphers:'SSLv3'
            }*/
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Fred Foo 👻" <srinu@fabitcorp.com>', // sender address
            to: 'srinu.esv@gmail.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.json(error);
            }
            res.json({"message":info.messageId});
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
});


router.post("/montest",(req, res, next)=>{


    let newContact = new Mongooset({
        name: req.body.name,
    });

    //var newContact = new Mongooset;

    //newContact.name = 'Statue of Liberty';
    //newContact.age = 125;
    //newContact.updated = new Date;
    /*newContact.binary = new Buffer(0);
    newContact.living = false;
    newContact.mixed = { any: { thing: 'i want' } };
    newContact.markModified('mixed');
    newContact._someId = new mongoose.Types.ObjectId;
    newContact.array.push(1);
    newContact.ofString.push("strings!");
    newContact.ofNumber.unshift(1,2,3,4);
    newContact.ofDates.addToSet(new Date);
    newContact.ofBuffer.pop();
    newContact.ofMixed = [1, [], 'three', { four: 5 }];
    newContact.nested.stuff = 'good';
    newContact.map = new Map([['key', 'value']]);*/

    newContact.save((err, contact)=>{
        if(err){
            res.json({msg: err});
        }else{
            res.json({msg: "Contact added successfully "});
        }
    });
});

module.exports = router;