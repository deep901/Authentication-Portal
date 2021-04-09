const express=require('express');
const router=express.Router();
const User=require('../models/user.js'); // model import
const {LoginValidate,RegisterValidate}=require('./valid.js');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
// validation
router.post('/register',async (req,res)=>{
//   lets validate before putting in database
   const {error} = RegisterValidate(req.body); // destructure error object to get only error
         if(error) return res.status(400).send(error.details[0].message);
         // check if user already exists in debugger
         const alreadyExists = await User.findOne({email: req.body.email});
         if(alreadyExists) return res.status(400).send("User already exists");

 // hash password
 // salt is stored in the hashed password and only bcrypt can identify that
 // salt gets added to front of every password and creates a different hash even for same password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password,salt);

    const details=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
        // in order to read from the client side the json we need bodyparser
    })
        try{
            const event=await details.save();
            console.log(event);
            res.send(event);
        }catch(err){
            console.log(err);
            res.send(err);
        }
       
        
})


router.post('/login',async (req,res)=>{
//   lets validate before putting in database
   const {error} = LoginValidate(req.body) // destructure error object to get only error
    // synatax(req.body, naem of schema)
    if(error) return res.status(400).send(error.details[0].message);
    const alreadyExists = await User.findOne({email:req.body.email});
    // console.log(alreadyExists.password) 
    if(!alreadyExists) return res.status(400).send("You are not registered");
    const final_validation= await bcrypt.compare(req.body.password,alreadyExists.password);
    if(!final_validation) return res.send("oops wrong password");


    // create a token for user if he is sucessfully logged in
    const token=jwt.sign({_id:alreadyExists._id},process.env.SECRET_KEY);
    res.header('auth-token',token).send(token);


})

module.exports=router;


