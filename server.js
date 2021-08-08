const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/TASK4", {useNewUrlParser:true})

const userSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.ObjectId, auto: true},
    country:String,
    namefirst:String,
    namelast:String,
    email:String,
    psw:String,
    address:String,
    city:String,
    state:String,
    zip:String,
    mobnum:Number
})

const User = new mongoose.model("User", userSchema);


const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req,res)=>{
    const country = req.body.country
    const namefirst = req.body.namefirst
    const namelast = req.body.namelast
    const email = req.body.email
    const psw = req.body.psw
    const pswconf = req.body.pswconf
    const address = req.body.address
    const city = req.body.city
    const state = req.body.state
    const zip = req.body.zip
    const mobnum = req.body.mobnum
    

    
//check if passwords match
    if (psw == pswconf){
        if (psw.length >=8){
        //create and save the user
        const user = new User({
            country:country,
            namefirst:namefirst,
            namelast:namelast,
            email:email,
            psw:psw,
            address:address,
            city:city,
            state:state,
            zip:zip,
            mobnum:mobnum
        })
        user.save((err)=>{
            if (err){
                console.log(err);
            }
            else{
                res.send("Saved User");
            }
        });
        }else{
            res.send("ERROR \n Password must be at least 8 characters ")
        }
        
    } else{
        res.send("ERROR \n Passwords do not match");
    }


})

app.listen(8080, function (req, res){
    console.log("server is running");
})