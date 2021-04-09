const express=require('express');
const router=express.Router();
const verify=require('./verify_token.js');

router.post('/postmaker',verify,(req,res)=>{ 
    const senti={title:"best movie ",description:"i like amanda seyfried"};
    const puppy=JSON.stringify(senti);
    res.send(puppy);
})

module.exports=router;