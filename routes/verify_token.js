const jwt=require('jsonwebtoken');
const private=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token)res.send('acess denied')     //token not available
    try {
        var decoded = jwt.verify(token, process.env.SECRET_KEY);
        next(); // to go to the next middleware
      }catch(err) {
          res.status(400).send("invalid token");
          console.log(err);
      }
}

module.exports=private;


